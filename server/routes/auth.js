const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../db');
const { JWT_SECRET, authenticateToken, requireSuperAdmin } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  if (!JWT_SECRET) {
    return res.status(503).json({ error: 'Authentication is unavailable until JWT_SECRET is configured.' });
  }

  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { username: username.trim() },
      include: { department: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Compare password with bcrypt or plaintext fallback
    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = (password === user.password);
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        department_id: user.department_id
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Audit log login
    try {
      await prisma.auditLog.create({
        data: {
          user: user.full_name,
          department: user.department ? user.department.code : (user.role === 'super_admin' ? 'Super Admin' : 'System'),
          ip: req.ip || req.connection.remoteAddress || '127.0.0.1',
          env: req.headers['user-agent'] || 'Unknown Agent',
          action: 'User Logged In',
          details: `Sign-in authenticated via JWT (Role: ${user.role})`
        }
      });
    } catch (logErr) {
      console.error('Failed to write audit log:', logErr);
    }

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        role: user.role,
        departmentId: user.department_id,
        departmentName: user.department ? user.department.name : null,
        departmentCode: user.department ? user.department.code : null
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during authentication.' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { department: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    res.json({
      id: user.id,
      username: user.username,
      fullName: user.full_name,
      role: user.role,
      departmentId: user.department_id,
      departmentName: user.department ? user.department.name : null,
      departmentCode: user.department ? user.department.code : null
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
});

// GET /api/auth/users - Super Admin list all admins
router.get('/users', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { department: true },
      orderBy: { id: 'asc' }
    });

    const sanitized = users.map(u => ({
      id: u.id,
      username: u.username,
      fullName: u.full_name,
      role: u.role,
      departmentId: u.department_id,
      departmentName: u.department ? u.department.name : null,
      departmentCode: u.department ? u.department.code : null,
      createdAt: u.created_at
    }));

    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// POST /api/auth/register - Super Admin creates new admin account
router.post('/register', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { username, password, full_name, role, department_id } = req.body;

    if (!username || !password || !full_name) {
      return res.status(400).json({ error: 'Username, password, and full name are required.' });
    }

    const existing = await prisma.user.findUnique({ where: { username: username.trim() } });
    if (existing) {
      return res.status(400).json({ error: 'Username is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username.trim(),
        password: hashedPassword,
        full_name: full_name.trim(),
        role: role || 'dept_admin',
        department_id: department_id ? parseInt(department_id) : null
      },
      include: { department: true }
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        user: req.user.username,
        department: 'Super Admin',
        ip: req.ip || '127.0.0.1',
        env: req.headers['user-agent'] || 'Server',
        action: 'Created Admin Account',
        details: `Created coordinator: ${newUser.username} (${newUser.role})`
      }
    });

    res.status(201).json({
      message: 'Admin account created successfully.',
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.full_name,
        role: newUser.role,
        departmentId: newUser.department_id,
        departmentName: newUser.department ? newUser.department.name : null
      }
    });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ error: 'Failed to create user account.' });
  }
});

// PUT /api/auth/users/:id - Update admin details or reset password
router.put('/users/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { full_name, password, role, department_id } = req.body;

    const dataToUpdate = {};
    if (full_name) dataToUpdate.full_name = full_name.trim();
    if (role) dataToUpdate.role = role;
    if (department_id !== undefined) dataToUpdate.department_id = department_id ? parseInt(department_id) : null;
    if (password && password.trim() !== '') {
      dataToUpdate.password = await bcrypt.hash(password.trim(), 10);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      include: { department: true }
    });

    await prisma.auditLog.create({
      data: {
        user: req.user.username,
        department: 'Super Admin',
        ip: req.ip || '127.0.0.1',
        env: req.headers['user-agent'] || 'Server',
        action: 'Updated Admin Account',
        details: `Updated user #${userId} (${updated.username})`
      }
    });

    res.json({
      message: 'User updated successfully.',
      user: {
        id: updated.id,
        username: updated.username,
        fullName: updated.full_name,
        role: updated.role,
        departmentId: updated.department_id
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

// DELETE /api/auth/users/:id - Delete admin account
router.delete('/users/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.username === 'superadmin') {
      return res.status(400).json({ error: 'Cannot delete root Super Administrator account.' });
    }

    await prisma.user.delete({ where: { id: userId } });

    await prisma.auditLog.create({
      data: {
        user: req.user.username,
        department: 'Super Admin',
        ip: req.ip || '127.0.0.1',
        env: req.headers['user-agent'] || 'Server',
        action: 'Deleted Admin Account',
        details: `Deleted coordinator account '${user.username}'`
      }
    });

    res.json({ message: 'User account removed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

module.exports = router;
