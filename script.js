// ============================================================================
// RIT Central Event Management Portal - Main Logic Engine
// ============================================================================

// --- 1. INITIAL STATE & SEED DATABASE SYSTEM ---

const DEFAULT_DEPARTMENTS = [
  { id: 1, name: 'Computer Science and Engineering (CSE)', code: 'CSE', banner_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80', description: 'Empowering students with advanced computing paradigms, software engineering, algorithmic design, and cutting-edge research.' },
  { id: 2, name: 'CSE (Artificial Intelligence and Machine Learning)', code: 'CSE-AIML', banner_image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=1200&auto=format&fit=crop&q=80', description: 'Specializing in deep learning, intelligent autonomous systems, computer vision, data engineering, and modern neural network architectures.' },
  { id: 10, name: 'Computer Science and Information Technology (CSIT)', code: 'CSIT', banner_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80', description: 'Focuses on enterprise cloud architectures, IT infrastructure, network security, and scalable software solutions.' },
  { id: 14, name: 'Information Technology (IT)', code: 'IT', banner_image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80', description: 'Advancing information systems, cybersecurity, web technologies, database administration, and software development.' },
  { id: 3, name: 'Mechanical Engineering', code: 'MECH', banner_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80', description: 'Foundational engineering focusing on thermal sciences, CAD/CAM/CAE, manufacturing innovation, fluid mechanics, and machine design.' },
  { id: 4, name: 'Civil Engineering', code: 'CIVIL', banner_image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200&auto=format&fit=crop&q=80', description: 'Leading innovations in sustainable infrastructure, structural engineering, surveying, geotechnical engineering, and smart construction.' },
  { id: 5, name: 'Electrical Engineering', code: 'ELECTRICAL', banner_image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80', description: 'Focuses on electrical power systems, smart grids, industrial power electronics, renewable energy, and electric drives.' },
  { id: 6, name: 'Electronics and Telecommunication Engineering (E&TC)', code: 'E&TC', banner_image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=1200&auto=format&fit=crop&q=80', description: 'Covers telecommunications, VLSI systems, microcontrollers, embedded IoT devices, digital signal processing, and RF engineering.' },
  { id: 12, name: 'Mechatronics Engineering', code: 'MECHATRONICS', banner_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80', description: 'A multidisciplinary branch integrating mechanical systems, electronic hardware, control automation, and computer engineering.' },
  { id: 11, name: 'Robotics and Automation', code: 'ROBOTICS', banner_image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80', description: 'Developing autonomous robots, industrial automation systems, sensor integration, robotic kinematics, and AI-driven control.' },
  { id: 15, name: 'Automotive Technology (Automobile Engineering)', code: 'AUTO', banner_image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80', description: 'Specialized studies in automotive design, EV vehicle powertrain systems, IC engines, vehicle dynamics, and aerodynamics.' },
  { id: 13, name: 'Sciences and Humanities', code: 'FE', banner_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80', description: 'Building rigorous foundational competence for first-year engineering students across applied physics, chemistry, mathematics, and professional communication.' },
  { id: 8, name: 'Department of Management Studies (MBA / BBA)', code: 'DMS', banner_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80', description: 'Cultivating leadership, corporate strategy, marketing, finance, human resources, and entrepreneurship.' },
  { id: 7, name: 'Department of Computer Applications (MCA / BCA)', code: 'MCA-BCA', banner_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=80', description: 'Professional computing education focusing on full-stack web and mobile application engineering, database administration, and software methodologies.' },
  { id: 16, name: 'Department of Design (B.Des)', code: 'DESIGN', banner_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80', description: 'Fostering industrial product design, UI/UX aesthetics, design thinking, ergonomic modeling, and creative visual communication.' },
  { id: 17, name: 'Diploma (Polytechnic) Wing', code: 'DIPLOMA', banner_image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80', description: 'Comprehensive polytechnic engineering education imparting hands-on technical skills, workshop mastery, and practical industrial training.' }
];

const DEFAULT_USERS = [
  { id: 1, username: 'superadmin', password: 'admin123', department_id: null, role: 'super_admin', full_name: 'Dr. P. V. Kulkarni (Director)' },
  { id: 2, username: 'cseadmin', password: 'cse123', department_id: 1, role: 'dept_admin', full_name: 'Prof. Amit Patil (CSE HOD)' }
];

const DEFAULT_EVENTS = [
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
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 124,
    downloads: 32
  },
  {
    id: 2,
    title: 'CodeQuest DSA Coding Contest',
    description: 'Test your data structures and algorithms skills! Solve complex coding puzzles under tight time constraints. Supports C++, Java, and Python.',
    department_id: 1,
    academic_year: '2025-2026',
    category: 'Technical',
    event_date: '2026-08-28',
    event_time: '14:00',
    venue: 'Online (HackerRank Platform)',
    registration_deadline: '2026-08-25',
    registration_link: 'https://hackerrank.com/rit-codequest',
    payment_qr: '',
    fees: 'Free',
    faculty_coordinator: 'Mrs. Priya Deshmukh',
    student_coordinator: 'Simran Shaikh',
    contact_1: '8765432109',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 89,
    downloads: 12
  },
  {
    id: 3,
    title: 'Hands-on Java Programming Workshop',
    description: 'Practical learning sessions for beginners. Covers Object Oriented Programming (OOP), interfaces, collections framework, and basic multi-threading principles.',
    department_id: 1,
    academic_year: '2024-2025',
    category: 'Technical',
    event_date: '2024-09-12',
    event_time: '10:00',
    venue: 'CSE Seminar Hall',
    registration_deadline: '2024-09-10',
    registration_link: '',
    payment_qr: '',
    fees: 'Free',
    faculty_coordinator: 'Prof. Amit Patil',
    student_coordinator: 'Ameya Joshi',
    contact_1: '9988776655',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 145,
    downloads: 41
  },
  {
    id: 4,
    title: 'Neural Network Masterclass',
    description: 'An advanced seminar on building deep learning neural networks from scratch. Topics include feedforward nodes, backpropagation, and training optimization.',
    department_id: 2,
    academic_year: '2025-2026',
    category: 'Technical',
    event_date: '2026-09-05',
    event_time: '10:30',
    venue: 'RIT Central Auditorium',
    registration_deadline: '2026-09-02',
    registration_link: 'https://forms.gle/neural-masterclass',
    payment_qr: 'qr_code.png',
    fees: 'Rs. 50',
    faculty_coordinator: 'Dr. Snehal Shinde',
    student_coordinator: 'Nikhil Kadam',
    contact_1: '7654321098',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 73,
    downloads: 18
  },
  {
    id: 5,
    title: 'AI Movie Night & Ethics Discussion',
    description: 'Screening of classic science fiction films depicting AGI, followed by an interactive panel discussion with college HODs on ethics and real-world compliance.',
    department_id: 2,
    academic_year: '2024-2025',
    category: 'Non Technical',
    event_date: '2025-01-20',
    event_time: '17:00',
    venue: 'Mechanical Seminar Hall',
    registration_deadline: '2025-01-18',
    registration_link: '',
    payment_qr: '',
    fees: 'Free',
    faculty_coordinator: 'Dr. Snehal Shinde',
    student_coordinator: 'Neha Patil',
    contact_1: '9123456789',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 62,
    downloads: 5
  },
  {
    id: 6,
    title: 'CAD-O-MANIA 3D Design',
    description: 'Create computer-aided designs of functional industrial engines under specified engineering rules. Software allowed: AutoCAD, SolidWorks, CATIA.',
    department_id: 3,
    academic_year: '2025-2026',
    category: 'Technical',
    event_date: '2026-11-10',
    event_time: '09:00',
    venue: 'CAD Lab (Mechanical Wing)',
    registration_deadline: '2026-11-05',
    registration_link: '',
    payment_qr: '',
    fees: 'Rs. 100 per team',
    faculty_coordinator: 'Prof. Vikram Mane',
    student_coordinator: 'Harshal Bhosale',
    contact_1: '8888999900',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 55,
    downloads: 14
  },
  {
    id: 7,
    title: 'RIT Go-Kart Championship',
    description: 'A premium racing event showing custom go-karts. Teams present mechanical designs, aerodynamics reports, structural parameters, and race on the campus track.',
    department_id: 3,
    academic_year: '2023-2024',
    category: 'Technical',
    event_date: '2024-02-15',
    event_time: '08:00',
    venue: 'RIT Sports Ground Track',
    registration_deadline: '2024-02-01',
    registration_link: 'https://forms.gle/gokart',
    payment_qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RIT-MECH-GOKART-PAY',
    fees: 'Rs. 1000 per team',
    faculty_coordinator: 'Prof. Vikram Mane',
    student_coordinator: 'Saurabh Pawar',
    contact_1: '9090909090',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 198,
    downloads: 50
  },
  {
    id: 8,
    title: 'Concrete Cube Compressive Strength Test',
    description: 'Design concrete mixtures to achieve maximum compressive load-bearing limits with optimal concrete-to-filler ratios. Testing done in civil workshops.',
    department_id: 4,
    academic_year: '2024-2025',
    category: 'Technical',
    event_date: '2025-03-02',
    event_time: '11:00',
    venue: 'Concrete Technology Lab',
    registration_deadline: '2025-02-28',
    registration_link: '',
    payment_qr: '',
    fees: 'Free',
    faculty_coordinator: 'Prof. Sunil Naik',
    student_coordinator: 'Aniket Yadav',
    contact_1: '7778889990',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&auto=format&fit=crop&q=60',
    status: 'Published',
    views: 47,
    downloads: 9
  },
  {
    id: 9,
    title: 'CodeDash',
    description: 'A premium coding competition and tech-symposium for Computer Science & Information Technology students showcasing logical thinking, problem-solving, and speed coding contests.',
    department_id: 10,
    academic_year: '2024-2025',
    category: 'Technical',
    event_date: '2025-02-25',
    event_time: '10:00',
    venue: 'RIT CSIT Advanced Lab',
    registration_deadline: '2025-02-23',
    registration_link: '',
    payment_qr: '',
    fees: 'Free',
    faculty_coordinator: 'Dr. S. R. Patil',
    student_coordinator: 'Vinay Kulkarni',
    contact_1: '9111222333',
    contact_2: '',
    contact_3: '',
    poster_image: 'assets/codedash/pic1.jpg',
    gallery_images: [
      'assets/codedash/pic2.jpg',
      'assets/codedash/pic3.jpg',
      'assets/codedash/pic4.jpg'
    ],
    status: 'Published',
    views: 245,
    downloads: 68
  },
  {
    id: 10,
    title: 'ORION 2026',
    description: 'Electronics and Telecommunication Engineering Students\' Association (ETESA) presents ORION 2026. Featuring Robo-Race (Group of 2, Entry Fee: Rs. 200 per group) and Shark Tank (Group of 1-4, Entry Fee: Rs. 120 per person) contests with a total prize pool of Rs. 25,000.',
    department_id: 6,
    academic_year: '2025-2026',
    category: 'Technical',
    event_date: '2026-02-26',
    event_time: '09:00',
    venue: 'ETC Department',
    registration_deadline: '2026-02-24',
    registration_link: '',
    payment_qr: '',
    fees: 'Robo-Race: Rs. 200/Group, Shark Tank: Rs. 120/Person',
    faculty_coordinator: 'Prof. D. M. Mali',
    student_coordinator: 'Shreyash Kore / Shravani Jadhav',
    contact_1: '8055747576 (Robo-Race)',
    contact_2: '7798699697 (Shark Tank)',
    contact_3: '9370307376 (Rohan Kadam)',
    poster_image: 'assets/orion/poster.jpg',
    gallery_images: [
      'assets/orion/pic1.png',
      'assets/orion/pic2.png',
      'assets/orion/pic3.png'
    ],
    status: 'Published',
    views: 85,
    downloads: 12
  },
  {
    id: 11,
    title: 'FE Induction & Innovation Expo',
    description: 'Comprehensive orientation and technical project display for first-year engineering students exploring robotics, green energy, smart sensors, and software.',
    department_id: 13,
    academic_year: '2025-2026',
    category: 'Technical',
    event_date: '2026-09-01',
    event_time: '10:00',
    venue: 'RIT Central Auditorium',
    registration_deadline: '2026-08-30',
    registration_link: '',
    payment_qr: '',
    fees: 'Free',
    faculty_coordinator: 'Dr. M. S. Kumbhar',
    student_coordinator: 'Atharva Mane',
    contact_1: '9421112233',
    contact_2: '',
    contact_3: '',
    poster_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    rules: 'Mandatory participation for all First Year student cohorts.',
    eligibility: 'First Year B.Tech students.',
    status: 'Published',
    views: 190,
    downloads: 30
  }
];

const DEFAULT_REGISTRATIONS = [
  { id: 1, event_id: 1, name: 'Sanjay Deshmukh', email: 'sanjay.deshmukh@rit.edu', department_id: 1, ticket_id: 'RIT-REG-987151', paid: true, checked_in: true },
  { id: 2, event_id: 1, name: 'Arya Kulkarni', email: 'arya.kulkarni@rit.edu', department_id: 1, ticket_id: 'RIT-REG-324151', paid: true, checked_in: false },
  { id: 3, event_id: 2, name: 'Rahul Shinde', email: 'rahul.shinde@rit.edu', department_id: 2, ticket_id: 'RIT-REG-112233', paid: true, checked_in: true },
  { id: 4, event_id: 4, name: 'Tejaswini Patil', email: 'tejaswini.patil@rit.edu', department_id: 1, ticket_id: 'RIT-REG-456789', paid: true, checked_in: false }
];

const DEFAULT_LOGS = [
  { timestamp: '2026-08-20T10:15:30Z', user: 'system', department: 'System', ip: '127.0.0.1', env: 'Chrome 128 / Windows 11', action: 'Database Seed', details: 'Initialized data models with default records.' }
];

const DEFAULT_ACHIEVEMENTS = [
  {
    id: 1,
    dept_id: 1,
    badge: 'National Winners (Smart India Hackathon)',
    title: '1st Prize - SIH 2025 Hardware & Software Edition',
    desc: 'Team CodeCrafters from CSE won 1st Place with Rs. 1,00,000 cash award for developing an AI-driven disaster response system for the Ministry of Home Affairs.',
    year: '2024-2025',
    date: 'Dec 2024'
  },
  {
    id: 2,
    dept_id: 1,
    badge: 'Patent Published',
    title: 'Intellectual Property: Automated Cloud Load Balancing Algorithm',
    desc: 'Published patent by CSE faculty and final year students on adaptive predictive multi-node resource allocation for container clusters.',
    year: '2025-2026',
    date: 'Jan 2026'
  },
  {
    id: 3,
    dept_id: 10,
    badge: 'National Tech Symposium Winner',
    title: 'State Level CodeDash Champion Trophy',
    desc: 'Secured overall Championship Trophy with 14 podium finishes across algorithmic contests and UI/UX design sprints.',
    year: '2024-2025',
    date: 'Feb 2025'
  },
  {
    id: 4,
    dept_id: 6,
    badge: 'National Robo-Race 1st Place',
    title: 'IIT Bombay Techfest & Orion Robo-Race Winners',
    desc: 'ETESA robotics squad engineered high-torque autonomous obstacle navigators securing Gold at state robotics leagues.',
    year: '2025-2026',
    date: 'Feb 2026'
  },
  {
    id: 5,
    dept_id: 3,
    badge: 'National Racing Champions',
    title: 'Formula Student & Go-Kart Championship 1st Rank',
    desc: 'Best vehicle dynamics, endurance reliability, and fastest campus lap time in the western regional division.',
    year: '2023-2024',
    date: 'Feb 2024'
  },
  {
    id: 6,
    dept_id: 2,
    badge: 'Kaggle Grandmaster Track',
    title: 'Top 1% Global Healthcare Vision Hackathon',
    desc: 'Deep learning team engineered an ultrasound segmentation model with 98.4% diagnostic accuracy published in IEEE symposium.',
    year: '2025-2026',
    date: 'Mar 2026'
  },
  {
    id: 7,
    dept_id: 13,
    badge: 'Avishkar Research Convention',
    title: 'State Level Innovation 1st Place (First Year B.Tech)',
    desc: 'Freshmen innovators showcased eco-friendly bio-plastic packaging from agro-waste winning the Zonal Avishkar Trophy.',
    year: '2025-2026',
    date: 'Jan 2026'
  }
];

const DEFAULT_COORDINATORS = {
  1: {
    faculty: [
      { name: 'Prof. Amit Patil', role: 'CSE HOD & Chief Faculty Coordinator', email: 'amit.patil@rit.edu', phone: '9876543210', room: 'CSE Block Room 204' },
      { name: 'Mrs. Priya Deshmukh', role: 'Assistant Professor & Tech Lead', email: 'priya.deshmukh@rit.edu', phone: '9876543212', room: 'CSE Lab 3' }
    ],
    students: [
      { name: 'Rajesh Kulkarni', role: 'Lead Student Organizer (Hack-O-Fiesta)', year: 'B.Tech Final Year CSE', email: 'rajesh.kulkarni@rit.edu', phone: '9876543210' },
      { name: 'Simran Shaikh', role: 'Coding Contest Coordinator (CodeQuest)', year: 'B.Tech Third Year CSE', email: 'simran.shaikh@rit.edu', phone: '8765432109' }
    ]
  },
  10: {
    faculty: [
      { name: 'Dr. S. R. Patil', role: 'CSIT Program Head & Event Mentor', email: 'sr.patil@rit.edu', phone: '9111222333', room: 'CSIT Wing 102' }
    ],
    students: [
      { name: 'Vinay Kulkarni', role: 'CodeDash President', year: 'B.Tech Final Year CSIT', email: 'vinay.k@rit.edu', phone: '9111222333' }
    ]
  },
  6: {
    faculty: [
      { name: 'Prof. D. M. Mali', role: 'Faculty Coordinator (ETESA)', email: 'dm.mali@rit.edu', phone: '8055747576', room: 'ETC Wing 201' }
    ],
    students: [
      { name: 'Shreyash Kore', role: 'Robo-Race Coordinator (ORION 2026)', year: 'B.Tech Third Year ENTC', email: 'shreyash.k@rit.edu', phone: '8055747576' },
      { name: 'Shravani Jadhav', role: 'Shark Tank Coordinator', year: 'B.Tech Third Year ENTC', email: 'shravani.j@rit.edu', phone: '7798699697' }
    ]
  },
  13: {
    faculty: [
      { name: 'Dr. M. S. Kumbhar', role: 'Head, First Year Engineering (AS&H)', email: 'ms.kumbhar@rit.edu', phone: '9421112233', room: 'Basic Science Block B-1' }
    ],
    students: [
      { name: 'Atharva Mane', role: 'First Year Student Council Lead', year: 'B.Tech First Year', email: 'atharva.mane@rit.edu', phone: '9421112233' }
    ]
  }
};

const DEFAULT_NOTIFICATIONS = [
  { id: 1, title: 'Welcome to RIT Event Portal', message: 'Centralized events management is active for all college departments.', time: 'Just now', unread: true },
  { id: 2, title: 'Hack-O-Fiesta 2026 Approved', message: 'CSE event Hack-O-Fiesta 2026 approved by Director and published.', time: '10 mins ago', unread: true },
  { id: 3, title: 'New Participant Registration', message: 'Sanjay Deshmukh registered for Hack-O-Fiesta 2026.', time: '1 hour ago', unread: false }
];

const DEFAULT_VISITOR_STATS = [
  { date: '2026-08-07', daily_visitors: 420, campus_wifi: 230, social_media: 90, google_search: 60, direct_traffic: 30, qr_code_scans: 10 },
  { date: '2026-08-08', daily_visitors: 510, campus_wifi: 280, social_media: 110, google_search: 70, direct_traffic: 35, qr_code_scans: 15 },
  { date: '2026-08-09', daily_visitors: 380, campus_wifi: 190, social_media: 95, google_search: 55, direct_traffic: 25, qr_code_scans: 15 },
  { date: '2026-08-10', daily_visitors: 620, campus_wifi: 340, social_media: 130, google_search: 85, direct_traffic: 45, qr_code_scans: 20 },
  { date: '2026-08-11', daily_visitors: 750, campus_wifi: 410, social_media: 160, google_search: 105, direct_traffic: 50, qr_code_scans: 25 },
  { date: '2026-08-12', daily_visitors: 820, campus_wifi: 450, social_media: 180, google_search: 110, direct_traffic: 55, qr_code_scans: 25 },
  { date: '2026-08-13', daily_visitors: 690, campus_wifi: 380, social_media: 150, google_search: 95, direct_traffic: 45, qr_code_scans: 20 },
  { date: '2026-08-14', daily_visitors: 890, campus_wifi: 490, social_media: 190, google_search: 120, direct_traffic: 60, qr_code_scans: 30 },
  { date: '2026-08-15', daily_visitors: 980, campus_wifi: 520, social_media: 210, google_search: 140, direct_traffic: 70, qr_code_scans: 40 },
  { date: '2026-08-16', daily_visitors: 540, campus_wifi: 270, social_media: 130, google_search: 80, direct_traffic: 40, qr_code_scans: 20 },
  { date: '2026-08-17', daily_visitors: 780, campus_wifi: 430, social_media: 170, google_search: 110, direct_traffic: 50, qr_code_scans: 20 },
  { date: '2026-08-18', daily_visitors: 860, campus_wifi: 470, social_media: 190, google_search: 120, direct_traffic: 55, qr_code_scans: 25 },
  { date: '2026-08-19', daily_visitors: 920, campus_wifi: 500, social_media: 200, google_search: 130, direct_traffic: 60, qr_code_scans: 30 },
  { date: '2026-08-20', daily_visitors: 1040, campus_wifi: 580, social_media: 230, google_search: 140, direct_traffic: 65, qr_code_scans: 25 }
];

// Database state lists
let departments = [];
let users = [];
let events = [];
let registrations = [];
let auditLogs = [];
let achievements = [];
let notifications = [];
let visitorStats = [];

// App runtime states
const appState = {
  activeView: 'home',
  params: {},
  user: null,
  darkMode: false,
  heroIndex: 0,
  heroInterval: null,
  currentCalendarDate: new Date(2026, 7, 20), // August 2026 (matching system date context)
  activeGalleryEventId: null,
  isApiConnected: false,
  apiUrl: 'http://localhost:5000/api',
  authToken: sessionStorage.getItem('rit_token') || null,
  rejectEventId: null,
  currentYearFilter: 'All'
};

// Global chart references to allow clean destruction and avoid canvas conflicts
let deptChartInstance = null;
let yearChartInstance = null;
let monthChartInstance = null;
let popularChartInstance = null;
let visitorChartInstance = null;
let trafficChartInstance = null;

function updateBackendStatus(isOnline) {
  appState.isApiConnected = isOnline;
  const pill = document.getElementById('backend-status-pill');
  const text = document.getElementById('backend-status-text');
  if (pill && text) {
    if (isOnline) {
      pill.classList.remove('offline');
      text.innerText = 'MongoDB Connected';
      pill.title = 'Connected to the MongoDB-backed API';
    } else {
      pill.classList.add('offline');
      text.innerText = 'Standalone Mode';
      pill.title = 'Offline / LocalStorage Mode (Node backend not detected)';
    }
  }
}

const apiService = {
  baseUrl: window.RIT_API_BASE_URL || (
    window.location.protocol === 'file:'
      ? 'http://localhost:5000/api'
      : window.location.hostname.endsWith('github.io')
        ? 'https://rit-central-event-management-portal.vercel.app/api'
        : '/api'
  ),

  async request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    if (appState.authToken) {
      headers.set('Authorization', `Bearer ${appState.authToken}`);
    }

    const response = await fetch(`${this.baseUrl}${path}`, { ...options, headers });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(result && result.error ? result.error : `Request failed (${response.status}).`);
    }
    return result;
  },

  async checkHealth() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: controller.signal });
      if (res.ok) {
        updateBackendStatus(true);
        await this.syncAllFromBackend();
        if (appState.activeView === 'home') loadHomeView();
        return true;
      }
    } catch (e) {
      // offline
    } finally {
      clearTimeout(timeoutId);
    }
    updateBackendStatus(false);
    return false;
  },

  async syncAllFromBackend() {
    if (!appState.isApiConnected) return;
    try {
      const [departmentsData, eventsData, visitorsData, notificationsData] = await Promise.all([
        this.request('/departments'),
        this.request('/events'),
        this.request('/analytics/visitors'),
        this.request('/notifications')
      ]);
      departments = departmentsData;
      events = eventsData;
      visitorStats = visitorsData.daily || [];
      notifications = notificationsData.map(notification => ({
        ...notification,
        unread: !notification.is_read,
        time: new Date(notification.created_at).toLocaleString()
      }));
      syncLocalStorage('departments');
      syncLocalStorage('events');
      syncLocalStorage('notifications');
      renderNotifications();
    } catch (e) {
      console.warn('Backend sync failed, using local cache:', e);
    }
  }
};

// Initialize and persistence hooks
function initDatabase() {
  // Clear stale local storage format to force migration (FE department, BBA addition and rich event updates)
  const storedDepts = localStorage.getItem('rit_departments');
  const storedEvents = localStorage.getItem('rit_events');

  let needsReset = false;
  if (storedDepts) {
    try {
      const parsed = JSON.parse(storedDepts);
      if (parsed.length !== DEFAULT_DEPARTMENTS.length || !storedDepts.includes('B.Des') || !storedDepts.includes('AUTO') || !storedDepts.includes('DIPLOMA')) {
        needsReset = true;
      }
    } catch (e) {
      needsReset = true;
    }
  }

  if (storedDepts && (needsReset || !storedDepts.includes('B.Des') || !storedDepts.includes('AUTO') || !storedDepts.includes('DIPLOMA') || !storedEvents || !storedEvents.includes('CodeDash'))) {
    localStorage.removeItem('rit_departments');
    localStorage.removeItem('rit_users');
    localStorage.removeItem('rit_events');
    localStorage.removeItem('rit_registrations');
    localStorage.removeItem('rit_audit_logs');
    localStorage.removeItem('rit_achievements');
    localStorage.removeItem('rit_notifications');
  }

  if (!localStorage.getItem('rit_departments')) {
    localStorage.setItem('rit_departments', JSON.stringify(DEFAULT_DEPARTMENTS));
  }
  if (!localStorage.getItem('rit_users')) {
    localStorage.setItem('rit_users', JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem('rit_events')) {
    localStorage.setItem('rit_events', JSON.stringify(DEFAULT_EVENTS));
  }
  if (!localStorage.getItem('rit_registrations')) {
    localStorage.setItem('rit_registrations', JSON.stringify(DEFAULT_REGISTRATIONS));
  }
  if (!localStorage.getItem('rit_audit_logs')) {
    localStorage.setItem('rit_audit_logs', JSON.stringify(DEFAULT_LOGS));
  }
  if (!localStorage.getItem('rit_achievements')) {
    localStorage.setItem('rit_achievements', JSON.stringify(DEFAULT_ACHIEVEMENTS));
  }
  if (!localStorage.getItem('rit_notifications')) {
    localStorage.setItem('rit_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
  }

  // Load from local storage into application memory
  departments = JSON.parse(localStorage.getItem('rit_departments'));
  users = JSON.parse(localStorage.getItem('rit_users'));
  events = JSON.parse(localStorage.getItem('rit_events'));
  registrations = JSON.parse(localStorage.getItem('rit_registrations'));
  auditLogs = JSON.parse(localStorage.getItem('rit_audit_logs'));
  achievements = JSON.parse(localStorage.getItem('rit_achievements'));
  notifications = JSON.parse(localStorage.getItem('rit_notifications'));
  visitorStats = DEFAULT_VISITOR_STATS;
}

function syncLocalStorage(key) {
  if (key === 'departments' || !key) localStorage.setItem('rit_departments', JSON.stringify(departments));
  if (key === 'users' || !key) localStorage.setItem('rit_users', JSON.stringify(users));
  if (key === 'events' || !key) localStorage.setItem('rit_events', JSON.stringify(events));
  if (key === 'registrations' || !key) localStorage.setItem('rit_registrations', JSON.stringify(registrations));
  if (key === 'audit_logs' || !key) localStorage.setItem('rit_audit_logs', JSON.stringify(auditLogs));
  if (key === 'achievements' || !key) localStorage.setItem('rit_achievements', JSON.stringify(achievements));
  if (key === 'notifications' || !key) localStorage.setItem('rit_notifications', JSON.stringify(notifications));
}

// --- 2. AUDIT LOG GENERATOR & DEVICE ANALYSIS ---

function getSystemSignature() {
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';
  
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Macintosh')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return `${browser} / ${os}`;
}

function generateMockIP() {
  // Simple generator to resemble local client networks
  return `10.45.12.${Math.floor(Math.random() * 250) + 1}`;
}

function addAuditLog(action, beforeData = 'N/A', afterData = 'N/A') {
  const operator = appState.user ? appState.user.fullName : 'Guest Visitor';
  const dept = appState.user ? (appState.user.role === 'super_admin' ? 'Super Admin' : appState.user.departmentCode) : 'Public';
  
  const newLog = {
    timestamp: new Date().toISOString(),
    user: operator,
    department: dept,
    ip: generateMockIP(),
    env: getSystemSignature(),
    action: action,
    details: `${beforeData} \u2192 ${afterData}`
  };

  auditLogs.unshift(newLog); // Prepend to show latest logs first
  syncLocalStorage('audit_logs');
}

// --- 3. CORE ROUTING & BREADCRUMBS ENGINE ---

function updateBreadcrumbs(viewName, params = {}) {
  const container = document.getElementById('breadcrumbs-holder');
  if (!container) return;

  container.innerHTML = '';
  
  // Home is always first
  const home = document.createElement('span');
  home.className = 'breadcrumb-item';
  home.style.cursor = 'pointer';
  home.innerText = 'Home';
  home.onclick = () => navigateTo('home');
  container.appendChild(home);

  if (viewName === 'department') {
    const dept = departments.find(d => d.id === parseInt(params.id));
    if (dept) {
      const activeDept = document.createElement('span');
      activeDept.className = 'breadcrumb-item active';
      activeDept.innerText = `${dept.code} Portal`;
      container.appendChild(activeDept);
    }
  } else if (viewName === 'event-details') {
    const event = events.find(e => e.id === parseInt(params.id));
    if (event) {
      const dept = departments.find(d => d.id === event.department_id);
      if (dept) {
        const deptLink = document.createElement('span');
        deptLink.className = 'breadcrumb-item';
        deptLink.style.cursor = 'pointer';
        deptLink.innerText = `${dept.code} Department`;
        deptLink.onclick = () => navigateTo('department', { id: dept.id });
        container.appendChild(deptLink);
      }
      
      const activeEvent = document.createElement('span');
      activeEvent.className = 'breadcrumb-item active';
      activeEvent.innerText = event.title;
      container.appendChild(activeEvent);
    }
  } else if (viewName === 'certificates') {
    const certItem = document.createElement('span');
    certItem.className = 'breadcrumb-item active';
    certItem.innerText = 'Certificate Desk';
    container.appendChild(certItem);
  } else if (viewName === 'login') {
    const loginItem = document.createElement('span');
    loginItem.className = 'breadcrumb-item active';
    loginItem.innerText = 'Coordinator Desk Login';
    container.appendChild(loginItem);
  } else if (viewName === 'dashboard') {
    const dashItem = document.createElement('span');
    dashItem.className = 'breadcrumb-item active';
    dashItem.innerText = 'Administrator Control Panel';
    container.appendChild(dashItem);
  }
}

function navigateTo(viewName, params = {}, push = true, skipScroll = false) {
  appState.activeView = viewName;
  appState.params = params;

  // Clear homepage hero sliders if moving away
  if (viewName !== 'home' && appState.heroInterval) {
    clearInterval(appState.heroInterval);
    appState.heroInterval = null;
  }

  // Manage view visibility
  document.querySelectorAll('.view').forEach(view => {
    view.classList.add('hidden');
  });

  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');
  });

  const targetSection = document.getElementById(`${viewName}-view`);
  if (targetSection) {
    targetSection.classList.remove('hidden');
  }

  // Sync Nav highlight states
  if (viewName === 'home') {
    document.getElementById('nav-home').classList.add('active');
  } else if (viewName === 'dashboard') {
    document.getElementById('nav-dashboard').classList.add('active');
  } else if (viewName === 'login') {
    document.getElementById('nav-login').classList.add('active');
  } else if (viewName === 'certificates') {
    const navCert = document.getElementById('nav-certificates');
    if (navCert) navCert.classList.add('active');
  }

  // Insert breadcrumb trails
  updateBreadcrumbs(viewName, params);

  if (!skipScroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Execute view triggers
  switch (viewName) {
    case 'home':
      loadHomeView();
      break;
    case 'department':
      loadDepartmentView(params.id);
      break;
    case 'event-details':
      loadEventDetailsView(params.id);
      break;
    case 'login':
      document.getElementById('login-error').classList.add('hidden');
      break;
    case 'dashboard':
      loadDashboardView();
      break;
    case 'certificates':
      document.getElementById('cert-result-box').classList.add('hidden');
      document.getElementById('cert-error').classList.add('hidden');
      document.getElementById('cert-ticket-id').value = '';
      break;
  }

  if (push) {
    try {
      history.pushState({ viewName, params }, "");
    } catch (e) {
      console.warn("Could not push state to history:", e);
    }
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// --- 4. PUBLIC VIEWS ENGINE (HOME, DEPT, DETAILS) ---

function loadHomeView() {
  renderStatsSection();
  renderDeptFilterDropdown();
  renderUpcomingEventsGrid();
  renderLatestEventsGrid();
  renderDepartmentsGrid();
  renderHeroSlider();
  renderGlobalCalendar();

  document.getElementById('filter-dept').onchange = filterEvents;
  document.getElementById('filter-year').onchange = filterEvents;
  document.getElementById('filter-category').onchange = filterEvents;
  document.getElementById('filter-status').onchange = filterEvents;
  document.getElementById('filter-month').onchange = filterEvents;
  const dateEl = document.getElementById('filter-date');
  if (dateEl) {
    dateEl.oninput = filterEvents;
  }
  document.getElementById('search-input').oninput = filterEvents;
}

function renderStatsSection() {
  const currentDate = '2026-08-20'; // Current simulation date
  const total = events.filter(e => e.status === 'Published').length;
  const upcoming = events.filter(e => e.status === 'Published' && e.event_date >= currentDate).length;
  const completed = total - upcoming;

  document.getElementById('stat-depts').innerText = departments.length;
  document.getElementById('stat-events').innerText = total;
  document.getElementById('stat-upcoming').innerText = upcoming;
  document.getElementById('stat-completed').innerText = completed;
  const participantEl = document.getElementById('stat-participants');
  if (participantEl) {
    participantEl.innerText = registrations.length || 0;
  }
}

function renderDeptFilterDropdown() {
  const select = document.getElementById('filter-dept');
  select.innerHTML = '<option value="">All Departments</option>';
  departments.forEach(d => {
    const option = document.createElement('option');
    option.value = d.id;
    option.innerText = d.name;
    select.appendChild(option);
  });
}

function renderUpcomingEventsGrid(filteredList = null, isFiltered = false) {
  const grid = document.getElementById('upcoming-events-grid');
  if (!grid) return;
  
  // If not filtering, only show public "Published" events
  const baseList = filteredList || events.filter(e => e.status === 'Published');
  const currentDate = '2026-08-20';

  let listToRender;
  if (isFiltered) {
    listToRender = baseList;
  } else {
    listToRender = baseList.filter(e => e.event_date >= currentDate);
  }

  // Sort events by date ascending
  listToRender.sort((a, b) => a.event_date.localeCompare(b.event_date));

  // Dynamically update section header text based on search/filter status
  const sectionHeader = grid.previousElementSibling?.querySelector('h2');
  if (sectionHeader) {
    if (isFiltered) {
      const statusVal = document.getElementById('filter-status')?.value || '';
      if (statusVal === 'Upcoming') {
        sectionHeader.innerText = 'Filtered Upcoming Events';
      } else if (statusVal === 'Completed') {
        sectionHeader.innerText = 'Filtered Completed Events';
      } else {
        sectionHeader.innerText = 'Search & Filter Results';
      }
    } else {
      sectionHeader.innerText = 'Upcoming College Events';
    }
  }

  if (listToRender.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 3rem; text-align: center; background-color: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color)">
        <p style="color: var(--text-secondary)">${isFiltered ? 'No events match the selected criteria.' : 'No upcoming events scheduled at this moment.'}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = '';
  listToRender.forEach(event => {
    const dept = departments.find(d => d.id === event.department_id);
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.cursor = 'pointer';
    card.onclick = () => navigateTo('event-details', { id: event.id });
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${event.poster_image}" alt="${event.title}" class="card-img" loading="lazy">
        <span class="card-badge">${event.category}</span>
        <span class="card-dept">${dept ? dept.code : 'RIT'}</span>
      </div>
      <div class="card-body">
        <span class="card-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <h3 class="card-title">${event.title}</h3>
        <p class="card-desc">${event.description}</p>
        <div class="card-meta">
          <span class="card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${event.venue}
          </span>
          <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem;">
            View Details
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderLatestEventsGrid() {
  const grid = document.getElementById('latest-events-grid');
  if (!grid) return;

  const published = events.filter(e => e.status === 'Published');
  const latestList = [...published].sort((a, b) => b.id - a.id).slice(0, 6);

  if (latestList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; padding: 2rem; text-align: center; background-color: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color)">
        <p style="color: var(--text-secondary)">No events recently published.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = '';
  latestList.forEach(event => {
    const dept = departments.find(d => d.id === event.department_id);
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.cursor = 'pointer';
    card.onclick = () => navigateTo('event-details', { id: event.id });
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${event.poster_image}" alt="${event.title}" class="card-img" loading="lazy">
        <span class="card-badge" style="background: var(--accent-gold); color: white;">New</span>
        <span class="card-dept">${dept ? dept.code : 'RIT'}</span>
      </div>
      <div class="card-body">
        <span class="card-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <h3 class="card-title">${event.title}</h3>
        <p class="card-desc">${event.description}</p>
        <div class="card-meta">
          <span class="card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${event.venue}
          </span>
          <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem;">
            Explore
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderDepartmentsGrid() {
  const grid = document.getElementById('dept-grid');
  grid.innerHTML = '';
  departments.forEach(dept => {
    const count = events.filter(e => e.department_id === dept.id && e.status === 'Published').length;
    const card = document.createElement('div');
    card.className = 'dept-card';
    card.onclick = () => navigateTo('department', { id: dept.id });
    card.innerHTML = `
      <h3>${dept.code}</h3>
      <p>${dept.name}</p>
      <div class="dept-count-badge">
        ${count} Published Events
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 2px;"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderHeroSlider() {
  const slider = document.getElementById('hero-slider');
  const heroList = events.filter(e => e.poster_image && e.status === 'Published').slice(0, 4);

  if (heroList.length === 0) {
    slider.style.display = 'none';
    return;
  }
  slider.style.display = 'flex';

  const updateHeroDOM = () => {
    const item = heroList[appState.heroIndex];
    slider.innerHTML = `
      <div class="hero-bg" style="background-image: url('${item.poster_image}')"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-badge">Featured College Event</span>
        <h2>${item.title}</h2>
        <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${item.description}
        </p>
        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary" id="hero-btn-action">
            Learn & Register Now
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white; margin-left: 2px;"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 2rem;">
          ${heroList.map((_, idx) => `
            <span class="hero-dot ${idx === appState.heroIndex ? 'active' : ''}" data-idx="${idx}" style="display: block; width: ${idx === appState.heroIndex ? '24px' : '8px'}; height: 8px; border-radius: 4px; background-color: ${idx === appState.heroIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)'}; cursor: pointer; transition: all 0.3s ease;"></span>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('hero-btn-action').onclick = () => {
      navigateTo('event-details', { id: item.id });
    };

    slider.querySelectorAll('.hero-dot').forEach(dot => {
      dot.onclick = (e) => {
        appState.heroIndex = parseInt(e.target.getAttribute('data-idx'));
        updateHeroDOM();
      };
    });
  };

  appState.heroIndex = 0;
  updateHeroDOM();

  appState.heroInterval = setInterval(() => {
    appState.heroIndex = (appState.heroIndex + 1) % heroList.length;
    updateHeroDOM();
  }, 5000);
}

function filterEvents() {
  const searchVal = document.getElementById('search-input').value.toLowerCase();
  const deptVal = document.getElementById('filter-dept').value;
  const yearVal = document.getElementById('filter-year').value;
  const catVal = document.getElementById('filter-category').value;
  const statusVal = document.getElementById('filter-status').value;
  const monthVal = document.getElementById('filter-month').value;
  
  const dateEl = document.getElementById('filter-date');
  const dateVal = dateEl ? dateEl.value : '';

  const currentDate = '2026-08-20';

  const filtered = events.filter(e => {
    if (e.status !== 'Published') return false;

    const matchesSearch = searchVal === '' || 
      e.title.toLowerCase().includes(searchVal) || 
      e.description.toLowerCase().includes(searchVal) ||
      (e.faculty_coordinator && e.faculty_coordinator.toLowerCase().includes(searchVal)) ||
      (e.student_coordinator && e.student_coordinator.toLowerCase().includes(searchVal));
    
    const matchesDept = deptVal === '' || e.department_id === parseInt(deptVal);
    const matchesYear = yearVal === '' || e.academic_year === yearVal;
    const matchesCategory = catVal === '' || e.category === catVal;
    
    let matchesStatus = true;
    if (statusVal === 'Upcoming') {
      matchesStatus = e.event_date >= currentDate;
    } else if (statusVal === 'Completed') {
      matchesStatus = e.event_date < currentDate;
    }

    let matchesMonth = true;
    if (monthVal !== '') {
      const eventMonth = e.event_date.split('-')[1];
      matchesMonth = eventMonth === monthVal;
    }

    const matchesDate = dateVal === '' || e.event_date === dateVal;

    return matchesSearch && matchesDept && matchesYear && matchesCategory && matchesStatus && matchesMonth && matchesDate;
  });

  const hasActiveFilters = searchVal !== '' || deptVal !== '' || yearVal !== '' || catVal !== '' || statusVal !== '' || monthVal !== '' || dateVal !== '';
  renderUpcomingEventsGrid(filtered, hasActiveFilters);
}

function loadDepartmentView(deptId) {
  const dept = departments.find(d => d.id === parseInt(deptId));
  if (!dept) {
    alert('Department profile not found.');
    navigateTo('home');
    return;
  }

  appState.activeGalleryEventId = null;

  const deptEvents = events.filter(e => e.department_id === dept.id && e.status === 'Published');
  const bannerBox = document.getElementById('dept-banner-box');
  bannerBox.innerHTML = `
    <div class="dept-header-bg" style="background-image: url('${dept.banner_image}')"></div>
    <div class="dept-header-content">
      <span style="text-transform: uppercase; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; background-color: var(--accent-gold); padding: 0.25rem 0.75rem; border-radius: 50px;">
        RIT Branch Portal
      </span>
      <h2 style="margin-top: 0.75rem;">${dept.name} (${dept.code})</h2>
      <p>${dept.description}</p>
    </div>
  `;

  // Bind All 7 Tabs
  const tabs = ['upcoming', 'current', 'archives', 'achievements', 'gallery', 'faculty', 'students'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-dept-${tab}`);
    if (btn) {
      btn.onclick = () => {
        tabs.forEach(t => {
          const tabBtn = document.getElementById(`tab-dept-${t}`);
          const tabPane = document.getElementById(`dept-${t}-pane`);
          if (tabBtn) tabBtn.classList.remove('active');
          if (tabPane) tabPane.classList.add('hidden');
        });
        btn.classList.add('active');
        const targetPane = document.getElementById(`dept-${tab}-pane`);
        if (targetPane) targetPane.classList.remove('hidden');
      };
    }
  });

  document.getElementById('tab-dept-upcoming').click();

  const currentDate = '2026-08-20';

  // Helper to render event card
  const createEventCard = (event) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.onclick = () => navigateTo('event-details', { id: event.id });
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${event.poster_image}" alt="${event.title}" class="card-img" loading="lazy">
        <span class="card-badge">${event.category}</span>
      </div>
      <div class="card-body">
        <span class="card-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          ${new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <h3 class="card-title">${event.title}</h3>
        <p class="card-desc">${event.description}</p>
        <div class="card-meta">
          <span class="card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${event.venue}
          </span>
          <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem;">
            View Details
          </button>
        </div>
      </div>
    `;
    return card;
  };

  // 1. Upcoming Panel
  const upcomingGrid = document.getElementById('dept-upcoming-events-grid');
  const upcoming = deptEvents.filter(e => e.event_date >= currentDate);

  if (upcoming.length === 0) {
    upcomingGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background-color: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color)">
        <p style="color: var(--text-secondary)">No upcoming events scheduled currently for ${dept.code}.</p>
      </div>
    `;
  } else {
    upcomingGrid.innerHTML = '';
    upcoming.forEach(e => upcomingGrid.appendChild(createEventCard(e)));
  }

  // 2. Current Year Panel (2025-26) with Technical / Non-Technical Filters
  const currentGrid = document.getElementById('dept-current-events-grid');
  const currentYearEvents = deptEvents.filter(e => e.academic_year === '2025-2026');

  const renderCurrentYearGrid = (catFilter = 'All') => {
    let filtered = currentYearEvents;
    if (catFilter !== 'All') {
      filtered = currentYearEvents.filter(e => e.category === catFilter);
    }
    if (filtered.length === 0) {
      currentGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; background-color: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color)">
          <p style="color: var(--text-secondary)">No ${catFilter !== 'All' ? catFilter : ''} events found for Academic Year 2025-26.</p>
        </div>
      `;
      return;
    }
    currentGrid.innerHTML = '';
    filtered.forEach(e => currentGrid.appendChild(createEventCard(e)));
  };

  const btnCurrentAll = document.getElementById('btn-current-all');
  const btnCurrentTech = document.getElementById('btn-current-tech');
  const btnCurrentNontech = document.getElementById('btn-current-nontech');

  if (btnCurrentAll && btnCurrentTech && btnCurrentNontech) {
    btnCurrentAll.onclick = () => {
      btnCurrentAll.className = 'btn btn-primary';
      btnCurrentTech.className = 'btn btn-outline';
      btnCurrentNontech.className = 'btn btn-outline';
      renderCurrentYearGrid('All');
    };
    btnCurrentTech.onclick = () => {
      btnCurrentAll.className = 'btn btn-outline';
      btnCurrentTech.className = 'btn btn-primary';
      btnCurrentNontech.className = 'btn btn-outline';
      renderCurrentYearGrid('Technical');
    };
    btnCurrentNontech.onclick = () => {
      btnCurrentAll.className = 'btn btn-outline';
      btnCurrentTech.className = 'btn btn-outline';
      btnCurrentNontech.className = 'btn btn-primary';
      renderCurrentYearGrid('Non Technical');
    };
  }
  renderCurrentYearGrid('All');

  // 3. Previous Years Archives Panel
  const archivesWrapper = document.getElementById('dept-archives-wrapper');
  const archived = deptEvents.filter(e => e.academic_year !== '2025-2026' || e.event_date < currentDate);

  if (archived.length === 0) {
    archivesWrapper.innerHTML = `
      <div style="text-align: center; padding: 3rem; background-color: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color)">
        <p style="color: var(--text-secondary)">No previous academic year events archived for ${dept.code}.</p>
      </div>
    `;
  } else {
    const grouped = {};
    archived.forEach(e => {
      const year = e.academic_year;
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(e);
    });

    const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
    archivesWrapper.innerHTML = '';
    
    years.forEach(year => {
      const section = document.createElement('div');
      section.style.marginBottom = '3rem';
      const cleanYearId = year.replace('-', '_');
      section.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-gold);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <h3 style="font-size: 1.25rem; font-weight: 700;">Academic Year ${year}</h3>
        </div>
        <div class="events-grid" id="dept-grid-${cleanYearId}"></div>
      `;
      archivesWrapper.appendChild(section);

      const subgrid = document.getElementById(`dept-grid-${cleanYearId}`);
      grouped[year].forEach(event => subgrid.appendChild(createEventCard(event)));
    });
  }

  // 4. Achievements Panel
  const achieveGrid = document.getElementById('dept-achievements-grid');
  const deptAchievements = achievements.filter(a => a.dept_id === dept.id);

  if (deptAchievements.length === 0) {
    achieveGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background-color: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color)">
        <p style="color: var(--text-secondary)">Official achievement milestones will be announced soon.</p>
      </div>
    `;
  } else {
    achieveGrid.innerHTML = '';
    deptAchievements.forEach(item => {
      const card = document.createElement('div');
      card.className = 'achievement-card';
      card.innerHTML = `
        <span class="achievement-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          ${item.badge}
        </span>
        <h3 class="achievement-title">${item.title}</h3>
        <p class="achievement-desc">${item.desc}</p>
        <div class="achievement-meta">
          <span>Year: ${item.year}</span>
          <span>${item.date}</span>
        </div>
      `;
      achieveGrid.appendChild(card);
    });
  }

  // 5. Gallery Panel
  renderDepartmentGallery(deptEvents);

  // 6. Faculty Coordinators Panel
  const facultyGrid = document.getElementById('dept-faculty-grid');
  const deptCoordinatorsData = DEFAULT_COORDINATORS[dept.id] || {
    faculty: [
      { name: 'Dr. Head of Department', role: `${dept.code} Department Head`, email: `hod.${dept.code.toLowerCase()}@rit.edu`, phone: '02342-220329', room: `${dept.code} Faculty Wing` }
    ],
    students: [
      { name: 'Lead Student Coordinator', role: 'Student Association Head', email: `student.${dept.code.toLowerCase()}@rit.edu`, phone: '9876543210', year: 'Final Year B.Tech' }
    ]
  };

  facultyGrid.innerHTML = '';
  deptCoordinatorsData.faculty.forEach(person => {
    const card = document.createElement('div');
    card.className = 'coordinator-card';
    card.innerHTML = `
      <div class="coordinator-avatar">${person.name.charAt(0)}</div>
      <h4 class="coordinator-name">${person.name}</h4>
      <div class="coordinator-role">${person.role}</div>
      <div class="coordinator-contact">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <a href="mailto:${person.email}" style="color: var(--accent-color);">${person.email}</a>
      </div>
      <div class="coordinator-contact">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${person.phone}
      </div>
      ${person.room ? `<p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Office: ${person.room}</p>` : ''}
    `;
    facultyGrid.appendChild(card);
  });

  // 7. Student Coordinators Panel
  const studentsGrid = document.getElementById('dept-students-grid');
  studentsGrid.innerHTML = '';
  deptCoordinatorsData.students.forEach(student => {
    const card = document.createElement('div');
    card.className = 'coordinator-card';
    card.innerHTML = `
      <div class="coordinator-avatar" style="background: linear-gradient(135deg, var(--accent-gold), #fb923c);">${student.name.charAt(0)}</div>
      <h4 class="coordinator-name">${student.name}</h4>
      <div class="coordinator-role" style="color: var(--accent-color);">${student.role}</div>
      ${student.year ? `<p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">${student.year}</p>` : ''}
      <div class="coordinator-contact">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <a href="mailto:${student.email}" style="color: var(--accent-color);">${student.email}</a>
      </div>
      <div class="coordinator-contact">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${student.phone}
      </div>
    `;
    studentsGrid.appendChild(card);
  });
}

function renderDepartmentGallery(deptEvents) {
  const galleryGrid = document.getElementById('dept-gallery-grid');
  galleryGrid.innerHTML = '';

  const eventsWithImages = deptEvents.filter(e => e.gallery_images && e.gallery_images.length > 0);

  if (eventsWithImages.length === 0) {
    galleryGrid.innerHTML = `
      <div style="text-align: center; padding: 3rem; background-color: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-color)">
        <p style="color: var(--text-secondary)">No images in department gallery.</p>
      </div>
    `;
    return;
  }

  // If a specific event album folder is open:
  if (appState.activeGalleryEventId) {
    const activeEvent = eventsWithImages.find(e => e.id === appState.activeGalleryEventId);
    if (activeEvent) {
      // Render back button and event photos grid
      const backBtn = document.createElement('button');
      backBtn.className = 'btn btn-outline';
      backBtn.style.marginBottom = '1.5rem';
      backBtn.style.display = 'flex';
      backBtn.style.alignItems = 'center';
      backBtn.style.gap = '0.5rem';
      backBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Albums
      `;
      backBtn.onclick = () => {
        appState.activeGalleryEventId = null;
        renderDepartmentGallery(deptEvents);
      };

      const header = document.createElement('h3');
      header.style.fontSize = '1.25rem';
      header.style.fontWeight = '700';
      header.style.color = 'var(--text-primary)';
      header.style.marginBottom = '1.25rem';
      header.style.borderLeft = '4px solid var(--accent-color)';
      header.style.paddingLeft = '0.75rem';
      header.style.textTransform = 'uppercase';
      header.style.letterSpacing = '0.05em';
      header.innerText = activeEvent.title;

      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
      grid.style.gap = '1.25rem';

      // Collect all images for this event
      const imgs = [];
      if (activeEvent.gallery_images && Array.isArray(activeEvent.gallery_images)) {
        activeEvent.gallery_images.forEach((imgSrc, idx) => {
          imgs.push({ src: imgSrc, title: `${activeEvent.title} (Photo ${idx + 1})` });
        });
      }

      imgs.forEach(imgData => {
        const box = document.createElement('div');
        box.style.position = 'relative';
        box.style.borderRadius = '12px';
        box.style.overflow = 'hidden';
        box.style.height = '160px';
        box.style.boxShadow = 'var(--card-shadow)';
        box.style.border = '1px solid var(--border-color)';
        box.style.cursor = 'zoom-in';
        box.className = 'select-none';
        
        box.onclick = () => launchLightbox(imgData.src, imgData.title);

        box.innerHTML = `
          <img src="${imgData.src}" alt="${imgData.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 0.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: white; font-size: 0.75rem; font-weight: 500;">
            ${imgData.title}
          </div>
        `;
        grid.appendChild(box);
      });

      galleryGrid.appendChild(backBtn);
      galleryGrid.appendChild(header);
      galleryGrid.appendChild(grid);
      return;
    }
  }

  // Otherwise, render folders/albums list:
  const folderGrid = document.createElement('div');
  folderGrid.style.display = 'grid';
  folderGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(260px, 1fr))';
  folderGrid.style.gap = '1.5rem';

  eventsWithImages.forEach(e => {
    // Collect all images to count them
    const imgsCount = e.gallery_images ? e.gallery_images.length : 0;
    const coverImage = e.poster_image || (e.gallery_images && e.gallery_images[0]) || '';

    const folderCard = document.createElement('div');
    folderCard.className = 'gallery-folder-card glass-panel select-none';
    folderCard.style.cursor = 'pointer';
    folderCard.style.borderRadius = '16px';
    folderCard.style.overflow = 'hidden';
    folderCard.style.border = '1px solid var(--border-color)';
    folderCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    folderCard.style.backgroundColor = 'var(--bg-secondary)';
    
    // Add nice hover effects programmatically
    folderCard.onmouseenter = () => {
      folderCard.style.transform = 'translateY(-4px)';
      folderCard.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
    };
    folderCard.onmouseleave = () => {
      folderCard.style.transform = 'translateY(0)';
      folderCard.style.boxShadow = 'var(--card-shadow)';
    };

    folderCard.onclick = () => {
      appState.activeGalleryEventId = e.id;
      renderDepartmentGallery(deptEvents);
    };

    folderCard.innerHTML = `
      <div style="position: relative; height: 160px; overflow: hidden; background-color: #f1f5f9;">
        ${coverImage ? `<img src="${coverImage}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
        <div style="position: absolute; top: 12px; right: 12px; background-color: rgba(15, 23, 42, 0.85); color: white; padding: 0.25rem 0.6rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          ${imgsCount}
        </div>
      </div>
      <div style="padding: 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
        <div style="background-color: rgba(99, 102, 241, 0.1); color: var(--accent-color); padding: 0.5rem; border-radius: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>
          </svg>
        </div>
        <div style="overflow: hidden; flex-grow: 1;">
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${e.title}</h4>
          <span style="font-size: 0.75rem; color: var(--text-secondary); display: block; margin-top: 0.2rem;">Event Photo Album</span>
        </div>
      </div>
    `;
    folderGrid.appendChild(folderCard);
  });

  galleryGrid.appendChild(folderGrid);
}

function launchLightbox(imgSrc, title) {
  // Create dynamic lightbox overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = 3000;
  overlay.onclick = () => overlay.remove();
  
  overlay.innerHTML = `
    <div style="position: relative; max-width: 90%; max-height: 85vh; text-align: center;" onclick="event.stopPropagation()">
      <img src="${imgSrc}" alt="${title}" style="max-width: 100%; max-height: 75vh; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
      <h3 style="color: white; margin-top: 1rem; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${title}</h3>
      <button style="position: absolute; top: -2.5rem; right: 0; background: none; border: none; font-size: 1.5rem; color: white; cursor: pointer;" onclick="this.closest('.modal-overlay').remove()">&times;</button>
    </div>
  `;
  document.body.appendChild(overlay);
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item ? item.querySelector('.faq-answer') : null;
  const icon = btn.querySelector('.faq-icon');
  if (!answer) return;
  
  const isHidden = answer.style.display === 'none' || !answer.style.display;
  if (isHidden) {
    answer.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    answer.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

function renderVideoEmbed(url) {
  if (!url || typeof url !== 'string' || url.trim() === '') return '';
  const cleanUrl = url.trim();
  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    let videoId = '';
    if (cleanUrl.includes('youtu.be/')) {
      videoId = cleanUrl.split('youtu.be/')[1].split('?')[0];
    } else if (cleanUrl.includes('v=')) {
      videoId = cleanUrl.split('v=')[1].split('&')[0];
    }
    if (videoId) {
      return `<iframe src="https://www.youtube.com/embed/${videoId}" title="Event Video Showcase" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
  }
  return `<video src="${cleanUrl}" controls preload="metadata" style="width: 100%; height: 100%; object-fit: cover;"></video>`;
}

function loadEventDetailsView(eventId) {
  const event = events.find(e => e.id === parseInt(eventId));
  if (!event) {
    alert('Event not found.');
    navigateTo('home');
    return;
  }

  // Increment event view count
  event.views = (event.views || 0) + 1;
  syncLocalStorage('events');

  const dept = departments.find(d => d.id === event.department_id);
  const currentDate = '2026-08-20';
  const isUpcoming = event.event_date >= currentDate;

  document.getElementById('details-back-btn').onclick = () => {
    navigateTo('department', { id: event.department_id });
  };

  // 1. Parse Schedule Timeline
  let scheduleItems = [];
  if (Array.isArray(event.schedule) && event.schedule.length > 0) {
    scheduleItems = event.schedule;
  } else if (typeof event.schedule === 'string' && event.schedule.trim() !== '') {
    scheduleItems = event.schedule.split('|').map(s => {
      const parts = s.split(':');
      const time = parts.length > 1 ? parts.slice(0, 2).join(':').trim() : 'Scheduled';
      const title = parts.length > 2 ? parts.slice(2).join(':').trim() : (parts[1] ? parts[1].trim() : s.trim());
      return { time, title, desc: '' };
    });
  } else {
    scheduleItems = [
      { time: '09:30 AM', title: 'Reporting & Verification Desk', desc: 'Check-in with physical college ID cards and collect event registration kit.' },
      { time: '10:30 AM', title: 'Inauguration & Keynote Address', desc: 'Opening speech by Head of Department and Industry Chief Guest.' },
      { time: '11:30 AM', title: 'Round 1 / Hackathon Commencement', desc: 'Evaluation parameters explained; initial prototyping and live coding begins.' },
      { time: '01:30 PM', title: 'Networking Lunch & Industry Interaction', desc: 'Complimentary lunch for registered teams and interaction with judges.' },
      { time: '02:30 PM', title: 'Round 2 / Final Jury Presentation', desc: 'Teams demonstrate prototypes, code solutions, and mechanical models.' },
      { time: '04:30 PM', title: 'Valedictory & Prize Distribution', desc: 'Trophy, certificate distribution, and announcement of podium winners.' }
    ];
  }

  // 2. Parse Sponsors
  let sponsorsList = [];
  if (Array.isArray(event.sponsors) && event.sponsors.length > 0) {
    sponsorsList = event.sponsors;
  } else if (typeof event.sponsors === 'string' && event.sponsors.trim() !== '') {
    sponsorsList = event.sponsors.split('|').map(item => {
      const parts = item.split('-');
      return {
        name: parts[0] ? parts[0].trim() : item.trim(),
        tier: parts[1] ? parts[1].trim() : 'Event Partner'
      };
    });
  } else {
    sponsorsList = [
      { name: 'Tata Consultancy Services', tier: 'Title Sponsor' },
      { name: 'Persistent Systems', tier: 'Technology Partner' },
      { name: 'RIT Alumni Association', tier: 'Community Partner' }
    ];
  }

  // 3. Parse FAQs
  let faqsList = [];
  if (Array.isArray(event.faqs) && event.faqs.length > 0) {
    faqsList = event.faqs;
  } else if (typeof event.faqs === 'string' && event.faqs.trim() !== '') {
    const rawFaqs = event.faqs.split('|');
    faqsList = rawFaqs.map(f => {
      const parts = f.split('A:');
      const q = parts[0] ? parts[0].replace(/Q:\s*/i, '').trim() : f.trim();
      const a = parts[1] ? parts[1].trim() : 'Please contact the student coordinators for clarification.';
      return { q, a };
    });
  } else {
    faqsList = [
      { q: 'Who is eligible to participate in this event?', a: 'Any student currently enrolled in an AICTE/DTE recognized undergraduate, diploma, or postgraduate program is welcome to register. Valid college ID card is required.' },
      { q: 'Is on-spot registration accepted on the event morning?', a: 'Pre-registration via this portal is strongly recommended due to slot limits. On-spot registrations depend on desk availability.' },
      { q: 'Will every participant receive a verified certificate?', a: 'Yes! All verified participants receive an official verifiable digital certificate issued by RIT, accessible on this portal.' },
      { q: 'Can inter-college teams participate together?', a: 'Yes, team members can be from different departments or institutes, provided each member has their college ID.' }
    ];
  }

  // 4. Parse Winners (for completed events or if present)
  let winnersList = [];
  if (Array.isArray(event.winners) && event.winners.length > 0) {
    winnersList = event.winners;
  } else if (typeof event.winners === 'string' && event.winners.trim() !== '') {
    winnersList = event.winners.split('|').map((w, idx) => {
      const parts = w.split(':');
      const rank = parts.length > 1 ? parts[0].trim() : `${idx + 1}st Place`;
      const details = parts.length > 1 ? parts[1].trim() : w.trim();
      const collegeMatch = details.match(/\((.*?)\)/);
      const team = collegeMatch ? details.replace(collegeMatch[0], '').trim() : details;
      const college = collegeMatch ? collegeMatch[1] : 'Participating College';
      return { rank, team, college };
    });
  } else if (!isUpcoming) {
    winnersList = [
      { rank: '1st Place (Winner)', team: 'Team ByteCraft (RIT)', college: "K. E. Society's Rajarambapu Institute of Technology" },
      { rank: '2nd Place (Runner Up)', team: 'Team Nexus', college: 'Walchand College of Engineering, Sangli' },
      { rank: '3rd Place (2nd Runner Up)', team: 'Team Innovators', college: 'Government College of Engineering, Karad' }
    ];
  }

  // 5. Rules text
  const rulesList = event.rules && event.rules.trim() !== ''
    ? event.rules.split('\n').filter(r => r.trim().length > 0)
    : [
        'All participants must represent their institute with an official physical student identity card.',
        'Teams must present project codes or designs strictly within their designated timeline windows.',
        'Decision criteria are evaluated independently by external industry experts; decisions are final.',
        'Participation fee payments (if applicable) must be settled prior to registration desk closing.'
      ];

  const detailsBox = document.getElementById('event-details-content');
  detailsBox.innerHTML = `
    <div class="details-main-card">
      <img src="${event.poster_image}" alt="${event.title}" class="details-banner" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'">
      <div class="details-body">
        <div class="details-meta-top">
          <span class="badge-tag badge-tag-gold">${event.academic_year}</span>
          <span class="badge-tag badge-tag-blue">${event.category}</span>
          <span class="badge-tag">${dept ? dept.name : 'Unknown Department'}</span>
          <span class="status-badge ${isUpcoming ? 'published' : 'draft'}">${isUpcoming ? 'Registrations Open' : 'Completed'}</span>
        </div>
        <h2 class="details-title">${event.title}</h2>
        
        <!-- Description -->
        <div class="details-section">
          <h3>Description</h3>
          <p style="white-space: pre-wrap; color: var(--text-secondary); line-height: 1.7;">${event.description}</p>
        </div>

        <!-- Eligibility -->
        <div class="details-section">
          <h3>Eligibility & Entry Requirements</h3>
          <p style="color: var(--text-secondary); line-height: 1.6; background: var(--bg-tertiary); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 0.4rem; color: var(--accent-color);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            ${event.eligibility || 'Open to all undergraduate and diploma engineering, technology, science, and polytechnic students across Maharashtra & India with a valid college ID card.'}
          </p>
        </div>

        <!-- Rules & Guidelines -->
        <div class="details-section">
          <h3>Rules & Guidelines</h3>
          <ul style="color: var(--text-secondary); line-height: 1.8; padding-left: 1.25rem; margin: 0;">
            ${rulesList.map(r => `<li>${r.replace(/^\d+\.\s*/, '')}</li>`).join('')}
          </ul>
        </div>

        <!-- Timeline Schedule -->
        <div class="details-section">
          <h3>Event Schedule & Timeline</h3>
          <div class="timeline-list">
            ${scheduleItems.map((item, idx) => `
              <div class="timeline-step">
                <div class="timeline-badge">${idx + 1}</div>
                <div class="timeline-content">
                  <div class="timeline-time">${item.time}</div>
                  <div class="timeline-title">${item.title}</div>
                  ${item.desc ? `<p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.25rem 0 0;">${item.desc}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Video Player Highlights -->
        ${event.video_url ? `
          <div class="details-section">
            <h3>Event Highlights & Video Showcase</h3>
            <div class="video-wrapper">
              ${renderVideoEmbed(event.video_url)}
            </div>
          </div>
        ` : ''}

        <!-- Downloads Center -->
        <div class="details-section">
          <h3>Official Downloads Center</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.75rem;">
            <button class="btn btn-outline" id="btn-details-brochure-doc" style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Brochure (PDF)
            </button>
            <button class="btn btn-outline" id="btn-details-rulebook-doc" style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600; border-color: var(--accent-gold); color: var(--accent-gold);">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Download Rulebook (PDF)
            </button>
          </div>
        </div>

        <!-- Winners Podium -->
        ${winnersList.length > 0 ? `
          <div class="details-section">
            <h3>Winners & Hall of Fame</h3>
            <div class="winners-podium">
              ${winnersList.map((w, i) => {
                const tierClass = i === 0 ? 'first' : (i === 1 ? 'second' : 'third');
                return `
                  <div class="winner-card ${tierClass}">
                    <div class="winner-rank">${w.rank}</div>
                    <div class="winner-team">${w.team}</div>
                    <div class="winner-college">${w.college}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Sponsors Showcase -->
        <div class="details-section">
          <h3>Event Partners & Sponsors</h3>
          <div class="sponsors-grid">
            ${sponsorsList.map(s => `
              <div class="sponsor-card">
                <span class="sponsor-tier-badge">${s.tier}</span>
                <div class="sponsor-name">${s.name}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- FAQs Accordion -->
        <div class="details-section">
          <h3>Frequently Asked Questions</h3>
          <div class="faq-accordion" id="event-faq-accordion">
            ${faqsList.map((faq, idx) => `
              <div class="faq-item">
                <button type="button" class="faq-question" onclick="toggleFaq(this)">
                  <span>${faq.q}</span>
                  <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="faq-answer" style="display: none;">
                  ${faq.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>

    <div class="details-sidebar">
      <div class="info-sidebar-widget" style="text-align: center;">
        <h4 class="widget-title">Registration Desk</h4>
        <div style="margin: 1rem 0;">
          <span class="status-badge ${isUpcoming ? 'published' : 'draft'}" style="font-size: 0.9rem; padding: 0.4rem 1rem;">
            ${isUpcoming ? 'Registrations Open' : 'Event Completed / Archived'}
          </span>
        </div>

        ${isUpcoming ? `
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn btn-primary" id="btn-details-register-modal" style="width: 100%;">
              Register Now
            </button>
            <button class="btn btn-outline" id="btn-details-calendar" style="width: 100%;">
              Add to Calendar
            </button>
            <button class="btn btn-outline" id="btn-details-brochure" style="width: 100%; border-color: var(--accent-gold); color: var(--accent-gold);">
              Download Brochure
            </button>
          </div>
        ` : `
          <p style="font-size: 0.85rem; color: var(--text-muted)">This event is completed. Public registration desk closed.</p>
        `}
      </div>

      <div class="info-sidebar-widget">
        <h4 class="widget-title">Event Schedule</h4>
        <div class="widget-item">
          <div class="widget-item-value">
            <h5>Date</h5>
            <p>${new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
        <div class="widget-item">
          <div class="widget-item-value">
            <h5>Time & Venue</h5>
            <p>${event.event_time} Hrs | ${event.venue}</p>
          </div>
        </div>
        <div class="widget-item">
          <div class="widget-item-value">
            <h5>Registration Fees</h5>
            <p style="font-weight:600; color: var(--accent-gold);">${event.fees}</p>
          </div>
        </div>
        <div class="widget-item">
          <div class="widget-item-value">
            <h5>Deadline</h5>
            <p style="font-weight: 700; color: var(--error-color)">
              ${new Date(event.registration_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div class="info-sidebar-widget">
        <h4 class="widget-title">Contacts & Coordinators</h4>
        <div class="widget-item">
          <div class="widget-item-value">
            <h5>Faculty Coordinator</h5>
            <p>${event.faculty_coordinator || 'N/A'}</p>
          </div>
        </div>
        <div class="widget-item">
          <div class="widget-item-value">
            <h5>Student Coordinator</h5>
            <p>${event.student_coordinator || 'N/A'}</p>
          </div>
        </div>
        ${event.contact_1 ? `
          <div class="widget-item">
            <div class="widget-item-value">
              <h5>Primary Helpdesk</h5>
              <p><a href="tel:${event.contact_1}" style="color: var(--accent-color); font-weight: 600;">${event.contact_1}</a></p>
            </div>
          </div>
        ` : ''}
        ${event.contact_2 ? `
          <div class="widget-item">
            <div class="widget-item-value">
              <h5>Secondary Helpdesk</h5>
              <p><a href="tel:${event.contact_2}" style="color: var(--accent-color);">${event.contact_2}</a></p>
            </div>
          </div>
        ` : ''}
        ${event.contact_3 ? `
          <div class="widget-item">
            <div class="widget-item-value">
              <h5>Alternative Helpdesk</h5>
              <p><a href="tel:${event.contact_3}" style="color: var(--accent-color);">${event.contact_3}</a></p>
            </div>
          </div>
        ` : ''}

        ${event.payment_qr && event.fees !== 'Free' ? `
          <div class="qr-code-box">
            <img src="${event.payment_qr}" alt="Scan to Pay" class="qr-img">
            <span class="qr-label">Scan QR to settle Entry Fees</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Bind Downloads Center buttons
  const docBrochureBtn = document.getElementById('btn-details-brochure-doc');
  if (docBrochureBtn) {
    docBrochureBtn.onclick = () => downloadBrochurePDF(event);
  }
  const docRulebookBtn = document.getElementById('btn-details-rulebook-doc');
  if (docRulebookBtn) {
    docRulebookBtn.onclick = () => downloadRulebookPDF(event);
  }

  // Bind Actions if upcoming
  if (isUpcoming) {
    document.getElementById('btn-details-register-modal').onclick = () => {
      if (event.registration_link && event.registration_link.trim() !== '') {
        window.open(event.registration_link.trim(), '_blank');
      } else {
        openRegistrationModal(event);
      }
    };

    document.getElementById('btn-details-calendar').onclick = () => {
      downloadICS(event);
    };

    document.getElementById('btn-details-brochure').onclick = () => {
      downloadBrochurePDF(event);
    };
  }

  // Bind Navbar Social Sharing
  document.getElementById('details-share-btn').onclick = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} at K. E. Society's Rajarambapu Institute of Technology!`,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showToast("Event page URL copied! Share it with your peers."))
        .catch(() => showToast("Copy failed."));
    }
  };

  document.getElementById('details-print-btn').onclick = () => {
    window.print();
  };
}

function downloadRulebookPDF(event) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter'
  });

  // Border designs
  doc.setLineWidth(0.02);
  doc.rect(0.5, 0.5, 7.5, 10.0);
  doc.setDrawColor(30, 58, 138); // Navy blue
  doc.rect(0.55, 0.55, 7.4, 9.9);

  // Title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 138);
  doc.text("K. E. Society's Rajarambapu Institute of Technology (RIT)", 4.0, 1.2, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Official Event Rulebook & Evaluation Guidelines", 4.0, 1.5, { align: "center" });

  doc.setLineWidth(0.01);
  doc.setDrawColor(226, 232, 240);
  doc.line(0.8, 1.8, 7.2, 1.8);

  // Event title & Academic Year
  doc.setFontSize(16);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(event.title, 4.0, 2.3, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(180, 83, 9);
  doc.text(`${event.category} Competition | Academic Year ${event.academic_year}`, 4.0, 2.6, { align: "center" });

  // Eligibility
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("1. Eligibility & Verification", 0.9, 3.2);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  const eligText = event.eligibility || 'Open to all undergraduate and diploma engineering students with valid institute ID cards.';
  const splitElig = doc.splitTextToSize(eligText, 6.2);
  doc.text(splitElig, 0.9, 3.5);

  // Rules
  const rulesY = 3.5 + (splitElig.length * 0.2) + 0.3;
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("2. Official Competition Rules", 0.9, rulesY);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  const defaultRules = [
    "1. Teams must check in at the registration desk 30 minutes before the inauguration ceremony.",
    "2. All hardware, software, or design submissions must be original work created within designated timelines.",
    "3. Evaluation rubrics will assess Innovation (30%), Technical Execution (40%), and Presentation (30%).",
    "4. The decisions of the External Industry Evaluation Panel and the Head of Department are final.",
    "5. Misbehavior or breach of the college code of conduct results in immediate disqualification without fee refunds."
  ];
  doc.text(defaultRules, 0.9, rulesY + 0.3);

  // Coordination Box
  const startY = rulesY + 1.8;
  doc.setFillColor(248, 250, 252);
  doc.rect(0.9, startY, 6.2, 1.4, "F");
  doc.rect(0.9, startY, 6.2, 1.4);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text("Contact & Helpdesk Coordination", 1.1, startY + 0.3);

  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`Faculty Lead: ${event.faculty_coordinator || 'N/A'}`, 1.1, startY + 0.6);
  doc.text(`Student Lead: ${event.student_coordinator || 'N/A'}`, 1.1, startY + 0.9);
  doc.text(`Primary Inquiries: ${event.contact_1 || 'RIT Event Cell'} | Venue: ${event.venue}`, 1.1, startY + 1.2);

  // Footer note
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text("RIT Central Event Portal - Official Document Record", 4.0, 10.0, { align: "center" });

  doc.save(`${event.title.replace(/\s+/g, '_')}_Rulebook.pdf`);
  
  // Track downloads
  event.downloads = (event.downloads || 0) + 1;
  syncLocalStorage('events');
  showToast("Official Rulebook PDF compiled and downloaded!");
}

// Download event calendar invite (.ics)
function downloadICS(event) {
  const formattedDate = event.event_date.replace(/-/g, '');
  const titleClean = event.title.replace(/,/g, '\\,');
  const descClean = event.description.substring(0, 100).replace(/,/g, '\\,') + '...';

  const icsText = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${titleClean}`,
    `DESCRIPTION:${descClean}`,
    `LOCATION:${event.venue}`,
    `DTSTART:${formattedDate}T090000`,
    `DTEND:${formattedDate}T170000`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsText], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, '_')}_Schedule.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("ICS calendar invite downloaded!");
}

// Generate & download beautiful PDF brochure via jsPDF
function downloadBrochurePDF(event) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter'
  });

  // Border designs
  doc.setLineWidth(0.02);
  doc.rect(0.5, 0.5, 7.5, 10.0);
  doc.setDrawColor(180, 83, 9); // Gold
  doc.rect(0.55, 0.55, 7.4, 9.9);

  // Title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 138); // Navy blue
  doc.text("K. E. Society's Rajarambapu Institute of Technology", 4.0, 1.1, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Rajaramnagar - 415414, Tal. Walwa Dist. Sangli, Maharashtra, India", 4.0, 1.4, { align: "center" });

  doc.setLineWidth(0.01);
  doc.setDrawColor(226, 232, 240);
  doc.line(0.8, 1.8, 7.2, 1.8);

  // Event title & Category
  doc.setFontSize(18);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(event.title, 4.0, 2.3, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(180, 83, 9);
  doc.text(`${event.category} Event | Academic Year ${event.academic_year}`, 4.0, 2.6, { align: "center" });

  // Description
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Event Overview", 0.9, 3.2);
  
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  const splitDesc = doc.splitTextToSize(event.description, 6.2);
  doc.text(splitDesc, 0.9, 3.5);

  // Details box
  const startY = 3.5 + (splitDesc.length * 0.2) + 0.3;
  doc.setFillColor(248, 250, 252);
  doc.rect(0.9, startY, 6.2, 2.0, "F");
  doc.rect(0.9, startY, 6.2, 2.0);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 58, 138);
  doc.text("Schedule & Coordination Details", 1.1, startY + 0.3);

  doc.setFontSize(9.5);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`Event Date: ${new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 1.1, startY + 0.7);
  doc.text(`Time & Venue: ${event.event_time} Hrs | ${event.venue}`, 1.1, startY + 1.0);
  doc.text(`Registration Deadline: ${event.registration_deadline}`, 1.1, startY + 1.3);
  doc.text(`Participation Fees: ${event.fees}`, 1.1, startY + 1.6);

  // Coordinators
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Coordinating Team", 0.9, startY + 2.5);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Faculty Coordinator: ${event.faculty_coordinator || 'N/A'}`, 0.9, startY + 2.8);
  doc.text(`Student Coordinator: ${event.student_coordinator || 'N/A'}`, 0.9, startY + 3.1);
  const contactsArray = [event.contact_1, event.contact_2, event.contact_3].filter(Boolean);
  doc.text(`Helpdesk Numbers: ${contactsArray.join(', ') || 'N/A'}`, 0.9, startY + 3.4);

  // Footer note
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text("RIT Central Event Portal - Compiled Brochure PDF", 4.0, 10.0, { align: "center" });

  doc.save(`${event.title.replace(/\s+/g, '_')}_Brochure.pdf`);
  
  // Track downloads
  event.downloads = (event.downloads || 0) + 1;
  syncLocalStorage('events');
  showToast("Brochure PDF compiled and downloaded!");
}

// --- 5. GLOBAL INTERACTIVE CALENDAR MODULE ---

function renderGlobalCalendar() {
  const container = document.getElementById('calendar-days-container');
  const title = document.getElementById('cal-month-title');
  if (!container || !title) return;

  const year = appState.currentCalendarDate.getFullYear();
  const month = appState.currentCalendarDate.getMonth(); // 0-indexed

  // Month title header
  title.innerText = appState.currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get date specs
  const firstDayIndex = new Date(year, month, 1).getDay(); // day of week Sun-Sat
  const totalDays = new Date(year, month + 1, 0).getDate(); // days in current month
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  container.innerHTML = '';
  
  // Render prev month padding days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell inactive';
    cell.innerHTML = `<span class="cal-day-num">${day}</span>`;
    container.appendChild(cell);
  }

  // Render current month days
  const currentDateStr = '2026-08-20';
  const todayDateObj = new Date(currentDateStr);

  for (let day = 1; day <= totalDays; day++) {
    const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell';
    
    // Check if cell matches "today" context
    if (year === todayDateObj.getFullYear() && month === todayDateObj.getMonth() && day === todayDateObj.getDate()) {
      cell.classList.add('today');
    }

    cell.innerHTML = `
      <span class="cal-day-num">${day}</span>
      <div class="cal-events-list" id="cal-events-${cellDateStr}"></div>
    `;
    container.appendChild(cell);

    // Look up and render published events on this specific date
    const dayEvents = events.filter(e => e.event_date === cellDateStr && e.status === 'Published');
    const eventsList = cell.querySelector('.cal-events-list');
    
    dayEvents.forEach(evt => {
      const badge = document.createElement('div');
      badge.className = `cal-event-badge ${evt.category === 'Technical' ? 'cal-badge-tech' : 'cal-badge-nontech'}`;
      badge.innerText = evt.title;
      badge.title = `${evt.title} (${evt.category})`;
      badge.onclick = (e) => {
        e.stopPropagation();
        navigateTo('event-details', { id: evt.id });
      };
      eventsList.appendChild(badge);
    });
  }

  // Render next month padding days to fill 42 cells grid
  const cellsRendered = firstDayIndex + totalDays;
  const remainingCells = 42 - cellsRendered;
  for (let day = 1; day <= remainingCells; day++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell inactive';
    cell.innerHTML = `<span class="cal-day-num">${day}</span>`;
    container.appendChild(cell);
  }
}

// Bind Calendar Nav clicks
document.getElementById('cal-prev-btn').onclick = () => {
  appState.currentCalendarDate.setMonth(appState.currentCalendarDate.getMonth() - 1);
  renderGlobalCalendar();
};

document.getElementById('cal-next-btn').onclick = () => {
  appState.currentCalendarDate.setMonth(appState.currentCalendarDate.getMonth() + 1);
  renderGlobalCalendar();
};

// --- 6. PARTICIPANT REGISTRATION & CERTIFICATES SYSTEM ---

let activeRegisteringEvent = null;

function openRegistrationModal(event) {
  activeRegisteringEvent = event;
  const modal = document.getElementById('register-modal');
  const modalFees = document.getElementById('reg-modal-fees-notice');
  const paymentArea = document.getElementById('reg-form-payment-area');
  const txidInput = document.getElementById('reg-form-txid');
  const qrImg = document.getElementById('reg-form-payment-qr');

  // Load departments into dropdown selection
  const deptSelect = document.getElementById('reg-form-dept');
  deptSelect.innerHTML = '';
  departments.forEach(d => {
    const option = document.createElement('option');
    option.value = d.id;
    option.innerText = d.name;
    deptSelect.appendChild(option);
  });

  modalFees.innerText = `Registration Entry Fees: ${event.fees}`;

  if (event.fees && event.fees.toLowerCase() !== 'free') {
    paymentArea.classList.remove('hidden');
    txidInput.required = true;
    qrImg.src = event.payment_qr || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RIT-FEE-PAY-${event.id}`;
  } else {
    paymentArea.classList.add('hidden');
    txidInput.required = false;
    txidInput.value = '';
  }

  // Clear modal inputs
  document.getElementById('reg-form-name').value = '';
  document.getElementById('reg-form-email').value = '';

  modal.classList.remove('hidden');
}

// Handle Registration Submit Form
document.getElementById('public-reg-form').onsubmit = async (e) => {
  e.preventDefault();
  if (!activeRegisteringEvent) return;

  const nameVal = document.getElementById('reg-form-name').value.trim();
  const emailVal = document.getElementById('reg-form-email').value.trim();
  const studentDeptId = parseInt(document.getElementById('reg-form-dept').value);
  const txId = document.getElementById('reg-form-txid').value.trim();

  let newReg;
  if (appState.isApiConnected) {
    try {
      const response = await apiService.request('/registrations', {
        method: 'POST',
        body: JSON.stringify({
          event_id: activeRegisteringEvent.id,
          name: nameVal,
          email: emailVal,
          department_id: studentDeptId,
          tx_id: txId,
          paid: activeRegisteringEvent.fees.toLowerCase() === 'free' || txId !== ''
        })
      });
      newReg = {
        ...response.registration,
        ticket_id: response.registration.ticketId,
        checked_in: false
      };
    } catch (error) {
      showToast(`Registration was not saved: ${error.message}`);
      return;
    }
  } else {
    newReg = {
      id: registrations.length + 1,
      event_id: activeRegisteringEvent.id,
      name: nameVal,
      email: emailVal,
      department_id: studentDeptId,
      ticket_id: `RIT-REG-${Math.floor(100000 + Math.random() * 900000)}`,
      paid: activeRegisteringEvent.fees.toLowerCase() === 'free' || txId !== '',
      checked_in: false
    };
  }

  registrations.push(newReg);
  syncLocalStorage('registrations');

  // Trigger system audit logging
  addAuditLog(`Student Registered for ${activeRegisteringEvent.title}`, 'N/A', `Ticket ID: ${ticketId}`);

  // Display receipt modal to user
  document.getElementById('register-modal').classList.add('hidden');
  launchTicketReceipt(newReg, activeRegisteringEvent);
};

function launchTicketReceipt(reg, event) {
  const modal = document.getElementById('ticket-modal');
  const content = document.getElementById('ticket-content');
  const dept = departments.find(d => d.id === event.department_id);

  content.innerHTML = `
    <div class="ticket-brand">
      <div>
        <h4 style="font-weight:800; color:#1e3a8a; margin:0;">RIT CENTRAL PORTAL</h4>
        <span style="font-size:0.7rem; color:#b45309; text-transform:uppercase; font-weight:600;">College Event Admission Pass</span>
      </div>
      <div style="font-weight:800; font-size:1.15rem; color:#1e3a8a;">R</div>
    </div>
    
    <div style="margin: 1rem 0; text-align:center;">
      <h3 style="font-weight:700; margin:0 0 0.5rem; color:#0f172a; font-size:1.2rem;">${event.title}</h3>
      <span class="status-badge published" style="font-size:0.75rem;">Admit One</span>
    </div>

    <div class="ticket-details-grid">
      <div>
        <span class="ticket-label">Participant</span>
        <div class="ticket-value" style="font-weight:600;">${reg.name}</div>
      </div>
      <div>
        <span class="ticket-label">Ticket ID</span>
        <div class="ticket-value" style="font-family:monospace; font-weight:700;">${reg.ticket_id}</div>
      </div>
      <div>
        <span class="ticket-label">Host Dept</span>
        <div class="ticket-value">${dept ? dept.code : 'RIT'}</div>
      </div>
      <div>
        <span class="ticket-label">Venue</span>
        <div class="ticket-value">${event.venue}</div>
      </div>
      <div>
        <span class="ticket-label">Date & Time</span>
        <div class="ticket-value">${event.event_date} | ${event.event_time}</div>
      </div>
    </div>

    <div class="ticket-qr-area">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${reg.ticket_id}" alt="Ticket Code" style="width:100px; height:100px; margin-bottom:0.25rem;">
      <span style="font-size:0.65rem; color:#64748b; font-weight:500;">Present QR code at venue desk for digital check-in</span>
    </div>
  `;

  // Bind ticket print trigger
  document.getElementById('btn-print-ticket').onclick = () => {
    window.print();
  };

  modal.classList.remove('hidden');
}

// Certificate Search Flow
let activeCertificateRecord = null;
document.getElementById('certificate-form').onsubmit = async (e) => {
  e.preventDefault();
  const searchVal = document.getElementById('cert-ticket-id').value.trim().toUpperCase();
  const errorAlert = document.getElementById('cert-error');
  const resultBox = document.getElementById('cert-result-box');

  errorAlert.classList.add('hidden');
  resultBox.classList.add('hidden');

  let foundReg;
  let event;
  if (appState.isApiConnected) {
    try {
      const verified = await apiService.request(`/registrations/verify/${encodeURIComponent(searchVal)}`);
      foundReg = {
        ticket_id: verified.ticketId,
        name: verified.studentName,
        email: verified.studentEmail,
        checked_in: verified.checkedIn
      };
      event = {
        title: verified.eventTitle,
        category: verified.eventCategory,
        academic_year: verified.academicYear,
        event_date: verified.eventDate,
        department_id: departments.find(department => department.code === verified.departmentCode)?.id,
        department_name: verified.departmentName
      };
    } catch (error) {
      errorAlert.innerText = error.message;
      errorAlert.classList.remove('hidden');
      return;
    }
  } else {
    foundReg = registrations.find(r => r.ticket_id.toUpperCase() === searchVal || r.email.toUpperCase() === searchVal);
    if (foundReg) event = events.find(evt => evt.id === foundReg.event_id);
  }

  if (foundReg) {
    if (!event) {
      errorAlert.innerText = "Target event record deleted.";
      errorAlert.classList.remove('hidden');
      return;
    }
    
    // Check if event is completed (certificates only for archives)
    const currentDate = '2026-08-20';
    if (event.event_date >= currentDate) {
      errorAlert.innerText = `The event '${event.title}' is not yet completed. Certificates will release after completion.`;
      errorAlert.classList.remove('hidden');
      return;
    }

    activeCertificateRecord = { reg: foundReg, event: event };
    document.getElementById('cert-event-title').innerText = event.title;
    document.getElementById('cert-recipient-name').innerText = foundReg.name;
    resultBox.classList.remove('hidden');
    
    // Build certificate html preview
    const previewWrapper = document.getElementById('cert-canvas-wrapper');
    previewWrapper.innerHTML = `
      <div style="border: 4px double #b45309; padding: 2rem; text-align:center; background-color:#fffdfa;">
        <h2 style="font-family:serif; color:#1e3a8a; font-size:1.75rem; margin:0 0 0.5rem;">CERTIFICATE OF PARTICIPATION</h2>
        <p style="font-size:0.85rem; color:#64748b; margin-bottom:1.5rem;">K. E. SOCIETY'S RAJARAMBAPU INSTITUTE OF TECHNOLOGY, RAJARAMNAGAR</p>
        <span style="font-size:0.9rem; font-style:italic;">This is proudly presented to</span>
        <h3 style="font-size:1.5rem; color:#b45309; margin:0.75rem 0; font-family:serif;">${foundReg.name}</h3>
        <p style="font-size:0.9rem; line-height:1.6; max-width:400px; margin:0 auto;">
          for active participation and successful completion of the college event 
          <strong>"${event.title}"</strong> organized by the Department of ${departments.find(d => d.id === event.department_id).name} during Academic Year ${event.academic_year}.
        </p>
        <div style="margin-top:2rem; display:flex; justify-content:space-between; font-size:0.8rem; border-top:1px solid #e2e8f0; padding-top:0.75rem;">
          <div>Date: ${event.event_date}</div>
          <div>Director, RIT</div>
        </div>
      </div>
    `;
  } else {
    errorAlert.innerText = "No registration records found matching that ID or Email.";
    errorAlert.classList.remove('hidden');
  }
};

document.getElementById('btn-cert-preview').onclick = () => {
  const previewWrapper = document.getElementById('cert-canvas-wrapper');
  if (previewWrapper.style.display === 'none') {
    previewWrapper.style.display = 'block';
  } else {
    previewWrapper.style.display = 'none';
  }
};

document.getElementById('btn-cert-download').onclick = () => {
  if (!activeCertificateRecord) return;
  const { reg, event } = activeCertificateRecord;
  const { jsPDF } = window.jspdf;
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: 'letter'
  });

  // Certificate Layout designs
  doc.setLineWidth(0.04);
  doc.setDrawColor(30, 58, 138); // Navy
  doc.rect(0.4, 0.4, 10.2, 7.7);
  doc.setLineWidth(0.02);
  doc.setDrawColor(180, 83, 9); // Gold
  doc.rect(0.45, 0.45, 10.1, 7.6);

  doc.setFont("serif", "bold");
  doc.setFontSize(28);
  doc.setTextColor(30, 58, 138);
  doc.text("CERTIFICATE OF PARTICIPATION", 5.5, 1.8, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("K. E. SOCIETY'S RAJARAMBAPU INSTITUTE OF TECHNOLOGY", 5.5, 2.2, { align: "center" });
  doc.text("Rajaramnagar - 415414, Tal. Walwa Dist. Sangli, Maharashtra | Autonomous Institute", 5.5, 2.4, { align: "center" });

  doc.setFont("serif", "italic");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("This certificate is proudly awarded to", 5.5, 3.2, { align: "center" });

  doc.setFont("serif", "bold");
  doc.setFontSize(24);
  doc.setTextColor(180, 83, 9);
  doc.text(reg.name, 5.5, 3.8, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  
  const certBody = `for active participation in the academic event "${event.title}" organized and conducted by the Department of ${departments.find(d => d.id === event.department_id).name} during the Academic Year ${event.academic_year}.`;
  const splitBody = doc.splitTextToSize(certBody, 8.0);
  doc.text(splitBody, 5.5, 4.4, { align: "center" });

  // Verification Details footer
  doc.setLineWidth(0.01);
  doc.setDrawColor(226, 232, 240);
  doc.line(1.5, 6.0, 9.5, 6.0);

  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text("Dr. P. V. Kulkarni", 2.5, 6.4, { align: "center" });
  doc.setFont("Helvetica", "normal");
  doc.text("Director, RIT", 2.5, 6.6, { align: "center" });

  doc.setFont("Helvetica", "bold");
  doc.text(`${event.event_date}`, 8.5, 6.4, { align: "center" });
  doc.setFont("Helvetica", "normal");
  doc.text("Issue Date", 8.5, 6.6, { align: "center" });

  // Verification QR watermark
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Verify online with Ticket ID: ${reg.ticket_id}`, 5.5, 7.3, { align: "center" });

  doc.save(`${reg.name.replace(/\s+/g, '_')}_Participation_Certificate.pdf`);
  
  addAuditLog(`Student Downloaded Certificate`, 'N/A', `Ticket ID: ${reg.ticket_id}`);
  showToast("Certificate PDF compiled and downloaded!");
};

// --- 7. ADMIN DASHBOARDS & LOGIC SYSTEMS ---

function loadDashboardView() {
  if (!appState.user) {
    navigateTo('login');
    return;
  }

  // Dashboard Header Profile
  document.getElementById('dash-avatar').innerText = appState.user.fullName.charAt(0);
  document.getElementById('dash-name').innerText = appState.user.fullName;
  document.getElementById('dash-dept').innerText = appState.user.role === 'super_admin' ? 'Super Admin' : appState.user.departmentCode;

  // Sync Form event department selections based on login roles
  const select = document.getElementById('form-dept');
  select.innerHTML = '';
  departments.forEach(d => {
    const option = document.createElement('option');
    option.value = d.id;
    option.innerText = d.name;
    select.appendChild(option);
  });

  if (appState.user.role !== 'super_admin') {
    select.value = appState.user.departmentId;
    select.disabled = true;
    document.getElementById('dash-context-subtitle').innerText = `${appState.user.departmentName} Coordinator Desk`;
    
    // Hide Super admin sidebar menus
    document.getElementById('menu-depts').classList.add('hidden');
    document.getElementById('menu-admins').classList.add('hidden');
    document.getElementById('menu-logs').classList.add('hidden');
  } else {
    select.disabled = false;
    document.getElementById('dash-context-subtitle').innerText = 'Super Admin: All college departments console';
    
    // Show Super admin sidebar menus
    document.getElementById('menu-depts').classList.remove('hidden');
    document.getElementById('menu-admins').classList.remove('hidden');
    document.getElementById('menu-logs').classList.remove('hidden');
  }

  // Default display pane
  document.getElementById('menu-events').click();
}

// Sidebar Panes routing
const sidebarPanes = ['events', 'registrations', 'depts', 'admins', 'logs', 'analytics'];
sidebarPanes.forEach(pane => {
  const item = document.getElementById(`menu-${pane}`);
  if (item) {
    item.onclick = () => {
      sidebarPanes.forEach(p => {
        const menuItem = document.getElementById(`menu-${p}`);
        if (menuItem) menuItem.classList.remove('active');
        const paneDOM = document.getElementById(`pane-${p}`);
        if (paneDOM) paneDOM.classList.add('hidden');
      });

      item.classList.add('active');
      const targetPane = document.getElementById(`pane-${pane}`);
      if (targetPane) targetPane.classList.remove('hidden');

      // Refresh corresponding pane tables or graphs
      switch (pane) {
        case 'events':
          loadDashboardTable();
          break;
        case 'registrations':
          loadRegistrationsPane();
          break;
        case 'depts':
          loadDepartmentsPane();
          break;
        case 'admins':
          loadAdminsPane();
          break;
        case 'logs':
          loadLogsPane();
          break;
        case 'analytics':
          loadAnalyticsPane();
          break;
      }
    };
  }
});

// A. Manage Events Dashboard
function loadDashboardTable() {
  const tbody = document.getElementById('dash-events-table-body');
  const thDept = document.getElementById('th-dept');

  const filteredEvents = appState.user.role === 'super_admin'
    ? events
    : events.filter(e => e.department_id === appState.user.departmentId);

  if (appState.user.role === 'super_admin') {
    thDept.classList.remove('hidden');
  } else {
    thDept.classList.add('hidden');
  }

  if (filteredEvents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${appState.user.role === 'super_admin' ? 7 : 6}" style="text-align: center; padding: 2rem; color: var(--text-muted)">No events found. Click 'Add Event' to publish one.</td></tr>`;
    return;
  }

  tbody.innerHTML = '';
  filteredEvents.forEach(e => {
    const tr = document.createElement('tr');
    const dept = departments.find(d => d.id === e.department_id);
    
    // Status Badge mappings
    let statusClass = 'draft';
    if (e.status === 'Published') statusClass = 'published';
    else if (e.status === 'Pending Approval') statusClass = 'warning';
    
    let row = `<td style="font-weight: 600">${e.title}</td>`;

    if (appState.user.role === 'super_admin') {
      row += `<td><span class="badge-tag">${dept ? dept.code : 'RIT'}</span></td>`;
    }

    row += `
      <td>${e.category}</td>
      <td>${new Date(e.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
      <td>${e.venue}</td>
      <td>
        <span class="status-badge ${statusClass}">
          ${e.status}
        </span>
      </td>
      <td>
        <div class="actions-cell" style="justify-content: center">
          ${appState.user.role === 'super_admin' && e.status === 'Pending Approval' ? `
            <button class="icon-btn btn-row-approve" title="Approve & Publish Event" style="color: var(--success-color);">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
            <button class="icon-btn btn-row-reject" title="Reject Submission with Feedback" style="color: var(--error-color);">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          ` : ''}
          <button class="icon-btn icon-btn-edit btn-row-edit" title="Edit Event">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button class="icon-btn icon-btn-delete btn-row-delete" title="Delete Event">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </td>
    `;

    tr.innerHTML = row;
    tbody.appendChild(tr);

    // Bind edit/delete triggers
    if (tr.querySelector('.btn-row-approve')) {
      tr.querySelector('.btn-row-approve').onclick = () => approveEvent(e.id);
    }
    if (tr.querySelector('.btn-row-reject')) {
      tr.querySelector('.btn-row-reject').onclick = () => openRejectModal(e.id);
    }
    tr.querySelector('.btn-row-edit').onclick = () => openEventModal('edit', e);
    tr.querySelector('.btn-row-delete').onclick = () => deleteEvent(e.id);
  });
}

function approveEvent(id) {
  const idx = events.findIndex(item => item.id === id);
  if (idx !== -1) {
    const beforeStatus = events[idx].status;
    events[idx].status = 'Published';
    syncLocalStorage('events');
    addAuditLog(`Approved Pending Event`, `Status: ${beforeStatus}`, `Status: Published (${events[idx].title})`);
    
    // Add success notification
    const newNotif = {
      id: Date.now(),
      title: `Event Approved: ${events[idx].title}`,
      message: `Director & Super Admin approved submission for publication.`,
      time: 'Just now',
      unread: true
    };
    notifications.unshift(newNotif);
    syncLocalStorage('notifications');
    renderNotifications();

    showDashboardAlert('success', `Event '${events[idx].title}' has been successfully approved and is now public!`);
    loadDashboardTable();
  }
}

function openRejectModal(id) {
  appState.rejectEventId = id;
  const evt = events.find(item => item.id === id);
  const title = evt ? evt.title : 'Event';
  const heading = document.querySelector('#reject-modal h3');
  if (heading) heading.innerText = `Reject Submission: ${title}`;
  document.getElementById('reject-reason').value = '';
  document.getElementById('reject-modal').classList.remove('hidden');
}

function handleRejectFormSubmit(e) {
  e.preventDefault();
  const eventId = appState.rejectEventId;
  const reason = document.getElementById('reject-reason').value.trim();
  const idx = events.findIndex(item => item.id === eventId);
  if (idx !== -1) {
    const beforeStatus = events[idx].status;
    events[idx].status = 'Rejected';
    events[idx].rejection_reason = reason;
    syncLocalStorage('events');
    addAuditLog('Rejected Pending Event', `Status: ${beforeStatus}`, `Status: Rejected - Reason: ${reason} (${events[idx].title})`);
    
    // Add warning notification
    const newNotif = {
      id: Date.now(),
      title: `Event Submission Rejected: ${events[idx].title}`,
      message: `Rejection Feedback: "${reason}"`,
      time: 'Just now',
      unread: true
    };
    notifications.unshift(newNotif);
    syncLocalStorage('notifications');
    renderNotifications();

    showDashboardAlert('warning', `Event '${events[idx].title}' has been marked as Rejected. Feedback recorded and notification dispatched.`);
    document.getElementById('reject-modal').classList.add('hidden');
    loadDashboardTable();
  }
}

// B. Manage Registrations Dashboard
function loadRegistrationsPane() {
  const select = document.getElementById('reg-event-select');
  const tbody = document.getElementById('dash-registrations-table-body');
  
  // Filter events by department credentials
  const availableEvents = appState.user.role === 'super_admin'
    ? events
    : events.filter(e => e.department_id === appState.user.departmentId);

  if (availableEvents.length === 0) {
    select.innerHTML = '<option value="">No events available</option>';
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted)">No active events to fetch participants list.</td></tr>';
    return;
  }

  // Populate events selector
  const prevSelectedValue = select.value;
  select.innerHTML = '';
  availableEvents.forEach(evt => {
    const option = document.createElement('option');
    option.value = evt.id;
    option.innerText = `[${evt.academic_year}] ${evt.title}`;
    select.appendChild(option);
  });

  if (prevSelectedValue && availableEvents.some(evt => evt.id === parseInt(prevSelectedValue))) {
    select.value = prevSelectedValue;
  }

  select.onchange = renderRegistrationsTable;
  document.getElementById('reg-search-input').oninput = renderRegistrationsTable;

  renderRegistrationsTable();
}

function renderRegistrationsTable() {
  const select = document.getElementById('reg-event-select');
  const tbody = document.getElementById('dash-registrations-table-body');
  const searchVal = document.getElementById('reg-search-input').value.toLowerCase();

  if (!select.value) return;

  const eventId = parseInt(select.value);
  const event = events.find(e => e.id === eventId);
  
  const list = registrations.filter(r => r.event_id === eventId && 
    (searchVal === '' || r.name.toLowerCase().includes(searchVal) || r.email.toLowerCase().includes(searchVal) || r.ticket_id.toLowerCase().includes(searchVal))
  );

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted)">No participant registrations found for this event.</td></tr>';
    return;
  }

  tbody.innerHTML = '';
  list.forEach(reg => {
    const tr = document.createElement('tr');
    const dept = departments.find(d => d.id === reg.department_id);

    tr.innerHTML = `
      <td>${reg.name}</td>
      <td>${reg.email}</td>
      <td style="font-family: monospace; font-weight:700;">${reg.ticket_id}</td>
      <td><span class="badge-tag">${dept ? dept.code : 'RIT'}</span></td>
      <td>
        <span class="status-badge ${reg.paid ? 'published' : 'draft'}">
          ${reg.paid ? 'Paid' : 'Unpaid'}
        </span>
      </td>
      <td style="text-align: center;">
        <input type="checkbox" class="attendance-check" ${reg.checked_in ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;">
      </td>
    `;

    tbody.appendChild(tr);

    // Bind check-in trigger
    tr.querySelector('.attendance-check').onchange = async (e) => {
      const idx = registrations.findIndex(r => r.id === reg.id);
      if (idx !== -1) {
        const checkedIn = e.target.checked;
        if (appState.isApiConnected) {
          try {
            await apiService.request(`/registrations/${reg.id}/checkin`, {
              method: 'PATCH'
            });
          } catch (error) {
            e.target.checked = reg.checked_in;
            showToast(`Attendance was not saved: ${error.message}`);
            return;
          }
        }
        registrations[idx].checked_in = checkedIn;
        syncLocalStorage('registrations');
        addAuditLog(`Participant Attendance Check-In`, `Checked: ${reg.checked_in}`, `Checked: ${checkedIn} (Ticket: ${reg.ticket_id})`);
        showToast(`Attendance checked: ${reg.name}`);
      }
    };
  });
}

// C. Manage Departments Dashboard (CRUD)
let activeDeptEditId = null;

function loadDepartmentsPane() {
  const tbody = document.getElementById('dash-depts-table-body');
  tbody.innerHTML = '';

  departments.forEach(dept => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 700;">${dept.code}</td>
      <td style="font-weight: 600;">${dept.name}</td>
      <td>
        <img src="${dept.banner_image}" alt="Banner" style="width: 70px; height: 40px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);">
      </td>
      <td style="max-width: 250px; font-size: 0.8rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; border:none; padding-top: 1.5rem;">${dept.description}</td>
      <td>
        <div class="actions-cell" style="justify-content: center">
          <button class="icon-btn icon-btn-edit btn-dept-edit" title="Edit Department Details">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button class="icon-btn icon-btn-delete btn-dept-delete" title="Delete Department">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    // Bind triggers
    tr.querySelector('.btn-dept-edit').onclick = () => openDeptModal('edit', dept);
    tr.querySelector('.btn-dept-delete').onclick = () => deleteDepartment(dept.id);
  });
}

function openDeptModal(mode, dept = null) {
  const modal = document.getElementById('dept-modal');
  const modalTitle = document.getElementById('dept-modal-title');
  const code = document.getElementById('dept-form-code');
  const name = document.getElementById('dept-form-name');
  const banner = document.getElementById('dept-form-banner');
  const desc = document.getElementById('dept-form-desc');

  if (mode === 'add') {
    modalTitle.innerText = 'Add New Department';
    activeDeptEditId = null;
    code.value = '';
    name.value = '';
    banner.value = '';
    desc.value = '';
    code.disabled = false;
  } else {
    modalTitle.innerText = 'Edit Department Details';
    activeDeptEditId = dept.id;
    code.value = dept.code;
    name.value = dept.name;
    banner.value = dept.banner_image;
    desc.value = dept.description;
    code.disabled = true; // Department codes are primary key structures in URL route routing
  }

  modal.classList.remove('hidden');
}

document.getElementById('dept-form').onsubmit = async (e) => {
  e.preventDefault();
  const codeVal = document.getElementById('dept-form-code').value.trim().toUpperCase();
  const nameVal = document.getElementById('dept-form-name').value.trim();
  const bannerVal = document.getElementById('dept-form-banner').value.trim();
  const descVal = document.getElementById('dept-form-desc').value.trim();

  if (activeDeptEditId === null) {
    const departmentData = {
      code: codeVal,
      name: nameVal,
      banner_image: bannerVal,
      description: descVal
    };
    if (appState.isApiConnected) {
      try {
        departments.push(await apiService.request('/departments', {
          method: 'POST',
          body: JSON.stringify(departmentData)
        }));
      } catch (error) {
        showDashboardAlert('danger', `Department was not saved: ${error.message}`);
        return;
      }
    } else {
      const newId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
      departments.push({ id: newId, ...departmentData });
    }
    syncLocalStorage('departments');
    addAuditLog('Created Department', 'N/A', `${codeVal}: ${nameVal}`);
    showDashboardAlert('success', `Department '${codeVal}' added successfully!`);
  } else {
    // CRUD Update
    const idx = departments.findIndex(d => d.id === activeDeptEditId);
    if (idx !== -1) {
      const beforeStr = `${departments[idx].code}: ${departments[idx].name}`;
      const departmentData = {
        code: codeVal,
        name: nameVal,
        banner_image: bannerVal,
        description: descVal
      };
      if (appState.isApiConnected) {
        try {
          departments[idx] = await apiService.request(`/departments/${activeDeptEditId}`, {
            method: 'PUT',
            body: JSON.stringify(departmentData)
          });
        } catch (error) {
          showDashboardAlert('danger', `Department was not updated: ${error.message}`);
          return;
        }
      } else {
        departments[idx] = { ...departments[idx], ...departmentData };
      }
      syncLocalStorage('departments');
      addAuditLog('Updated Department', beforeStr, `${codeVal}: ${nameVal}`);
      showDashboardAlert('success', `Department details for '${codeVal}' updated!`);
    }
  }

  document.getElementById('dept-modal').classList.add('hidden');
  loadDepartmentsPane();
};

async function deleteDepartment(id) {
  const dept = departments.find(d => d.id === id);
  if (!dept) return;

  if (!window.confirm(`Are you sure you want to delete '${dept.name}'? This will archive all events linked to it.`)) {
    return;
  }

  if (appState.isApiConnected) {
    try {
      await apiService.request(`/departments/${id}`, { method: 'DELETE' });
    } catch (error) {
      showDashboardAlert('danger', `Department was not deleted: ${error.message}`);
      return;
    }
  }

  departments = departments.filter(d => d.id !== id);
  syncLocalStorage('departments');
  addAuditLog('Deleted Department', `${dept.code}: ${dept.name}`, 'Deleted');
  showDashboardAlert('success', `Department '${dept.code}' and coordinator logins removed.`);
  loadDepartmentsPane();
}

// D. Manage Admins Dashboard (CRUD)
let activeAdminEditId = null;

function loadAdminsPane() {
  const tbody = document.getElementById('dash-admins-table-body');
  tbody.innerHTML = '';

  users.forEach(usr => {
    const tr = document.createElement('tr');
    const dept = departments.find(d => d.id === usr.department_id);
    const deptCode = dept ? dept.code : 'Central / Super';

    tr.innerHTML = `
      <td style="font-weight:600;">${usr.full_name}</td>
      <td style="font-family: monospace;">${usr.username}</td>
      <td><span class="badge-tag">${deptCode}</span></td>
      <td>
        <span class="status-badge ${usr.role === 'super_admin' ? 'published' : 'draft'}">
          ${usr.role === 'super_admin' ? 'Super Admin' : 'Coordinator'}
        </span>
      </td>
      <td>
        <div class="actions-cell" style="justify-content: center">
          <button class="icon-btn icon-btn-edit btn-admin-edit" title="Edit Credentials">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button class="icon-btn icon-btn-delete btn-admin-delete" title="Remove Account">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    // Bind triggers
    tr.querySelector('.btn-admin-edit').onclick = () => openAdminModal('edit', usr);
    tr.querySelector('.btn-admin-delete').onclick = () => deleteAdmin(usr.id);
  });
}

function openAdminModal(mode, usr = null) {
  const modal = document.getElementById('admin-modal');
  const modalTitle = document.getElementById('admin-modal-title');
  const name = document.getElementById('admin-form-name');
  const usernameInput = document.getElementById('admin-form-user');
  const pass = document.getElementById('admin-form-pass');
  const role = document.getElementById('admin-form-role');
  const deptSelect = document.getElementById('admin-form-dept');
  const deptGroup = document.getElementById('admin-form-dept-group');

  // Load department options
  deptSelect.innerHTML = '';
  departments.forEach(d => {
    const option = document.createElement('option');
    option.value = d.id;
    option.innerText = d.name;
    deptSelect.appendChild(option);
  });

  role.onchange = () => {
    if (role.value === 'super_admin') {
      deptGroup.classList.add('hidden');
    } else {
      deptGroup.classList.remove('hidden');
    }
  };

  if (mode === 'add') {
    modalTitle.innerText = 'Create Coordinator Account';
    activeAdminEditId = null;
    name.value = '';
    usernameInput.value = '';
    usernameInput.disabled = false;
    pass.value = '';
    role.value = 'dept_admin';
    deptGroup.classList.remove('hidden');
  } else {
    modalTitle.innerText = 'Edit Coordinator Credentials';
    activeAdminEditId = usr.id;
    name.value = usr.full_name;
    usernameInput.value = usr.username;
    usernameInput.disabled = true; // Username is primary key identification credential
    pass.value = usr.password;
    role.value = usr.role;
    
    if (usr.role === 'super_admin') {
      deptGroup.classList.add('hidden');
    } else {
      deptGroup.classList.remove('hidden');
      deptSelect.value = usr.department_id;
    }
  }

  modal.classList.remove('hidden');
}

document.getElementById('admin-form').onsubmit = async (e) => {
  e.preventDefault();
  const nameVal = document.getElementById('admin-form-name').value.trim();
  const userVal = document.getElementById('admin-form-user').value.trim();
  const passVal = document.getElementById('admin-form-pass').value.trim();
  const roleVal = document.getElementById('admin-form-role').value;
  const deptIdVal = roleVal === 'super_admin' ? null : parseInt(document.getElementById('admin-form-dept').value);

  if (activeAdminEditId === null) {
    // Duplicate check
    if (users.some(u => u.username === userVal)) {
      alert("Username already exists. Please pick another one.");
      return;
    }

    const userData = {
      username: userVal,
      password: passVal,
      department_id: deptIdVal,
      role: roleVal,
      full_name: nameVal
    };
    if (appState.isApiConnected) {
      try {
        const response = await apiService.request('/auth/register', {
          method: 'POST',
          body: JSON.stringify(userData)
        });
        users.push({
          id: response.user.id,
          username: response.user.username,
          password: '',
          department_id: response.user.departmentId,
          role: response.user.role,
          full_name: response.user.fullName
        });
      } catch (error) {
        showDashboardAlert('danger', `Admin account was not saved: ${error.message}`);
        return;
      }
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      users.push({ id: newId, ...userData });
    }
    syncLocalStorage('users');
    addAuditLog('Created Coordinator Account', 'N/A', `${userVal} (${nameVal})`);
    showDashboardAlert('success', `Coordinator account for '${nameVal}' created successfully.`);
  } else {
    const idx = users.findIndex(u => u.id === activeAdminEditId);
    if (idx !== -1) {
      const beforeStr = `${users[idx].full_name} (${users[idx].role})`;
      const userData = {
        full_name: nameVal,
        password: passVal,
        role: roleVal,
        department_id: deptIdVal
      };
      if (appState.isApiConnected) {
        try {
          await apiService.request(`/auth/users/${activeAdminEditId}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
          });
          users[idx] = {
            ...users[idx],
            full_name: nameVal,
            password: '',
            role: roleVal,
            department_id: deptIdVal
          };
        } catch (error) {
          showDashboardAlert('danger', `Admin account was not updated: ${error.message}`);
          return;
        }
      } else {
        users[idx] = { ...users[idx], ...userData };
      }
      syncLocalStorage('users');
      addAuditLog('Updated Coordinator Account', beforeStr, `${userVal} (${nameVal})`);
      showDashboardAlert('success', `Credentials for '${nameVal}' updated.`);
    }
  }

  document.getElementById('admin-modal').classList.add('hidden');
  loadAdminsPane();
};

async function deleteAdmin(id) {
  // Prevent deleting oneself
  if (appState.user && appState.user.id === id) {
    alert("Self deletion is prohibited for security compliance.");
    return;
  }

  const usr = users.find(u => u.id === id);
  if (!usr) return;

  if (!window.confirm(`Delete administrator credentials for '${usr.full_name}' permanently?`)) {
    return;
  }

  if (appState.isApiConnected) {
    try {
      await apiService.request(`/auth/users/${id}`, { method: 'DELETE' });
    } catch (error) {
      showDashboardAlert('danger', `Admin account was not deleted: ${error.message}`);
      return;
    }
  }

  users = users.filter(u => u.id !== id);
  syncLocalStorage('users');
  addAuditLog('Deleted Coordinator Account', `${usr.username} (${usr.full_name})`, 'Deleted');
  showDashboardAlert('success', `Account credentials for '${usr.full_name}' removed.`);
  loadAdminsPane();
}

// E. Audit Logs Search Desk
function loadLogsPane() {
  const deptFilter = document.getElementById('logs-filter-dept');
  deptFilter.innerHTML = '<option value="">All Departments</option>';
  departments.forEach(d => {
    const option = document.createElement('option');
    option.value = d.code;
    option.innerText = d.name;
    deptFilter.appendChild(option);
  });

  deptFilter.onchange = renderLogsTable;
  document.getElementById('logs-search').oninput = renderLogsTable;
  document.getElementById('logs-filter-date').onchange = renderLogsTable;

  renderLogsTable();
}

function renderLogsTable() {
  const searchVal = document.getElementById('logs-search').value.toLowerCase();
  const deptVal = document.getElementById('logs-filter-dept').value;
  const dateVal = document.getElementById('logs-filter-date').value;
  const tbody = document.getElementById('dash-logs-table-body');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchVal === '' || 
      log.user.toLowerCase().includes(searchVal) || 
      log.action.toLowerCase().includes(searchVal) || 
      log.details.toLowerCase().includes(searchVal);

    const matchesDept = deptVal === '' || log.department === deptVal;

    let matchesDate = true;
    if (dateVal !== '') {
      const logDate = log.timestamp.split('T')[0];
      matchesDate = logDate === dateVal;
    }

    return matchesSearch && matchesDept && matchesDate;
  });

  if (filteredLogs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted)">No system logs matching search filters.</td></tr>';
    return;
  }

  tbody.innerHTML = '';
  filteredLogs.forEach(log => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="white-space:nowrap; font-weight:600;">${new Date(log.timestamp).toLocaleString()}</td>
      <td style="font-weight:600;">${log.user}</td>
      <td><span class="badge-tag">${log.department}</span></td>
      <td>${log.ip}</td>
      <td style="font-size:0.75rem; color: var(--text-secondary);">${log.env}</td>
      <td style="color: var(--accent-gold); font-weight:600;">${log.action}</td>
      <td style="font-size: 0.75rem; max-width:200px; overflow:hidden; text-overflow:ellipsis;" title="${log.details}">${log.details}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Clear logs action
document.getElementById('btn-logs-clear').onclick = () => {
  if (!window.confirm("Purge system audit history permanently? This action requires compliance logging.")) {
    return;
  }
  const beforeLen = auditLogs.length;
  auditLogs = [];
  syncLocalStorage('audit_logs');
  addAuditLog("System Logs History Cleared", `${beforeLen} logs`, "0 logs");
  showDashboardAlert('success', "Audit history purged.");
  renderLogsTable();
};

// Excel and PDF Exports binds
document.getElementById('btn-logs-export').onclick = () => {
  exportToExcel(auditLogs, 'System_Audit_Logs');
};

document.getElementById('btn-reg-export-excel').onclick = () => {
  const select = document.getElementById('reg-event-select');
  if (!select.value) return;
  const eventId = parseInt(select.value);
  const list = registrations.filter(r => r.event_id === eventId);
  const event = events.find(e => e.id === eventId);
  exportToExcel(list, `${event.title.replace(/\s+/g, '_')}_Registrants`);
};

document.getElementById('btn-reg-export-pdf').onclick = () => {
  const select = document.getElementById('reg-event-select');
  if (!select.value) return;
  const eventId = parseInt(select.value);
  const list = registrations.filter(r => r.event_id === eventId);
  const event = events.find(e => e.id === eventId);
  exportRegistrationsToPDF(list, event);
};

// Excel sheet creator helper
function exportToExcel(data, fileNamePrefix) {
  if (data.length === 0) {
    showToast("No data to export.");
    return;
  }
  
  const cleanData = data.map(item => {
    // Remove unwanted visual HTML or deep object props
    const copy = { ...item };
    delete copy.id;
    return copy;
  });

  const ws = XLSX.utils.json_to_sheet(cleanData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Export");
  
  XLSX.writeFile(wb, `${fileNamePrefix}_${new Date().toISOString().slice(0,10)}.xlsx`);
  showToast("Excel spreadsheet generated and downloaded successfully!");
}

// PDF registration lists compilations
function exportRegistrationsToPDF(list, event) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 138);
  doc.text("K. E. Society's Rajarambapu Institute of Technology", 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`Participants list for college activity: ${event.title}`, 14, 25);
  doc.text(`Date of Event: ${event.event_date} | Total Registrants: ${list.length}`, 14, 30);

  doc.setLineWidth(0.01);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 34, 196, 34);

  // Table header
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Ticket ID", 14, 40);
  doc.text("Student Name", 55, 40);
  doc.text("Email ID", 115, 40);
  doc.text("Check-In", 175, 40);
  doc.line(14, 43, 196, 43);

  // Table rows
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  let y = 50;
  
  list.forEach((reg, idx) => {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
    
    doc.text(reg.ticket_id, 14, y);
    doc.text(reg.name.substring(0, 24), 55, y);
    doc.text(reg.email.substring(0, 26), 115, y);
    doc.text(reg.checked_in ? "YES" : "NO", 175, y);
    
    doc.line(14, y + 3, 196, y + 3);
    y += 10;
  });

  doc.save(`${event.title.replace(/\s+/g, '_')}_Registrants.pdf`);
  showToast("Registrants PDF report compiled and downloaded!");
}

// Backup DB snapshot
document.getElementById('btn-backup-db').onclick = () => {
  const dbSnapshot = {
    departments: departments,
    users: users,
    events: events,
    registrations: registrations,
    auditLogs: auditLogs
  };

  const jsonStr = JSON.stringify(dbSnapshot, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `RIT_EventPortal_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  addAuditLog("System Database Backup Downloaded", "N/A", "Backup JSON file generated.");
  showToast("Database state backup JSON downloaded!");
};

// Restore DB snapshot
document.getElementById('db-restore-file').onchange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.departments && data.users && data.events && data.registrations && data.auditLogs) {
        // Overwrite memory variables
        departments = data.departments;
        users = data.users;
        events = data.events;
        registrations = data.registrations;
        auditLogs = data.auditLogs;

        // Persist back to local storage
        syncLocalStorage();
        
        addAuditLog("System Database Restored from Backup", "N/A", `Restored from file: ${file.name}`);
        showToast("Database restored successfully! Re-rendering page...");
        
        // Reload dashboard views to render restored data
        loadDashboardView();
      } else {
        alert("Invalid database backup file format. Missing core list attributes.");
      }
    } catch (err) {
      alert("Failed to parse the backup JSON file. Ensure correct format.");
    }
  };
  reader.readAsText(file);
};

// F. Analytics Panel (Chart.js charts generation)
function loadAnalyticsPane() {
  const currentDate = '2026-08-20';

  // Filters counts based on role permissions
  const activeEvents = appState.user.role === 'super_admin'
    ? events
    : events.filter(e => e.department_id === appState.user.departmentId);

  const total = activeEvents.length;
  const upcoming = activeEvents.filter(e => e.event_date >= currentDate).length;
  const completed = total - upcoming;

  document.getElementById('dash-stat-total').innerText = total;
  document.getElementById('dash-stat-upcoming').innerText = upcoming;
  document.getElementById('dash-stat-completed').innerText = completed;

  // Clean old charts if exist
  if (deptChartInstance) deptChartInstance.destroy();
  if (yearChartInstance) yearChartInstance.destroy();
  if (monthChartInstance) monthChartInstance.destroy();
  if (popularChartInstance) popularChartInstance.destroy();
  if (visitorChartInstance) visitorChartInstance.destroy();
  if (trafficChartInstance) trafficChartInstance.destroy();

  // 1. Chart 1: Department distribution (Super admin only)
  const deptWrapper = document.getElementById('chart-dept-wrapper');
  if (appState.user.role === 'super_admin') {
    deptWrapper.classList.remove('hidden');
    const deptCounts = {};
    activeEvents.forEach(e => {
      const d = departments.find(dep => dep.id === e.department_id);
      const code = d ? d.code : 'Unknown';
      deptCounts[code] = (deptCounts[code] || 0) + 1;
    });

    const ctx = document.getElementById('canvas-dept-chart').getContext('2d');
    deptChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(deptCounts),
        datasets: [{
          data: Object.values(deptCounts),
          backgroundColor: ['#1e3a8a', '#b45309', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Outfit' } } }
        }
      }
    });
  } else {
    deptWrapper.classList.add('hidden');
  }

  // 2. Chart 2: Academic Year Timeline
  const yearCounts = {};
  activeEvents.forEach(e => {
    yearCounts[e.academic_year] = (yearCounts[e.academic_year] || 0) + 1;
  });

  const ctxYear = document.getElementById('canvas-year-chart').getContext('2d');
  yearChartInstance = new Chart(ctxYear, {
    type: 'bar',
    data: {
      labels: Object.keys(yearCounts),
      datasets: [{
        label: 'Events Count',
        data: Object.values(yearCounts),
        backgroundColor: '#b45309',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });

  // 3. Chart 3: Monthly Scheduling Velocity
  const monthlyCounts = Array(12).fill(0);
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  activeEvents.forEach(e => {
    const month = parseInt(e.event_date.split('-')[1]) - 1; // 0-indexed month
    if (!isNaN(month)) monthlyCounts[month]++;
  });

  const ctxMonth = document.getElementById('canvas-month-chart').getContext('2d');
  monthChartInstance = new Chart(ctxMonth, {
    type: 'line',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'Events Velocity',
        data: monthlyCounts,
        borderColor: '#1e3a8a',
        backgroundColor: 'rgba(30, 58, 138, 0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });

  // 4. Chart 4: Popularity Leaderboard (Views, Registrations, Downloads)
  const popularList = [...activeEvents].sort((a,b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
  const labels = popularList.map(e => e.title.substring(0, 15) + '...');
  
  const datasetViews = popularList.map(e => e.views || 0);
  const datasetRegs = popularList.map(e => registrations.filter(r => r.event_id === e.id).length);
  const datasetDownloads = popularList.map(e => e.downloads || 0);

  const ctxPopular = document.getElementById('canvas-popular-chart').getContext('2d');
  popularChartInstance = new Chart(ctxPopular, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { label: 'Views Count', data: datasetViews, backgroundColor: 'rgba(30, 58, 138, 0.85)' },
        { label: 'Registrations', data: datasetRegs, backgroundColor: 'rgba(16, 185, 129, 0.85)' },
        { label: 'Brochures Downloaded', data: datasetDownloads, backgroundColor: 'rgba(180, 83, 9, 0.85)' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true }
      }
    }
  });

  // 5. Chart 5: 14-Day Visitor Velocity & Sources Distribution
  const stats = (typeof visitorStats !== 'undefined' && visitorStats.length > 0) ? visitorStats : DEFAULT_VISITOR_STATS;
  const totalVisitors = stats.reduce((sum, s) => sum + (s.daily_visitors || 0), 0);
  const totalWifi = stats.reduce((sum, s) => sum + (s.campus_wifi || 0), 0);
  const totalSocial = stats.reduce((sum, s) => sum + (s.social_media || 0), 0);
  const totalGoogle = stats.reduce((sum, s) => sum + (s.google_search || 0), 0);
  const totalDirect = stats.reduce((sum, s) => sum + (s.direct_traffic || 0), 0);
  const totalQr = stats.reduce((sum, s) => sum + (s.qr_code_scans || 0), 0);
  const allSourcesTotal = totalWifi + totalSocial + totalGoogle + totalDirect + totalQr;
  const wifiPercent = allSourcesTotal > 0 ? Math.round((totalWifi / allSourcesTotal) * 100) : 54;

  const statVisitorsEl = document.getElementById('dash-stat-visitors');
  if (statVisitorsEl) statVisitorsEl.innerText = `${(totalVisitors / 1000).toFixed(1)}K`;
  const statTrafficEl = document.getElementById('dash-stat-traffic');
  if (statTrafficEl) statTrafficEl.innerText = `Campus Wi-Fi (${wifiPercent}%)`;

  const canvasVisitor = document.getElementById('canvas-visitor-chart');
  if (canvasVisitor) {
    const ctxVisitor = canvasVisitor.getContext('2d');
    visitorChartInstance = new Chart(ctxVisitor, {
      type: 'line',
      data: {
        labels: stats.map(s => {
          const parts = s.date.split('-');
          return parts.length >= 3 ? `${parts[1]}/${parts[2]}` : s.date;
        }),
        datasets: [{
          label: 'Daily Portal Visitors',
          data: stats.map(s => s.daily_visitors || 0),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: false, ticks: { precision: 0 } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  const canvasTraffic = document.getElementById('canvas-traffic-chart');
  if (canvasTraffic) {
    const ctxTraffic = canvasTraffic.getContext('2d');
    trafficChartInstance = new Chart(ctxTraffic, {
      type: 'doughnut',
      data: {
        labels: ['Campus Wi-Fi', 'Social Media', 'Google Search', 'Direct Traffic', 'QR Poster Scans'],
        datasets: [{
          data: [totalWifi, totalSocial, totalGoogle, totalDirect, totalQr],
          backgroundColor: ['#4f46e5', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Outfit' } } }
        }
      }
    });
  }
}

// --- 8. EVENTS CREATION & EDIT MODALS SYSTEM ---

let activeModalMode = 'add';
let activeModalEventId = null;

function setupFileUploadHandlers() {
  const posterFileInput = document.getElementById('form-poster-file');
  const posterUrlInput = document.getElementById('form-poster');
  if (posterFileInput) {
    posterFileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        posterUrlInput.value = evt.target.result;
        showToast("Poster image loaded locally!");
      };
      reader.readAsDataURL(file);

      if (appState.isApiConnected) {
        const formData = new FormData();
        formData.append('file', file);
        fetch(`${apiService.baseUrl}/upload`, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data && data.url) {
            posterUrlInput.value = data.url;
            showToast("Poster uploaded to server!");
          }
        })
        .catch(err => console.log('Poster upload failed:', err));
      }
    };
  }

  const qrFileInput = document.getElementById('form-qr-file');
  const qrUrlInput = document.getElementById('form-qr');
  if (qrFileInput) {
    qrFileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        qrUrlInput.value = evt.target.result;
        showToast("Payment QR loaded locally!");
      };
      reader.readAsDataURL(file);

      if (appState.isApiConnected) {
        const formData = new FormData();
        formData.append('file', file);
        fetch(`${apiService.baseUrl}/upload`, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data && data.url) {
            qrUrlInput.value = data.url;
            showToast("QR uploaded to server!");
          }
        })
        .catch(err => console.log('QR upload failed:', err));
      }
    };
  }
}

function renderNotifications() {
  const badge = document.getElementById('notif-badge');
  const list = document.getElementById('notif-list');
  if (!list) return;

  const notifs = (typeof notifications !== 'undefined') ? notifications : [];
  const unreadCount = notifs.filter(n => n.unread).length;

  if (badge) {
    if (unreadCount > 0) {
      badge.innerText = unreadCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  if (notifs.length === 0) {
    list.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        No notifications right now
      </div>
    `;
    return;
  }

  list.innerHTML = notifs.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markNotificationRead(${n.id})">
      <div class="notif-item-title">${n.title}</div>
      <div class="notif-item-msg">${n.message}</div>
      <div class="notif-item-time">${n.time || 'Recent'}</div>
    </div>
  `).join('');
}

window.markNotificationRead = function(id) {
  const notif = notifications.find(n => n.id === id);
  if (notif) {
    notif.unread = false;
    syncLocalStorage('notifications');
    renderNotifications();
  if (appState.isApiConnected) {
    apiService.request(`/notifications/${id}/read`, { method: 'PATCH' })
      .catch(error => console.error('Failed to mark notification as read:', error));
  }
}
};

function clearAllNotifications() {
  notifications.forEach(n => n.unread = false);
  syncLocalStorage('notifications');
  renderNotifications();
  if (appState.isApiConnected) {
    apiService.request('/notifications/read-all', {
      method: 'POST',
      body: JSON.stringify({
        department_id: appState.user && appState.user.departmentId
      })
    }).catch(error => console.error('Failed to mark notifications as read:', error));
  }
  showToast("All notifications marked as read.");
}

function toggleNotifDropdown() {
  const dropdown = document.getElementById('notif-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}

function closeNotifDropdown() {
  const dropdown = document.getElementById('notif-dropdown');
  if (dropdown && !dropdown.classList.contains('hidden')) {
    dropdown.classList.add('hidden');
  }
}

function openEventModal(mode, event = null) {
  activeModalMode = mode;
  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const submitBtn = document.getElementById('form-submit-btn');

  if (mode === 'add') {
    modalTitle.innerText = 'Create New Event';
    submitBtn.innerText = 'Publish Event';
    activeModalEventId = null;

    // Clear form inputs
    document.getElementById('form-title').value = '';
    document.getElementById('form-desc').value = '';
    document.getElementById('form-year').value = '2025-2026';
    document.getElementById('form-category').value = 'Technical';
    document.getElementById('form-fees').value = 'Free';
    document.getElementById('form-date').value = '';
    document.getElementById('form-time').value = '10:00';
    document.getElementById('form-venue').value = '';
    document.getElementById('form-deadline').value = '';
    document.getElementById('form-reglink').value = '';
    document.getElementById('form-faculty').value = '';
    document.getElementById('form-student').value = '';
    document.getElementById('form-contact-1').value = '';
    document.getElementById('form-contact-2').value = '';
    document.getElementById('form-contact-3').value = '';
    document.getElementById('form-rules').value = '';
    document.getElementById('form-eligibility').value = '';
    document.getElementById('form-schedule').value = '';
    document.getElementById('form-brochure').value = '';
    document.getElementById('form-video').value = '';
    document.getElementById('form-sponsors').value = '';
    document.getElementById('form-faqs').value = '';
    document.getElementById('form-winners').value = '';
    document.getElementById('form-status').value = 'Published';
    document.getElementById('form-poster-file').value = '';
    document.getElementById('form-poster').value = '';
    document.getElementById('form-qr-file').value = '';
    document.getElementById('form-qr').value = '';

    if (appState.user.role !== 'super_admin') {
      document.getElementById('form-dept').value = appState.user.departmentId;
    }
  } else {
    modalTitle.innerText = 'Edit Event Details';
    submitBtn.innerText = 'Save Changes';
    activeModalEventId = event.id;

    // Load inputs
    document.getElementById('form-title').value = event.title;
    document.getElementById('form-desc').value = event.description;
    document.getElementById('form-dept').value = event.department_id;
    document.getElementById('form-year').value = event.academic_year;
    document.getElementById('form-category').value = event.category;
    document.getElementById('form-fees').value = event.fees || 'Free';
    document.getElementById('form-date').value = event.event_date;
    document.getElementById('form-time').value = event.event_time;
    document.getElementById('form-venue').value = event.venue;
    document.getElementById('form-deadline').value = event.registration_deadline;
    document.getElementById('form-reglink').value = event.registration_link || '';
    document.getElementById('form-faculty').value = event.faculty_coordinator || '';
    document.getElementById('form-student').value = event.student_coordinator || '';
    document.getElementById('form-contact-1').value = event.contact_1 || '';
    document.getElementById('form-contact-2').value = event.contact_2 || '';
    document.getElementById('form-contact-3').value = event.contact_3 || '';
    document.getElementById('form-rules').value = event.rules || '';
    document.getElementById('form-eligibility').value = event.eligibility || '';
    document.getElementById('form-schedule').value = Array.isArray(event.schedule) ? event.schedule.map(s => `${s.time}: ${s.title}`).join(' | ') : (event.schedule || '');
    document.getElementById('form-brochure').value = event.brochure_url || '';
    document.getElementById('form-video').value = event.video_url || '';
    document.getElementById('form-sponsors').value = Array.isArray(event.sponsors) ? event.sponsors.map(s => `${s.name} - ${s.tier}`).join(' | ') : (event.sponsors || '');
    document.getElementById('form-faqs').value = Array.isArray(event.faqs) ? event.faqs.map(f => `Q: ${f.q} A: ${f.a}`).join(' | ') : (event.faqs || '');
    document.getElementById('form-winners').value = Array.isArray(event.winners) ? event.winners.map(w => `${w.rank}: ${w.team} (${w.college})`).join(' | ') : (event.winners || '');
    document.getElementById('form-status').value = event.status || 'Published';
    document.getElementById('form-poster-file').value = '';
    document.getElementById('form-poster').value = event.poster_image || '';
    document.getElementById('form-qr-file').value = '';
    document.getElementById('form-qr').value = event.payment_qr || '';
  }

  modal.classList.remove('hidden');
}

async function handleEventFormSubmit(e) {
  e.preventDefault();

  const dateVal = document.getElementById('form-date').value;
  const deadlineVal = document.getElementById('form-deadline').value;

  if (deadlineVal > dateVal) {
    showDashboardAlert('danger', 'Registration deadline date must be on or before the event execution date.');
    return;
  }

  // Pack variables
  const eventData = {
    title: document.getElementById('form-title').value.trim(),
    description: document.getElementById('form-desc').value.trim(),
    department_id: parseInt(document.getElementById('form-dept').value),
    academic_year: document.getElementById('form-year').value,
    category: document.getElementById('form-category').value,
    fees: document.getElementById('form-fees').value.trim(),
    event_date: dateVal,
    event_time: document.getElementById('form-time').value.trim(),
    venue: document.getElementById('form-venue').value.trim(),
    registration_deadline: deadlineVal,
    registration_link: document.getElementById('form-reglink').value.trim(),
    faculty_coordinator: document.getElementById('form-faculty').value.trim(),
    student_coordinator: document.getElementById('form-student').value.trim(),
    contact_1: document.getElementById('form-contact-1').value.trim(),
    contact_2: document.getElementById('form-contact-2').value.trim(),
    contact_3: document.getElementById('form-contact-3').value.trim(),
    rules: document.getElementById('form-rules').value.trim(),
    eligibility: document.getElementById('form-eligibility').value.trim(),
    schedule: document.getElementById('form-schedule').value.trim(),
    brochure_url: document.getElementById('form-brochure').value.trim(),
    video_url: document.getElementById('form-video').value.trim(),
    sponsors: document.getElementById('form-sponsors').value.trim(),
    faqs: document.getElementById('form-faqs').value.trim(),
    winners: document.getElementById('form-winners').value.trim(),
    status: document.getElementById('form-status').value,
    poster_image: document.getElementById('form-poster').value.trim() || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
    payment_qr: document.getElementById('form-qr').value.trim()
  };

  if (activeModalMode === 'add') {
    eventData.views = 0;
    eventData.downloads = 0;

    if (appState.isApiConnected) {
      try {
        const created = await apiService.request('/events', {
          method: 'POST',
          body: JSON.stringify(eventData)
        });
        events.push(created);
      } catch (error) {
        showDashboardAlert('danger', `Event was not saved: ${error.message}`);
        return;
      }
    } else {
      eventData.id = events.length > 0 ? Math.max(...events.map(item => item.id)) + 1 : 1;
      events.push(eventData);
    }

    syncLocalStorage('events');
    addAuditLog('Created Event', 'N/A', `${eventData.title} (${eventData.status})`);
    showDashboardAlert('success', `New event '${eventData.title}' submitted! status: ${eventData.status}`);
  } else {
    const idx = events.findIndex(item => item.id === activeModalEventId);
    if (idx !== -1) {
      const beforeStr = `${events[idx].title} (${events[idx].status})`;
      if (appState.isApiConnected) {
        try {
          events[idx] = await apiService.request(`/events/${activeModalEventId}`, {
            method: 'PUT',
            body: JSON.stringify(eventData)
          });
        } catch (error) {
          showDashboardAlert('danger', `Event was not updated: ${error.message}`);
          return;
        }
      } else {
        events[idx] = { ...events[idx], ...eventData };
      }
      syncLocalStorage('events');
      addAuditLog('Updated Event Details', beforeStr, `${eventData.title} (${eventData.status})`);

      showDashboardAlert('success', `Event '${eventData.title}' configurations saved.`);
    }
  }

  document.getElementById('event-modal').classList.add('hidden');
  loadDashboardTable();
}

async function deleteEvent(id) {
  const event = events.find(e => e.id === id);
  if (!event) return;

  if (!window.confirm(`Delete the event record for '${event.title}' permanently?`)) {
    return;
  }

  if (appState.isApiConnected) {
    try {
      await apiService.request(`/events/${id}`, { method: 'DELETE' });
    } catch (error) {
      showDashboardAlert('danger', `Event was not deleted: ${error.message}`);
      return;
    }
  }

  events = events.filter(item => item.id !== id);
  syncLocalStorage('events');
  addAuditLog('Deleted Event', `${event.title}`, 'Deleted');
  
  showDashboardAlert('success', `Event record '${event.title}' has been successfully deleted.`);
  loadDashboardTable();
}

function showDashboardAlert(type, text) {
  const alertBox = document.getElementById('dash-alert');
  alertBox.className = `alert alert-${type}`;
  alertBox.innerText = text;
  alertBox.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 9. AUTHORIZATION ACCESS CONTROLS (LOGIN/LOGOUT) ---

async function handleLoginSubmit(e) {
  e.preventDefault();
  const userVal = document.getElementById('username').value.trim();
  const passVal = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('login-error');

  errorBox.classList.add('hidden');

  const isLocalStandalone = window.location.protocol === 'file:'
    || ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (!appState.isApiConnected && !isLocalStandalone) {
    errorBox.innerText = 'The live database is unavailable. Sign-in and admin changes are disabled until the API reconnects.';
    errorBox.classList.remove('hidden');
    return;
  }

  let user;
  if (appState.isApiConnected) {
    try {
      const result = await apiService.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: userVal, password: passVal })
      });
      appState.authToken = result.token;
      sessionStorage.setItem('rit_token', result.token);
      user = result.user;

      events = await apiService.request('/events');
      syncLocalStorage('events');

      if (user.role === 'super_admin') {
        const remoteUsers = await apiService.request('/auth/users');
        users = remoteUsers.map(remoteUser => ({
          id: remoteUser.id,
          username: remoteUser.username,
          full_name: remoteUser.fullName,
          role: remoteUser.role,
          department_id: remoteUser.departmentId
        }));
        syncLocalStorage('users');
      }

      const visibleEvents = user.role === 'super_admin'
        ? events
        : events.filter(event => event.department_id === user.departmentId);
      const registrationLists = await Promise.all(
        visibleEvents.map(event => apiService.request(`/registrations/event/${event.id}`))
      );
      registrations = registrationLists.flat();
      syncLocalStorage('registrations');
    } catch (error) {
      errorBox.innerText = error.message;
      errorBox.classList.remove('hidden');
      return;
    }
  } else {
    const foundUser = users.find(u => u.username === userVal && u.password === passVal);
    if (foundUser) {
      const dept = departments.find(d => d.id === foundUser.department_id);
      user = {
        id: foundUser.id,
        username: foundUser.username,
        fullName: foundUser.full_name,
        role: foundUser.role,
        departmentId: foundUser.department_id,
        departmentName: dept ? dept.name : null,
        departmentCode: dept ? dept.code : null
      };
    }
  }

  if (user) {
    appState.user = user;
    sessionStorage.setItem('rit_user', JSON.stringify(appState.user));

    document.getElementById('nav-dashboard').classList.remove('hidden');
    document.getElementById('nav-login').classList.add('hidden');
    addAuditLog('User Logged In');
    navigateTo('dashboard');
  } else {
    errorBox.innerText = 'Invalid username or password.';
    errorBox.classList.remove('hidden');
  }
}

function handleLogout() {
  if (appState.user) {
    addAuditLog('User Logged Out');
  }
  
  appState.user = null;
  appState.authToken = null;
  sessionStorage.removeItem('rit_user');
  sessionStorage.removeItem('rit_token');

  // Toggle header menus
  document.getElementById('nav-dashboard').classList.add('hidden');
  document.getElementById('nav-login').classList.remove('hidden');

  navigateTo('home');
}

// --- 10. PORTAL INITIALIZATION & LIFE HOOKS ---

document.addEventListener('DOMContentLoaded', () => {
  // Sync databases structures
  initDatabase();

  // Load local theme setting
  const savedTheme = localStorage.getItem('rit_dark_mode');
  if (savedTheme === 'true') {
    appState.darkMode = true;
    document.body.classList.add('dark-mode');
    document.getElementById('sun-icon').classList.remove('hidden');
    document.getElementById('moon-icon').classList.add('hidden');
  }

  document.getElementById('theme-toggle').onclick = () => {
    appState.darkMode = !appState.darkMode;
    if (appState.darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('rit_dark_mode', 'true');
      document.getElementById('sun-icon').classList.remove('hidden');
      document.getElementById('moon-icon').classList.add('hidden');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('rit_dark_mode', 'false');
      document.getElementById('sun-icon').classList.add('hidden');
      document.getElementById('moon-icon').classList.remove('hidden');
    }
  };

  // Session retrieval
  const cachedSession = sessionStorage.getItem('rit_user');
  if (cachedSession) {
    appState.user = JSON.parse(cachedSession);
    document.getElementById('nav-dashboard').classList.remove('hidden');
    document.getElementById('nav-login').classList.add('hidden');
  }

  const scrollToSection = (sectionId, navLinkId) => {
    if (appState.activeView !== 'home') {
      navigateTo('home', {}, true, true);
    }
    document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
    const activeLink = document.getElementById(navLinkId);
    if (activeLink) activeLink.classList.add('active');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -90; // offset to clear sticky navbar
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  // Header Nav listeners
  document.getElementById('nav-logo').onclick = () => navigateTo('home');
  document.getElementById('nav-home').onclick = () => navigateTo('home');
  document.getElementById('nav-upcoming-link').onclick = () => scrollToSection('sec-upcoming', 'nav-upcoming-link');
  document.getElementById('nav-calendar-link').onclick = () => scrollToSection('sec-calendar', 'nav-calendar-link');
  document.getElementById('nav-departments-link').onclick = () => scrollToSection('sec-departments', 'nav-departments-link');
  document.getElementById('nav-login').onclick = () => navigateTo('login');
  document.getElementById('nav-dashboard').onclick = () => navigateTo('dashboard');
  const navCert = document.getElementById('nav-certificates');
  if (navCert) {
    navCert.onclick = () => navigateTo('certificates');
  }

  // Core actions buttons
  document.getElementById('dash-logout').onclick = handleLogout;
  document.getElementById('add-event-btn').onclick = () => openEventModal('add');
  document.getElementById('modal-close-btn').onclick = () => document.getElementById('event-modal').classList.add('hidden');
  document.getElementById('form-cancel-btn').onclick = () => document.getElementById('event-modal').classList.add('hidden');
  
  // Custom dashboard buttons
  document.getElementById('add-dept-btn').onclick = () => openDeptModal('add');
  document.getElementById('add-admin-btn').onclick = () => openAdminModal('add');

  // Submit bindings
  document.getElementById('event-form').onsubmit = handleEventFormSubmit;
  document.getElementById('login-form').onsubmit = handleLoginSubmit;
  document.getElementById('dept-back-btn').onclick = () => navigateTo('home');
  document.getElementById('certificate-form').onsubmit = (e) => e.preventDefault(); // Controlled in trigger

  // Super Admin Reject Form submission
  const rejectForm = document.getElementById('reject-form');
  if (rejectForm) {
    rejectForm.onsubmit = handleRejectFormSubmit;
  }

  // Notification Bell toggling & clearing
  renderNotifications();
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.onclick = (e) => {
      e.stopPropagation();
      toggleNotifDropdown();
    };
  }
  const notifClearBtn = document.getElementById('notif-clear-btn');
  if (notifClearBtn) {
    notifClearBtn.onclick = (e) => {
      e.stopPropagation();
      clearAllNotifications();
    };
  }
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-notif-container')) {
      closeNotifDropdown();
    }
  });

  // Setup Event Form File Upload Listeners
  setupFileUploadHandlers();
  
  // Temporary title clear on print to hide browser page title header
  let originalTitle = document.title;
  window.addEventListener('beforeprint', () => {
    originalTitle = document.title;
    document.title = '\u200B';
  });
  window.addEventListener('afterprint', () => {
    document.title = originalTitle;
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.viewName) {
      navigateTo(event.state.viewName, event.state.params, false);
    } else {
      navigateTo('home', {}, false);
    }
  });

  // Set initial history state for home view
  try {
    history.replaceState({ viewName: 'home', params: {} }, "");
  } catch (e) {
    console.warn("Could not replace initial history state:", e);
  }

  // Check backend server availability
  apiService.checkHealth();

  // Launch Home View
  navigateTo('home', {}, false);
});
