require('dotenv').config();
const bcrypt = require('bcryptjs');
const prisma = require('./db');

const DEPARTMENTS = [
  { id: 1, code: 'CSE', name: 'Computer Science and Engineering (CSE)', banner_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80', description: 'Empowering students with advanced computing paradigms, software engineering, algorithmic design, and cutting-edge research.' },
  { id: 2, code: 'CSE-AIML', name: 'CSE (Artificial Intelligence and Machine Learning)', banner_image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=1200&auto=format&fit=crop&q=80', description: 'Specializing in deep learning, intelligent autonomous systems, computer vision, data engineering, and modern neural network architectures.' },
  { id: 10, code: 'CSIT', name: 'Computer Science and Information Technology (CSIT)', banner_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80', description: 'Focuses on enterprise cloud architectures, IT infrastructure, network security, and scalable software solutions.' },
  { id: 14, code: 'IT', name: 'Information Technology (IT)', banner_image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80', description: 'Advancing information systems, cybersecurity, web technologies, database administration, and software development.' },
  { id: 3, code: 'MECH', name: 'Mechanical Engineering', banner_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80', description: 'Foundational engineering focusing on thermal sciences, CAD/CAM/CAE, manufacturing innovation, fluid mechanics, and machine design.' },
  { id: 4, code: 'CIVIL', name: 'Civil Engineering', banner_image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200&auto=format&fit=crop&q=80', description: 'Leading innovations in sustainable infrastructure, structural engineering, surveying, geotechnical engineering, and smart construction.' },
  { id: 5, code: 'ELECTRICAL', name: 'Electrical Engineering', banner_image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80', description: 'Focuses on electrical power systems, smart grids, industrial power electronics, renewable energy, and electric drives.' },
  { id: 6, code: 'E&TC', name: 'Electronics and Telecommunication Engineering (E&TC)', banner_image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=1200&auto=format&fit=crop&q=80', description: 'Covers telecommunications, VLSI systems, microcontrollers, embedded IoT devices, digital signal processing, and RF engineering.' },
  { id: 12, code: 'MECHATRONICS', name: 'Mechatronics Engineering', banner_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80', description: 'A multidisciplinary branch integrating mechanical systems, electronic hardware, control automation, and computer engineering.' },
  { id: 11, code: 'ROBOTICS', name: 'Robotics and Automation', banner_image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80', description: 'Developing autonomous robots, industrial automation systems, sensor integration, robotic kinematics, and AI-driven control.' },
  { id: 15, code: 'AUTO', name: 'Automotive Technology (Automobile Engineering)', banner_image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80', description: 'Specialized studies in automotive design, EV vehicle powertrain systems, IC engines, vehicle dynamics, and aerodynamics.' },
  { id: 13, code: 'FE', name: 'Sciences and Humanities', banner_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80', description: 'Building rigorous foundational competence for first-year engineering students across applied physics, chemistry, mathematics, and professional communication.' },
  { id: 8, code: 'DMS', name: 'Department of Management Studies (MBA / BBA)', banner_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80', description: 'Cultivating leadership, corporate strategy, marketing, finance, human resources, and entrepreneurship.' },
  { id: 7, code: 'MCA-BCA', name: 'Department of Computer Applications (MCA / BCA)', banner_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80', description: 'Professional computing education focusing on full-stack web and mobile application engineering, database administration, and software methodologies.' },
  { id: 16, code: 'DESIGN', name: 'Department of Design (B.Des)', banner_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80', description: 'Fostering industrial product design, UI/UX aesthetics, design thinking, ergonomic modeling, and creative visual communication.' },
  { id: 17, code: 'DIPLOMA', name: 'Diploma (Polytechnic) Wing', banner_image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80', description: 'Comprehensive polytechnic engineering education imparting hands-on technical skills, workshop mastery, and practical industrial training.' }
];

async function seed() {
  console.log('Seeding RIT Central Portal Database...');

  // 1. Clear existing
  await prisma.notification.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.visitorStat.deleteMany({});

  // 2. Seed Departments
  console.log('Inserting departments...');
  for (const dept of DEPARTMENTS) {
    await prisma.department.create({ data: dept });
  }

  // 3. Seed Users
  console.log('Inserting users...');
  const superPassword = await bcrypt.hash('admin123', 10);
  const csePassword = await bcrypt.hash('cse123', 10);

  await prisma.user.create({
    data: {
      id: 1,
      username: 'superadmin',
      password: superPassword,
      full_name: 'Dr. P. V. Kulkarni (Director)',
      role: 'super_admin',
      department_id: null
    }
  });

  await prisma.user.create({
    data: {
      id: 2,
      username: 'cseadmin',
      password: csePassword,
      full_name: 'Prof. Amit Patil (CSE HOD)',
      role: 'dept_admin',
      department_id: 1
    }
  });

  // 4. Seed Events
  console.log('Inserting events...');
  const EVENTS = [
    {
      id: 1,
      title: 'Hack-O-Fiesta 2026',
      description: 'A 24-hour national-level hackathon for engineering students to build innovative software solutions addressing real-world problems in Healthcare, FinTech, and Smart Cities.',
      department_id: 1,
      academic_year: '2025-2026',
      category: 'Technical',
      event_date: '2026-10-15',
      event_time: '09:00',
      venue: 'RIT CSE Lab Center',
      registration_deadline: '2026-10-10',
      registration_link: 'https://forms.gle/demo-hack-o-fiesta',
      payment_qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RIT-CSE-HACK-PAY',
      fees: 'Rs. 200 per team',
      faculty_coordinator: 'Prof. Amit Patil',
      student_coordinator: 'Rajesh Kulkarni',
      contact_1: '9876543210',
      contact_2: '9876543211',
      contact_3: '',
      poster_image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60',
      rules: JSON.stringify([
        'Teams must consist of 2 to 4 students from recognized colleges.',
        'All work must be developed during the hackathon period.',
        'Mentors and industry experts will evaluate prototypes at checkpoint hours.'
      ]),
      eligibility: 'Open to all Engineering, MCA, and Polytechnic students across India.',
      schedule: JSON.stringify([
        { time: '09:00 AM', title: 'Registration & Team Onboarding' },
        { time: '10:00 AM', title: 'Problem Statement Release & Hacking Begins' },
        { time: '03:00 PM', title: 'Phase 1 Architecture Checkpoint' },
        { time: '09:00 AM (Day 2)', title: 'Final Code Freeze & Jury Pitches' }
      ]),
      sponsors: JSON.stringify([
        { name: 'Persistent Systems', tier: 'Title Partner', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100' },
        { name: 'GitHub Campus', tier: 'Tech Partner', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100' }
      ]),
      faqs: JSON.stringify([
        { q: 'Can inter-college teams participate?', a: 'Yes, students from different institutes can form a joint team.' },
        { q: 'Will accommodation and food be provided?', a: 'Yes, campus hostel accommodation and cafeteria meals are covered.' }
      ]),
      status: 'Published',
      views: 312,
      downloads: 48
    },
    {
      id: 2,
      title: 'CodeDash 2025',
      description: 'A premium coding competition and tech-symposium for Computer Science & Information Technology students showcasing logical thinking, problem-solving, and speed coding contests.',
      department_id: 10,
      academic_year: '2024-2025',
      category: 'Technical',
      event_date: '2025-02-25',
      event_time: '10:00',
      venue: 'RIT CSIT Advanced Lab',
      registration_deadline: '2025-02-23',
      fees: 'Free',
      faculty_coordinator: 'Dr. S. R. Patil',
      student_coordinator: 'Vinay Kulkarni',
      contact_1: '9111222333',
      poster_image: 'assets/codedash/pic1.jpg',
      rules: 'Individual coding challenge on HackerRank platform. Plagiarism will lead to immediate disqualification.',
      eligibility: 'All CS and IT students.',
      status: 'Published',
      views: 245,
      downloads: 68
    },
    {
      id: 3,
      title: 'ORION 2026',
      description: "Electronics and Telecommunication Engineering Students' Association (ETESA) presents ORION 2026. Featuring Robo-Race and Shark Tank contests with a total prize pool of Rs. 25,000.",
      department_id: 6,
      academic_year: '2025-2026',
      category: 'Technical',
      event_date: '2026-02-26',
      event_time: '09:00',
      venue: 'ETC Department Labs',
      registration_deadline: '2026-02-24',
      fees: 'Robo-Race: Rs. 200/Group, Shark Tank: Rs. 120/Person',
      faculty_coordinator: 'Prof. D. M. Mali',
      student_coordinator: 'Shreyash Kore / Shravani Jadhav',
      contact_1: '8055747576 (Robo-Race)',
      contact_2: '7798699697 (Shark Tank)',
      contact_3: '9370307376 (Rohan Kadam)',
      poster_image: 'assets/orion/poster.jpg',
      rules: 'Bot specifications: Maximum 30x30 cm, 24V supply. Wireless or wired control allowed.',
      eligibility: 'Open to all branches.',
      status: 'Published',
      views: 185,
      downloads: 42
    },
    {
      id: 4,
      title: 'FE Induction & Innovation Expo',
      description: 'Orientation program and project showcase for newly admitted first-year engineering students to explore robotics, green energy, smart sensors, and software.',
      department_id: 13,
      academic_year: '2025-2026',
      category: 'Technical',
      event_date: '2026-09-01',
      event_time: '10:00',
      venue: 'RIT Central Auditorium',
      registration_deadline: '2026-08-30',
      fees: 'Free',
      faculty_coordinator: 'Dr. M. S. Kumbhar',
      student_coordinator: 'Atharva Mane',
      contact_1: '9421112233',
      poster_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      rules: 'Mandatory participation for all First Year student cohorts.',
      eligibility: 'First Year B.Tech students.',
      status: 'Published',
      views: 190,
      downloads: 30
    }
  ];

  for (const ev of EVENTS) {
    await prisma.event.create({ data: ev });
  }

  // 5. Seed Registrations
  console.log('Inserting registrations...');
  const REGISTRATIONS = [
    { id: 1, event_id: 1, name: 'Sanjay Deshmukh', email: 'sanjay.deshmukh@rit.edu', department_id: 1, ticket_id: 'RIT-REG-987151', paid: true, checked_in: true },
    { id: 2, event_id: 1, name: 'Arya Kulkarni', email: 'arya.kulkarni@rit.edu', department_id: 1, ticket_id: 'RIT-REG-324151', paid: true, checked_in: false },
    { id: 3, event_id: 2, name: 'Rahul Shinde', email: 'rahul.shinde@rit.edu', department_id: 10, ticket_id: 'RIT-REG-112233', paid: true, checked_in: true },
    { id: 4, event_id: 3, name: 'Tejaswini Patil', email: 'tejaswini.patil@rit.edu', department_id: 6, ticket_id: 'RIT-REG-456789', paid: true, checked_in: false }
  ];

  for (const reg of REGISTRATIONS) {
    await prisma.registration.create({ data: reg });
  }

  // 6. Seed Notifications
  console.log('Inserting notifications...');
  await prisma.notification.create({
    data: {
      title: 'Welcome to RIT Event Portal',
      message: 'Centralized events management is active for all departments.',
      role_target: 'all'
    }
  });
  await prisma.notification.create({
    data: {
      title: 'Event Approved: Hack-O-Fiesta',
      message: 'Hack-O-Fiesta 2026 has been approved by Super Admin and published.',
      role_target: 'dept_admin',
      department_id: 1
    }
  });

  // 7. Seed Audit Log
  await prisma.auditLog.create({
    data: {
      user: 'system',
      department: 'System',
      ip: '127.0.0.1',
      env: 'Prisma Seeder',
      action: 'Database Initialization',
      details: 'Populated default RIT branches, coordinators, events, and mock statistics.'
    }
  });

  console.log('🎉 Database seeded successfully!');
}

seed()
  .catch(err => {
    console.error('Seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
