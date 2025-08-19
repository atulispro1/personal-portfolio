  // IntersectionObserver for scroll reveal
    const sections = document.querySelectorAll('.section, .skills-block, .icon-list, .projects-container, .mini-projects, .education-info, .contact-form, .message-section, .motivation-section');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Button ripple effect
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
      button.addEventListener('click', e => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Animate skill bars
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.skills-progress').forEach(bar => {
        const percent = bar.dataset.percent;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = percent;
        }, 500);
      });
    });

    // Floating social icons effect
    const socialIcons = document.querySelectorAll('.social-icons a');
    let direction = 1;
    let pos = 0;
    function floatSocialIcons() {
      pos += 0.15 * direction;
      if (pos > 6 || pos < 0) direction *= -1;
      socialIcons.forEach(icon => {
        icon.style.transform = `translateY(${pos}px)`;
      });
      requestAnimationFrame(floatSocialIcons);
    }
    floatSocialIcons();

    // Smooth scroll for sidebar navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
    (function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h;
  let particles = [];
  const particleCount = 120;

  let mouse = { x: null, y: null };

  function initCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 3 + 1;
      this.baseSize = this.size;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.shape = Math.random() < 0.5 ? 'circle' : 'square';
      this.color = 'rgba(124,58,237,0.7)';
    }

    draw() {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 12;
      ctx.fillStyle = this.color;

      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const half = this.size;
        ctx.beginPath();
        ctx.rect(this.x - half, this.y - half, this.size * 2, this.size * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if (this.x < 0 || this.x > w) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > h) this.speedY = -this.speedY;

      // Slightly move toward mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist * 0.5;
          this.x -= dx * force * 0.05;
          this.y -= dy * force * 0.05;
        }
      }
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  // Resize canvas and reset particles on window resize
  window.addEventListener('resize', () => {
    initCanvas();
    createParticles();
  });

  // Track mouse movement
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', e => {
    mouse.x = null;
    mouse.y = null;
  });

  // Initialize and start animation
  initCanvas();
  createParticles();
  animate();
})();

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

