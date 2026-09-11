
import createGlobe from 'https://esm.sh/cobe';

const markerData = [

    { id: 'guwahati', location: [26.1445, 91.7362], label: 'Guwahati, Assam, India', featured: true },
];

const arcData = [

];

const globeCanvas = document.getElementById('globe-canvas');

if (globeCanvas) {
    const globe = createGlobe(globeCanvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: 440,
        height: 440,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: [0.3, 0.45, 0.85],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0.01,
        markers: markerData.map((marker) => ({
            location: marker.location,
            size: marker.featured ? 0.04 : 0.025,
            id: marker.id,
        })),
        arcs: arcData.map((arc) => ({
            from: arc.from,
            to: arc.to,
            id: arc.id,
        })),
        arcColor: [0.3, 0.45, 0.85],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
    });

    let phi = 0;
    const theta = 0.2;
    const animate = () => {
        phi += 0.003;
        globe.update({
            phi,
            theta,
            dark: 0,
            mapBrightness: 10,
            markerColor: [0.3, 0.45, 0.85],
            baseColor: [1, 1, 1],
            arcColor: [0.3, 0.45, 0.85],
            markerElevation: 0.01,
            markers: markerData.map((marker) => ({
                location: marker.location,
                size: marker.featured ? 0.04 : 0.025,
                id: marker.id,
            })),
            arcs: arcData.map((arc) => ({
                from: arc.from,
                to: arc.to,
                id: arc.id,
            })),
        });
        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('beforeunload', () => globe.destroy());
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeButton = document.getElementById('theme');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeButton.setAttribute('aria-pressed', String(isDarkMode));
    themeButton.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
    themeButton.setAttribute('title', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
});
 

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

const sectionsToObserve = document.querySelectorAll('.aboutme, .skills, .project, .contactpage, .project-card');
sectionsToObserve.forEach((section) => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

const titles = document.querySelectorAll('.title');
titles.forEach((title) => {
    title.classList.add('fade-in-section');
    observer.observe(title);
});
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        };

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Form submission failed');
            }

            contactForm.reset();
            alert('Your message has been sent successfully!');
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
}
