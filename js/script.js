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

// Initialize EmailJS
function initEmailJS() {
  // Use values from config file if available
  const userId =
    typeof EMAIL_CONFIG !== "undefined"
      ? EMAIL_CONFIG.USER_ID
      : "YOUR_DEFAULT_USER_ID";
  emailjs.init(userId);
  console.log("EmailJS initialized");
}

// Form submission handler with EmailJS
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Update UI to show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Get form data
    const formData = {
      name: this.querySelector("#name").value,
      email: this.querySelector("#email").value,
      message: this.querySelector("#message").value,
    };

    // Send email using EmailJS
    const serviceId =
      typeof EMAIL_CONFIG !== "undefined"
        ? EMAIL_CONFIG.SERVICE_ID
        : "default_service";
    const templateId =
      typeof EMAIL_CONFIG !== "undefined"
        ? EMAIL_CONFIG.TEMPLATE_ID
        : "template_id";

    emailjs
      .send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      })
      .then(() => {
        // Success message
        submitBtn.textContent = "Message Sent!";

        // Show success notification
        const notification = document.createElement("div");
        notification.className = "email-notification success";
        notification.innerHTML =
          '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
          notification.classList.add("fade-out");
          setTimeout(() => document.body.removeChild(notification), 500);
        }, 5000);

        // Reset form
        setTimeout(() => {
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      })
      .catch((error) => {
        // Error handling
        console.error("Email sending failed:", error);
        submitBtn.textContent = "Failed to Send";

        // Show error notification
        const notification = document.createElement("div");
        notification.className = "email-notification error";
        notification.innerHTML =
          '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again later.';
        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
          notification.classList.add("fade-out");
          setTimeout(() => document.body.removeChild(notification), 500);
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 5000);
      });
  });
}

// Particles initialization with direct configurations
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

// Navigate to previous/next image in gallery - Fixed to ensure proper operation
function navigateGallery(projectCard, direction) {
  const thumbnails = Array.from(projectCard.querySelectorAll(".thumbnail"));
  if (thumbnails.length <= 1) return;

  // Find current active thumbnail index
  let currentIndex = thumbnails.findIndex((thumb) =>
    thumb.classList.contains("active")
  );
  if (currentIndex === -1) currentIndex = 0;

  // Calculate new index based on direction
  let newIndex;
  if (direction === "next") {
    newIndex = (currentIndex + 1) % thumbnails.length;
  } else {
    newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  }

  // Change to the new image
  changeProjectImage(thumbnails[newIndex], newIndex);

  // For debugging
  console.log(`Navigated to image ${newIndex + 1}`);
}

// Improved image switcher with better transitions
function changeProjectImage(thumbnailElement, imageIndex) {
  // Find the parent project card
  const projectCard = thumbnailElement.closest(".project-card");

  // Get all thumbnails and main image in this card
  const thumbnails = Array.from(projectCard.querySelectorAll(".thumbnail"));
  const mainImage = projectCard.querySelector(".main-image img");

  if (!mainImage) return;

  // Update active state on thumbnails
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));
  thumbnailElement.classList.add("active");

  // Get the index
  const index = parseInt(thumbnailElement.getAttribute("data-index") || 0);

  // Update slide counter if it exists
  const counter = projectCard.querySelector(".current-slide");
  if (counter) {
    counter.textContent = (index + 1).toString();
  }

  // Update main image with fade effect
  mainImage.style.opacity = "0";

  setTimeout(() => {
    mainImage.src = thumbnailElement.src;
    mainImage.style.opacity = "1";
  }, 300);

  // Reset the slideshow timer when manually changing images
  resetSlideshowTimer(projectCard);
}

// Separate function to reset slideshow timer for better reliability
function resetSlideshowTimer(projectCard) {
  if (projectCard.slideshowInterval) {
    clearInterval(projectCard.slideshowInterval);
    projectCard.slideshowInterval = null;
  }
  startSlideshow(projectCard);
}

// Completely rewritten slideshow function for reliability
function startSlideshow(projectCard) {
  const thumbnails = Array.from(projectCard.querySelectorAll(".thumbnail"));
  if (thumbnails.length <= 1) return;

  // Don't start a new slideshow if one is already running
  if (projectCard.slideshowInterval) return;

  // Create slideshow interval
  projectCard.slideshowInterval = setInterval(() => {
    // Get current active thumbnail
    let currentIndex = thumbnails.findIndex((thumb) =>
      thumb.classList.contains("active")
    );
    if (currentIndex === -1) currentIndex = 0;

    // Move to next image
    const nextIndex = (currentIndex + 1) % thumbnails.length;

    // Change the image without resetting the timer (to avoid infinite loop)
    const nextThumbnail = thumbnails[nextIndex];

    // Update thumbnail active states
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    nextThumbnail.classList.add("active");

    // Update main image
    const mainImage = projectCard.querySelector(".main-image img");
    if (mainImage) {
      mainImage.style.opacity = "0";
      setTimeout(() => {
        mainImage.src = nextThumbnail.src;
        mainImage.style.opacity = "1";
      }, 300);
    }

    // Update counter
    const counter = projectCard.querySelector(".current-slide");
    if (counter) counter.textContent = (nextIndex + 1).toString();

    console.log(`Auto-switched to image ${nextIndex + 1}`);
  }, 5000);

  console.log(`Slideshow started with ${thumbnails.length} images`);
}

