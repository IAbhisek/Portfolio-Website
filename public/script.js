let projects = [];
let skills = [];

const projectsGrid = document.getElementById('projectsGrid');
const skillsGrid = document.getElementById('skillsGrid');
const contactForm = document.getElementById('contactForm');
const loadingSpinner = document.getElementById('loadingSpinner');
const successModal = document.getElementById('successModal');
const currentYearSpan = document.getElementById('currentYear');

document.addEventListener('DOMContentLoaded', function() {
    setCurrentYear();
    renderProjectsFallback();
    renderSkillsFallback();
    setupEventListeners();
    setupSmoothScrolling();
    createSpaceElements();
});

function setCurrentYear() {
    currentYearSpan.textContent = new Date().getFullYear();
}

function renderProjects() {
    if (!projects.length) {
        renderProjectsFallback();
        return;
    }

    const featured = projects.slice(0, 3);
    projectsGrid.innerHTML = featured.map(project => `
        <div class="project-card">
            <div class="project-image">
                <i class="fas ${getProjectIcon(project.category)} project-icon"></i>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <i class="fas ${getProjectIcon(project.category)} project-icon"></i>
                    <h3 class="project-title">${project.title}</h3>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.split(',').map(tech => 
                        `<span class="tech-badge">${tech.trim()}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github_url}" target="_blank" class="btn btn-outline btn-sm">
                        <i class="fab fa-github"></i>
                        Code
                    </a>
                    <a href="${project.demo_url}" target="_blank" class="btn btn-outline btn-sm">
                        <i class="fas fa-external-link-alt"></i>
                        Demo
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    projectsGrid.innerHTML += `<div style="text-align:center;width:100%;margin-top:2rem;"><a href="projects.html" class="btn btn-primary">More Projects</a></div>`;
}

