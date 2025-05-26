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

// Simpler particles initialization with direct configurations
function initParticles() {
  console.log("Initializing particles with direct method...");

  // Only proceed if particlesJS is available
  if (typeof particlesJS === "undefined") {
    console.error("particlesJS not found - adding it dynamically");

    // Add it dynamically
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    script.onload = function () {
      console.log("Particles.js loaded dynamically, now initializing...");
      setTimeout(setupParticles, 100);
    };
    document.head.appendChild(script);
    return;
  }

  setupParticles();
}

function setupParticles() {
  try {
    // Hero particles - most visible
    if (document.getElementById("particles-js-hero")) {
      particlesJS("particles-js-hero", {
        particles: {
          number: {
            value: 80,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.7, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
          },
        },
      });
      console.log("Hero particles initialized");
    }

    // Skills particles with tech colors
    if (document.getElementById("particles-js-skills")) {
      particlesJS("particles-js-skills", {
        particles: {
          number: { value: 40 },
          color: {
            value: ["#00ADD8", "#F7DF1E", "#E34F26", "#264DE4", "#61DAFB"],
          },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: 4 },
          line_linked: { enable: true, color: "#6faafe" },
          move: { enable: true, speed: 0.8 },
        },
      });
      console.log("Skills particles initialized");
    }

    // Simpler particles for other sections
    ["about", "projects", "contact"].forEach((section) => {
      const elementId = `particles-js-${section}`;
      if (document.getElementById(elementId)) {
        console.log(`Initializing ${elementId}`);
        particlesJS(elementId, {
          particles: {
            number: { value: 30 },
            color: { value: "#3a7bd5" },
            opacity: { value: 0.3 },
            size: { value: 2 },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#3a7bd5",
              opacity: 0.2,
            },
            move: { enable: true, speed: 0.6 },
          },
        });
      }
    });

    console.log("All particles initialized successfully");
  } catch (error) {
    console.error("Error in particles initialization:", error);
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

// Also add a backup initialization on window load
window.addEventListener("load", function () {
  console.log("Window fully loaded, checking particles");
  const particleContainers = document.querySelectorAll(".particles-container");
  if (particleContainers.length > 0) {
    console.log(`Found ${particleContainers.length} particle containers`);
    // Check if particles were initialized
    const canvases = document.querySelectorAll(".particles-container canvas");
    if (canvases.length === 0) {
      console.log("No particle canvases found, reinitializing");
      initParticles();
    }
  }
});
