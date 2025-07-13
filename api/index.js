const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory data storage for Vercel (since SQLite won't work in serverless)
const projects = [
  {
    id: 1,
    title: 'XENO Humanoid Robot',
    description: 'XENO is a humanoid robot built for TechExpo\'23, capable of real-time camera access, voice-based assistance, and advanced AI features. Designed and developed as a full-stack engineering project, XENO demonstrates robotics, AI, and IoT integration.',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    github_url: 'https://github.com/IAbhisek/xeno-robot',
    demo_url: 'https://www.linkedin.com/posts/abhishek-singh-803011239_xeno-humanoid-robot-techexpo23-activity-7079640730733932544-2QwF/',
    technologies: 'Python,OpenCV,Raspberry Pi,AI,IoT',
    category: 'Robotics',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Smart Task Manager',
    description: 'A full-stack web application with AI-powered task prioritization and real-time collaboration features.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    github_url: 'https://github.com/IAbhisek/task-manager',
    demo_url: 'https://task-manager-demo.com',
    technologies: 'Next.js,TypeScript,PostgreSQL,OpenAI',
    category: 'Web Development',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'IoT Weather Station',
    description: 'A solar-powered weather monitoring system with wireless data transmission and mobile app integration.',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    github_url: 'https://github.com/IAbhisek/weather-station',
    demo_url: 'https://weather-station-demo.com',
    technologies: 'ESP32,C++,LoRaWAN,React Native',
    category: 'Embedded Systems',
    created_at: new Date().toISOString()
  }
];

const skills = [
  { id: 1, name: 'Python', category: 'Software Development', proficiency: 90 },
  { id: 2, name: 'JavaScript', category: 'Software Development', proficiency: 85 },
  { id: 3, name: 'TypeScript', category: 'Software Development', proficiency: 80 },
  { id: 4, name: 'React', category: 'Web Development', proficiency: 85 },
  { id: 5, name: 'Next.js', category: 'Web Development', proficiency: 80 },
  { id: 6, name: 'Node.js', category: 'Web Development', proficiency: 75 },
  { id: 7, name: 'Arduino', category: 'Embedded Systems', proficiency: 85 },
  { id: 8, name: 'ESP32', category: 'Embedded Systems', proficiency: 80 },
  { id: 9, name: 'ROS', category: 'Robotics & AI', proficiency: 75 },
  { id: 10, name: 'OpenCV', category: 'Robotics & AI', proficiency: 70 }
];

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/skills', (req, res) => {
  res.json(skills);
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // Store message in memory (in production, you'd use a database)
  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    created_at: new Date().toISOString()
  };

  // Send email if configured
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    sendEmail(name, email, subject, message);
  }

  res.json({ success: true, message: 'Message sent successfully!' });
});

function sendEmail(name, email, subject, message) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'alex.chen@example.com',
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
    }
  });
}

// Export for Vercel serverless
module.exports = app; 