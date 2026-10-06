const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const prisma = require('../db');
const { JWT_SECRET, authenticateToken, requireSuperAdmin, requireDeptAdminOrSuperAdmin } = require('../middleware/auth');

// GET /api/events - List events with powerful filtering & search
router.get('/', async (req, res) => {
  try {
    const {
      search,
      department_id,
      academic_year,
      category,
      status,
      month,
      date,
      limit,
      sort
    } = req.query;

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    let viewer = null;
    if (token) {
      try {
        viewer = jwt.verify(token, JWT_SECRET);
      } catch (error) {
        viewer = null;
      }
    }

    const where = {};

    if (viewer && viewer.role === 'super_admin') {
      if (status) where.status = status;
    } else if (viewer && viewer.role === 'dept_admin') {
      where.department_id = viewer.department_id;
      if (status) where.status = status;
    } else {
      where.status = 'Published';
    }

    if (department_id && (!viewer || viewer.role === 'super_admin')) {
      where.department_id = parseInt(department_id);
    }

    if (academic_year) {
      where.academic_year = academic_year;
    }

    if (category) {
      where.category = category;
    }

    if (date) {
      where.event_date = date;
    }

    // Month filter e.g. "08" matches "YYYY-08-DD"
    if (month) {
      where.event_date = {
        contains: `-${month.padStart(2, '0')}-`
      };
    }

    // Search by title, description, venue, or coordinators
    if (search && search.trim() !== '') {
      const term = search.trim();
      where.OR = [
        { title: { contains: term } },
        { description: { contains: term } },
        { venue: { contains: term } },
        { faculty_coordinator: { contains: term } },
        { student_coordinator: { contains: term } }
      ];
    }

    const orderBy = sort === 'date_asc'
      ? { event_date: 'asc' }
      : { event_date: 'desc' };

    const take = limit ? parseInt(limit) : undefined;

    const events = await prisma.event.findMany({
      where,
      include: {
        department: {
          select: {
            id: true,
            code: true,
            name: true
          }
        },
        _count: {
          select: { registrations: true }
        }
      },
      orderBy,
      take
    });

    const formatted = events.map(e => ({
      ...e,
      registration_count: e._count.registrations
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to retrieve events.' });
  }
});

// GET /api/events/latest - Get latest uploaded events
router.get('/latest', async (req, res) => {
  try {
    const latestEvents = await prisma.event.findMany({
      where: { status: 'Published' },
      include: {
        department: { select: { id: true, code: true, name: true } }
      },
      orderBy: { created_at: 'desc' },
      take: 6
    });

    res.json(latestEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve latest events.' });
  }
});

// GET /api/events/:id - Event details + increment view counter
router.get('/:id', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        department: true,
        _count: {
          select: { registrations: true }
        }
      }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // Increment views asynchronously
    prisma.event.update({
      where: { id: eventId },
      data: { views: { increment: 1 } }
    }).catch(err => console.error('Failed to increment views:', err));

    res.json({
      ...event,
      views: event.views + 1,
      registration_count: event._count.registrations
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event details.' });
  }
});

// POST /api/events - Create new event (Coordinator or Super Admin)
router.post('/', authenticateToken, requireDeptAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      department_id,
      academic_year,
      category,
      fees,
      event_date,
      event_time,
      venue,
      registration_deadline,
      registration_link,
      payment_qr,
      faculty_coordinator,
      student_coordinator,
      contact_1,
      contact_2,
      contact_3,
      poster_image,
      brochure_url,
      video_url,
      rules,
      eligibility,
      schedule,
      sponsors,
      winners,
      faqs,
      status
    } = req.body;

    if (!title || !department_id || !academic_year || !event_date || !venue) {
      return res.status(400).json({ error: 'Missing required event parameters.' });
    }

    // Check department permissions: dept_admin can only add for their assigned department
    const targetDeptId = parseInt(department_id);
    if (req.user.role !== 'super_admin' && req.user.department_id !== targetDeptId) {
      return res.status(403).json({ error: 'You can only create events for your assigned department.' });
    }

    const newEvent = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : '',
        department_id: targetDeptId,
        academic_year: academic_year.trim(),
        category: category || 'Technical',
        fees: fees ? fees.trim() : 'Free',
        event_date,
        event_time: event_time || '10:00',
        venue: venue.trim(),
        registration_deadline: registration_deadline || event_date,
        registration_link: registration_link ? registration_link.trim() : null,
        payment_qr: payment_qr ? payment_qr.trim() : null,
        faculty_coordinator: faculty_coordinator ? faculty_coordinator.trim() : null,
        student_coordinator: student_coordinator ? student_coordinator.trim() : null,
        contact_1: contact_1 ? contact_1.trim() : null,
        contact_2: contact_2 ? contact_2.trim() : null,
        contact_3: contact_3 ? contact_3.trim() : null,
        poster_image: poster_image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        brochure_url: brochure_url ? brochure_url.trim() : null,
        video_url: video_url ? video_url.trim() : null,
        rules: rules ? (typeof rules === 'object' ? JSON.stringify(rules) : rules) : null,
        eligibility: eligibility ? eligibility.trim() : null,
        schedule: schedule ? (typeof schedule === 'object' ? JSON.stringify(schedule) : schedule) : null,
        sponsors: sponsors ? (typeof sponsors === 'object' ? JSON.stringify(sponsors) : sponsors) : null,
        winners: winners ? (typeof winners === 'object' ? JSON.stringify(winners) : winners) : null,
        faqs: faqs ? (typeof faqs === 'object' ? JSON.stringify(faqs) : faqs) : null,
        status: req.user.role === 'super_admin' ? (status || 'Published') : 'Pending Approval'
      },
      include: { department: true }
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        user: req.user.username,
        department: newEvent.department.code,
        ip: req.ip || '127.0.0.1',
        env: req.headers['user-agent'] || 'Server',
        action: 'Event Created',
        details: `Created event '${newEvent.title}' (Status: ${newEvent.status})`
      }
    });

    // If pending approval, trigger notification for Super Admin
    if (newEvent.status === 'Pending Approval') {
      await prisma.notification.create({
        data: {
          title: 'New Event Approval Request',
          message: `${newEvent.department.code} submitted '${newEvent.title}' for publication approval.`,
          role_target: 'super_admin'
        }
      });
    }

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event record.' });
  }
});

