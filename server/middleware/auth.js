const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || (process.env.VERCEL ? '' : 'local-development-secret');
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be configured in the Vercel project environment.');
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired access token.' });
    }
    req.user = user;
    next();
  });
}

function requireSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Super Admin privileges required.' });
  }
  next();
}

function requireDeptAdminOrSuperAdmin(req, res, next) {
  if (!req.user || (req.user.role !== 'super_admin' && req.user.role !== 'dept_admin')) {
    return res.status(403).json({ error: 'Department Admin or Super Admin privileges required.' });
  }
  next();
}

module.exports = {
  JWT_SECRET,
  authenticateToken,
  requireSuperAdmin,
  requireDeptAdminOrSuperAdmin
};
