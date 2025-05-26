// JavaScript for Portfolio Website

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    nav.classList.remove("active");

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Form submission handler
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: this.querySelector("#name").value,
      email: this.querySelector("#email").value,
      message: this.querySelector("#message").value,
    };

    // Here you would typically send the form data to a server
    // For now, we'll just log it and show a success message
    console.log("Form submission:", formData);

    // Display success message (in a real application, do this after successful submission)
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Message Sent!";
    submitBtn.disabled = true;

    // Reset form
    setTimeout(() => {
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  });
}

// Add scroll event for header styling
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    header.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
  }
});

// Initialize particles.js for multiple sections
function initParticles() {
  console.log("Initializing particles...");

  // Check if particlesJS is available
  if (typeof particlesJS !== "undefined") {
    console.log("particlesJS is defined");

    try {
      // Initialize particles for each section
      ["hero", "about", "skills", "projects", "contact"].forEach((section) => {
        const containerId = `particles-js-${section}`;
        const container = document.getElementById(containerId);

        if (container) {
          console.log(`Initializing particles for ${containerId}`);

          // Load the appropriate configuration
          if (section === "hero") {
            particlesJS(containerId, {
              particles: {
                number: {
                  value: 50,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: "#ffffff",
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000",
                  },
                },
                opacity: {
                  value: 0.6,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 2.5,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    size_min: 0.1,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "rgba(255, 255, 255, 0.5)",
                  opacity: 0.4,
                  width: 1.2,
                },
                move: {
                  enable: true,
                  speed: 0.8,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab",
                  },
                  onclick: {
                    enable: true,
                    mode: "push",
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 180,
                    line_linked: {
                      opacity: 0.7,
                    },
                  },
                  push: {
                    particles_nb: 4,
                  },
                },
              },
              retina_detect: true,
            });
          } else {
            // Use simpler configurations for other sections
            particlesJS(containerId);
          }
        } else {
          console.warn(`Container ${containerId} not found`);
        }
      });
      console.log("Particles initialization completed");
    } catch (error) {
      console.error("Error initializing particles:", error);
    }
  } else {
    console.error("particlesJS is not defined. Make sure the library is loaded.");

    // Try to load the particles.js library dynamically if it's not available
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.onload = function () {
      console.log("Particles.js loaded dynamically");
      setTimeout(initParticles, 100);
    };
    document.body.appendChild(script);
  }
}

// Initialize AOS animation library
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }
}

// Enhance form interactions
function enhanceFormInteraction() {
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );

  formInputs.forEach((input) => {
    // Add active class when input is focused
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("active");
    });

    // Remove active class when input is blurred, unless it has a value
    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("active");
      }
    });

    // Check if input already has value on page load
    if (input.value) {
      input.parentElement.classList.add("active");
    }
  });
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  // Check if we need to scroll to a section (if URL has hash)
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }, 300);
    }
  }

  // Set social media links
  const socialLinks = document.querySelectorAll(".social-links a");
  if (socialLinks.length > 0) {
    // Find LinkedIn icon and set link
    const linkedInLink = Array.from(socialLinks).find((link) =>
      link.querySelector("i.fab.fa-linkedin")
    );
    if (linkedInLink) {
      linkedInLink.href =
        "https://www.linkedin.com/in/mehdi-moulabbi-682968276/";
      linkedInLink.target = "_blank";
      linkedInLink.rel = "noopener noreferrer";
    }

    // Find GitHub icon and set link
    const githubLink = Array.from(socialLinks).find((link) =>
      link.querySelector("i.fab.fa-github")
    );
    if (githubLink) {
      githubLink.href = "https://github.com/M-MDI";
      githubLink.target = "_blank";
      githubLink.rel = "noopener noreferrer";
    }
  }

  // Initialize new features
  initParticles();
  initAOS();
  enhanceFormInteraction();

  // Add subtle parallax effect to hero section
  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.transform = `translate(${mouseX * -20}px, ${
        mouseY * -20
      }px)`;
    }
  });
});