function renderSkills() {
    if (!skills.length) {
        renderSkillsFallback();
        return;
    }

    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    skillsGrid.innerHTML = Object.entries(skillsByCategory).map(([category, categorySkills]) => `
        <div class="skill-card">
            <div class="skill-header">
                <i class="fas ${getSkillIcon(category)} skill-icon"></i>
                <h3 class="skill-title">${category}</h3>
            </div>
            <div class="skill-badges">
                ${categorySkills.map(skill => 
                    `<span class="tech-badge">${skill.name}</span>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

function renderProjectsFallback() {
    const fallbackProjects = [
        {
            title: 'XENO Humanoid Robot',
            description: 'XENO is a humanoid robot built for TechExpo\'23, capable of real-time camera access, voice-based assistance, and advanced AI features. Designed and developed as a full-stack engineering project, XENO demonstrates robotics, AI, and IoT integration.',
            technologies: 'Python,OpenCV,Raspberry Pi,AI,IoT',
            category: 'Robotics',
            github_url: 'https://github.com/IAbhisek/xeno-robot',
            demo_url: 'https://www.linkedin.com/posts/abhishek-singh-803011239_xeno-humanoid-robot-techexpo23-activity-7079640730733932544-2QwF/'
        },
        {
            title: 'Smart Task Manager',
            description: 'A full-stack web application with AI-powered task prioritization and real-time collaboration features.',
            technologies: 'Next.js,TypeScript,PostgreSQL,OpenAI',
            category: 'Web Development',
            github_url: 'https://github.com/IAbhisek/task-manager',
            demo_url: 'https://task-manager-demo.com'
        },
        {
            title: 'IoT Weather Station',
            description: 'A solar-powered weather monitoring system with wireless data transmission and mobile app integration.',
            technologies: 'ESP32,C++,LoRaWAN,React Native',
            category: 'Embedded Systems',
            github_url: 'https://github.com/IAbhisek/weather-station',
            demo_url: 'https://weather-station-demo.com'
        }
    ];

    projectsGrid.innerHTML = fallbackProjects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <i class="fas fa-project-diagram"></i>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <i class="fas ${getProjectIcon(project.category)} project-icon"></i>
                    <h3 class="project-title">${project.title}</h3>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.split(',').map(tech => 
                        `<span class="tech-badge">${tech.trim()}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github_url}" target="_blank" class="btn btn-outline btn-sm">
                        <i class="fab fa-github"></i>
                        Code
                    </a>
                    <a href="${project.demo_url}" target="_blank" class="btn btn-outline btn-sm">
                        <i class="fas fa-external-link-alt"></i>
                        Demo
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSkillsFallback() {
    const fallbackSkills = {
        'Software Development': ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go'],
        'Web Development': ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
        'Embedded Systems': ['Arduino', 'ESP32', 'STM32', 'Raspberry Pi', 'FreeRTOS', 'KiCad'],
        'Robotics & AI': ['ROS', 'OpenCV', 'TensorFlow', 'PyTorch', 'MATLAB', 'Gazebo']
    };

    skillsGrid.innerHTML = Object.entries(fallbackSkills).map(([category, skillList]) => `
        <div class="skill-card">
            <div class="skill-header">
                <i class="fas ${getSkillIcon(category)} skill-icon"></i>
                <h3 class="skill-title">${category}</h3>
            </div>
            <div class="skill-badges">
                ${skillList.map(skill => 
                    `<span class="tech-badge">${skill}</span>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

function getProjectIcon(category) {
    const icons = {
        'Robotics': 'fa-microchip',
        'Web Development': 'fa-globe',
        'Embedded Systems': 'fa-bolt',
        'Software Development': 'fa-code',
        'Mobile Development': 'fa-mobile-alt',
        'Machine Learning': 'fa-brain'
    };
    return icons[category] || 'fa-project-diagram';
}

function getSkillIcon(category) {
    const icons = {
        'Software Development': 'fa-code',
        'Web Development': 'fa-globe',
        'Embedded Systems': 'fa-bolt',
        'Robotics & AI': 'fa-microchip',
        'Mobile Development': 'fa-mobile-alt',
        'Database': 'fa-database'
    };
    return icons[category] || 'fa-cog';
}

function setupEventListeners() {
    contactForm.addEventListener('submit', handleContactSubmit);
    
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            navToggle.classList.remove('active');
        });
    });
}

function sendViaWhatsApp() {
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !phone || !message) {
        alert('Please fill in all required fields (Name, Phone, Message)');
        return;
    }
    
    const whatsappMessage = `*New Portfolio Contact*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
    
    const whatsappNumber = '918896230050';
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    showSuccessModal();
    contactForm.reset();
}

async function sendViaEmail() {
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !phone || !message) {
        alert('Please fill in all required fields (Name, Phone, Message)');
        return;
    }
    
    const emailSubject = `Portfolio Contact: ${subject || 'New Message'}`;
    const emailBody = `Name: ${name}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`;
    
    const mailtoUrl = `mailto:alex.chen@example.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.open(mailtoUrl, '_blank');
    showSuccessModal();
    contactForm.reset();
}

async function handleContactSubmit(e) {
    e.preventDefault();
}

function downloadResume() {
    window.open('/api/resume', '_blank');
}

function showLoading(show) {
    if (show) {
        loadingSpinner.classList.add('show');
    } else {
        loadingSpinner.classList.remove('show');
    }
}

function showSuccessModal() {
    successModal.classList.add('show');
}

function closeModal() {
    successModal.classList.remove('show');
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .project-card, .skill-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && successModal.classList.contains('show')) {
        closeModal();
    }
});

function createSpaceElements() {
    for (let i = 0; i < 50; i++) {
        createStar();
    }
    
    for (let i = 0; i < 5; i++) {
        createAsteroid();
    }
}

function createStar() {
    const star = document.createElement('div');
    star.className = 'floating-star';
    star.style.cssText = `
        position: fixed;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.8 + 0.2};
        z-index: -1;
        animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
    `;
    document.body.appendChild(star);
}

function createAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.className = 'asteroid';
    asteroid.style.cssText = `
        position: fixed;
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: linear-gradient(45deg, #8b4513, #654321);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: 0.4;
        z-index: -1;
        animation: float ${Math.random() * 30 + 20}s ease-in-out infinite;
        animation-delay: ${Math.random() * 10}s;
    `;
    document.body.appendChild(asteroid);
} 