// PUT /api/events/:id - Update existing event
router.put('/:id', authenticateToken, requireDeptAdminOrSuperAdmin, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (!existing) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // Permission check
    if (req.user.role !== 'super_admin' && req.user.department_id !== existing.department_id) {
      return res.status(403).json({ error: 'You do not have permission to modify events from other departments.' });
    }

    const {
      title,
      description,
      academic_year,
      category,
      fees,
      event_date,
      event_time,
      venue,
      registration_deadline,
      registration_link,
      payment_qr,
      faculty_coordinator,
      student_coordinator,
      contact_1,
      contact_2,
      contact_3,
      poster_image,
      brochure_url,
      video_url,
      rules,
      eligibility,
      schedule,
      sponsors,
      winners,
      faqs,
      status
    } = req.body;

    const dataToUpdate = {};
    if (title) dataToUpdate.title = title.trim();
    if (description !== undefined) dataToUpdate.description = description.trim();
    if (academic_year) dataToUpdate.academic_year = academic_year.trim();
    if (category) dataToUpdate.category = category;
    if (fees !== undefined) dataToUpdate.fees = fees.trim();
    if (event_date) dataToUpdate.event_date = event_date;
    if (event_time) dataToUpdate.event_time = event_time;
    if (venue) dataToUpdate.venue = venue.trim();
    if (registration_deadline) dataToUpdate.registration_deadline = registration_deadline;
    if (registration_link !== undefined) dataToUpdate.registration_link = registration_link ? registration_link.trim() : null;
    if (payment_qr !== undefined) dataToUpdate.payment_qr = payment_qr ? payment_qr.trim() : null;
    if (faculty_coordinator !== undefined) dataToUpdate.faculty_coordinator = faculty_coordinator ? faculty_coordinator.trim() : null;
    if (student_coordinator !== undefined) dataToUpdate.student_coordinator = student_coordinator ? student_coordinator.trim() : null;
    if (contact_1 !== undefined) dataToUpdate.contact_1 = contact_1 ? contact_1.trim() : null;
    if (contact_2 !== undefined) dataToUpdate.contact_2 = contact_2 ? contact_2.trim() : null;
    if (contact_3 !== undefined) dataToUpdate.contact_3 = contact_3 ? contact_3.trim() : null;
    if (poster_image) dataToUpdate.poster_image = poster_image.trim();
    if (brochure_url !== undefined) dataToUpdate.brochure_url = brochure_url ? brochure_url.trim() : null;
    if (video_url !== undefined) dataToUpdate.video_url = video_url ? video_url.trim() : null;
    if (rules !== undefined) dataToUpdate.rules = typeof rules === 'object' ? JSON.stringify(rules) : rules;
    if (eligibility !== undefined) dataToUpdate.eligibility = eligibility ? eligibility.trim() : null;
    if (schedule !== undefined) dataToUpdate.schedule = typeof schedule === 'object' ? JSON.stringify(schedule) : schedule;
    if (sponsors !== undefined) dataToUpdate.sponsors = typeof sponsors === 'object' ? JSON.stringify(sponsors) : sponsors;
    if (winners !== undefined) dataToUpdate.winners = typeof winners === 'object' ? JSON.stringify(winners) : winners;
    if (faqs !== undefined) dataToUpdate.faqs = typeof faqs === 'object' ? JSON.stringify(faqs) : faqs;
    if (status && req.user.role === 'super_admin') dataToUpdate.status = status;

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: dataToUpdate,
      include: { department: true }
    });

    await prisma.auditLog.create({
      data: {
        user: req.user.username,
        department: updated.department.code,
        ip: req.ip || '127.0.0.1',
        env: req.headers['user-agent'] || 'Server',
        action: 'Event Updated',
        details: `Updated event '${updated.title}' (${existing.status} -> ${updated.status})`
      }
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event.' });
  }
});