// Improved initialization for galleries
function initProjectSlideshows() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const gallery = card.querySelector(".project-gallery");
    if (!gallery) return;

    const thumbnails = Array.from(gallery.querySelectorAll(".thumbnail"));
    if (thumbnails.length === 0) return;

    // Ensure data-index attributes are set correctly
    thumbnails.forEach((thumb, idx) => {
      thumb.setAttribute("data-index", idx.toString());

      // Clean up any existing listeners first (best practice)
      thumb.removeEventListener("click", handleThumbnailClick);

      // Add new click handler
      thumb.addEventListener("click", handleThumbnailClick);
    });

    // Set first image as active
    const mainImage = gallery.querySelector(".main-image img");
    if (mainImage) {
      mainImage.src = thumbnails[0].src;
      mainImage.style.opacity = "1";
      thumbnails[0].classList.add("active");
    }

    // Setup slide counter
    const counter = gallery.querySelector(".current-slide");
    const total = gallery.querySelector(".total-slides");
    if (counter && total) {
      counter.textContent = "1";
      total.textContent = thumbnails.length.toString();
    }

    // Ensure clean start
    if (card.slideshowInterval) {
      clearInterval(card.slideshowInterval);
      card.slideshowInterval = null;
    }

    // Start slideshow
    startSlideshow(card);

    // Add hover event handlers
    gallery.addEventListener("mouseenter", () => {
      if (card.slideshowInterval) {
        clearInterval(card.slideshowInterval);
        card.slideshowInterval = null;
      }
    });

    gallery.addEventListener("mouseleave", () => {
      if (!card.slideshowInterval) {
        startSlideshow(card);
      }
    });
  });
}

// Handler function for thumbnail clicks
function handleThumbnailClick(event) {
  event.preventDefault();
  const thumbnail = event.currentTarget;
  const index = parseInt(thumbnail.getAttribute("data-index"));
  changeProjectImage(thumbnail, index);
}

// Initialize navigation buttons with stronger event handling
function initGalleryNavigation() {
  // First remove any existing handlers to avoid duplicates
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.replaceWith(btn.cloneNode(true));
  });

  // Add fresh event handlers
  document.querySelectorAll(".prev-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event bubbling
      const card = button.closest(".project-card");
      navigateGallery(card, "prev");
      console.log("Previous button clicked");
    });
  });

  document.querySelectorAll(".next-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event bubbling
      const card = button.closest(".project-card");
      navigateGallery(card, "next");
      console.log("Next button clicked");
    });
  });
}

// Initialize on page load - Modified to ensure proper gallery setup
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

  // Initialize features
  initEmailJS();
  initParticles();
  initAOS();
  enhanceFormInteraction();
  
  // Make sure all slideshows are cleared and restarted
  document.querySelectorAll(".project-card").forEach(card => {
    if (card.slideshowInterval) {
      clearInterval(card.slideshowInterval);
      card.slideshowInterval = null;
    }
  });
  
  // Initialize with reliable sequence
  console.log("Setting up gallery navigation");
  initGalleryNavigation();
  
  console.log("Setting up project slideshows");
  initProjectSlideshows();
  
  // Add subtle parallax effect to hero section
  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.transform = `translate3d(${mouseX * -30}px, ${
        mouseY * -30
      }px, ${mouseY * 40}px) rotateX(${mouseY * 5}deg) rotateY(${
        mouseX * -5
      }deg)`;
    }
  });

  // Add enhanced project interactions
  enhanceProjectCards();
});

// Initialize 3D effects
function init3DEffects() {
  // Initialize vanilla-tilt on skill cards only (not project cards)
  if (typeof VanillaTilt !== "undefined") {
    // Apply tilt effect to skill cards only
    VanillaTilt.init(document.querySelectorAll(".skill-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.03,
    });
    
    console.log("3D tilt effects initialized for skill cards");
  }
}

// Enhanced project interactions without 3D
function enhanceProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card) => {
    // Add hover state class for more control
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
    
    // Optimize image loading
    const img = card.querySelector('img:not(.thumbnail)');
    if (img) {
      img.loading = 'lazy';
    }
  });
}

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