// PATCH /api/events/:id/status - Approve or Reject event (Super Admin)
router.patch('/:id/status', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const { status, feedback } = req.body;

    if (!status || !['Published', 'Rejected', 'Draft', 'Pending Approval'].includes(status)) {
      return res.status(400).json({ error: 'Valid status required (Published, Rejected, Draft, Pending Approval).' });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { department: true }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: { status }
    });

    // Notification to department admins
    await prisma.notification.create({
      data: {
        title: status === 'Published' ? 'Event Approved & Published' : 'Event Approval Status Update',
        message: status === 'Published'
          ? `Your event '${event.title}' was approved by Super Admin and is now live!`
          : `Event '${event.title}' was updated to status '${status}'. Feedback: ${feedback || 'None provided.'}`,
        department_id: event.department_id,
        role_target: 'dept_admin'
      }
    });

    await prisma.auditLog.create({
      data: {
        user: req.user.username,
        department: 'Super Admin',
        ip: req.ip || '127.0.0.1',
        env: req.headers['user-agent'] || 'Server',
        action: `Event Status ${status}`,
        details: `${event.title} status changed from ${event.status} to ${status}. Feedback: ${feedback || 'N/A'}`
      }
    });

    res.json({ message: `Event status updated to ${status}.`, event: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event status.' });
  }
});

// DELETE /api/events/:id - Delete event
router.delete('/:id', authenticateToken, requireDeptAdminOrSuperAdmin, async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { department: true }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    if (req.user.role !== 'super_admin' && req.user.department_id !== event.department_id) {
      return res.status(403).json({ error: 'Permission denied.' });
    }

    await prisma.event.delete({ where: { id: eventId } });

    await prisma.auditLog.create({
      data: {
        user: req.user.username,
        department: event.department.code,
        ip: req.ip || '127.0.0.1',
        env: req.headers['user-agent'] || 'Server',
        action: 'Event Deleted',
        details: `Deleted event '${event.title}' permanently`
      }
    });

    res.json({ message: 'Event successfully deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event.' });
  }
});

// POST /api/events/:id/download - Track brochure downloads
router.post('/:id/download', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    await prisma.event.update({
      where: { id: eventId },
      data: { downloads: { increment: 1 } }
    });
    res.json({ message: 'Download tracked.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track download.' });
  }
});

module.exports = router;
