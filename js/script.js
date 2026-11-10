

// ==========================================
// HEROLD LOGISTICS SOLUTIONS
// JAVASCRIPT
// ==========================================


// ==========================================
// 1. IMAGE SLIDESHOW
// ==========================================

const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");

let currentSlide = 0;
let slideshowTimer;

function showSlide(index) {

    if (!slides.length || !indicators.length) return;

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    indicators.forEach(indicator => {
        indicator.classList.remove("active-indicator");
    });

    slides[index].classList.add("active");
    indicators[index].classList.add("active-indicator");

    currentSlide = index;
}

function nextSlide() {

    let next = (currentSlide + 1) % slides.length;
    showSlide(next);

}

function startSlideshow() {

    if (slides.length > 0 && indicators.length > 0) {
        clearInterval(slideshowTimer);
        slideshowTimer = setInterval(nextSlide, 6000);
    }

}

indicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {

        showSlide(index);
        startSlideshow();

    });

});

startSlideshow();


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const menuIsOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute("aria-expanded", menuIsOpen);

    });

    // Close mobile menu after clicking a link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    // Close menu when screen is resized to desktop

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


// ==========================================
// 3. AUTOMATIC COPYRIGHT YEAR
// ==========================================

const copyrightYear = document.getElementById("current-year");

if (copyrightYear) {

    copyrightYear.textContent = new Date().getFullYear();

}


// ==========================================
// 4. AUTO-HIDE NAVIGATION ON SCROLL
// ==========================================

const header = document.querySelector(".header");

let lastScrollPosition = window.scrollY;
let scrollThreshold = 10;

window.addEventListener("scroll", () => {

    const currentScrollPosition = window.scrollY;

    // Always show header at the top

    if (currentScrollPosition <= 80) {

        header.classList.remove("header-hidden");

    }

    // Scrolling down: hide header

    else if (currentScrollPosition > lastScrollPosition + scrollThreshold) {

        header.classList.add("header-hidden");

        if (navLinks && menuToggle) {

            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");

        }

    }

    // Scrolling up: show header

    else if (currentScrollPosition < lastScrollPosition - scrollThreshold) {

        header.classList.remove("header-hidden");

    }

    lastScrollPosition = currentScrollPosition;

}, { passive: true });


// Show header when mouse reaches top of screen

document.addEventListener("mousemove", (event) => {

    if (event.clientY <= 15 && header) {

        header.classList.remove("header-hidden");

    }

});


// ==========================================
// 5. ACTIVE NAVIGATION SECTION HIGHLIGHTING
// ==========================================

const pageSections = document.querySelectorAll("#home, #about, #services, #operations, #why-herold, #contact");

const navigationLinks = document.querySelectorAll(".nav-links a");

function setActiveLink(sectionId) {

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {

            link.classList.add("active");

        }

    });

}


// Observe sections as visitors scroll

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            setActiveLink(entry.target.id);

        }

    });

}, {

    root: null,
    rootMargin: "-30% 0px -50% 0px",
    threshold: 0

});

pageSections.forEach(section => {

    sectionObserver.observe(section);

});


// Update active link immediately when clicked

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        const targetSection = link.getAttribute("href");

        if (targetSection && targetSection.startsWith("#")) {

            setActiveLink(targetSection.substring(1));

        }

    });

});


// ==========================================
// 6. OPERATIONS SCROLL REVEAL
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(element => {

    revealObserver.observe(element);

});




// ==========================================
// 7. CONTACT FORM VALIDATION & SUCCESS POPUP
// ==========================================

const contactForm = document.getElementById("contact-form");

const successPopup = document.getElementById("success-popup");

const successClose = document.getElementById("success-close");

const successMessage = document.getElementById("success-message");

const submitButton = document.querySelector(".contact-submit-button");


// ==========================================
// FORM VALIDATION
// ==========================================

if (contactForm) {

    const requiredFields = contactForm.querySelectorAll("[required]");

    function clearFieldError(field) {

        field.classList.remove("invalid");

        const errorMessage = field.parentElement.querySelector(".field-error");

        if (errorMessage) {
            errorMessage.remove();
        }

    }

    function validateForm() {

        let firstInvalidField = null;

        requiredFields.forEach(field => {

            clearFieldError(field);

            if (!field.value.trim() || !field.checkValidity()) {

                field.classList.add("invalid");

                const error = document.createElement("small");
                error.className = "field-error";

                if (!field.value.trim()) {
                    error.textContent = "Please complete this field.";
                } else {
                    error.textContent = "Please enter a valid value.";
                }

                field.parentElement.appendChild(error);

                if (!firstInvalidField) {
                    firstInvalidField = field;
                }

            }

        });

        if (firstInvalidField) {

            firstInvalidField.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            setTimeout(() => {
                firstInvalidField.focus();
            }, 400);

            return false;

        }

        return true;

    }


    // Remove red highlight as customer types

    requiredFields.forEach(field => {

        field.addEventListener("input", () => {

            if (field.value.trim() && field.checkValidity()) {
                clearFieldError(field);
            }

        });

        field.addEventListener("change", () => {

            if (field.value.trim() && field.checkValidity()) {
                clearFieldError(field);
            }

        });

    });


    // ==========================================
    // CONTACT FORM SUCCESS POPUP
    // ==========================================

    if (successPopup) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            // Validate before processing

            if (!validateForm()) return;

            // Prevent multiple submissions

            if (submitButton && submitButton.disabled) return;

            // Get selected enquiry type

            const enquiryType = document.getElementById("enquiry-type").value;

            // Disable button while processing

            if (submitButton) {

                submitButton.disabled = true;

                const buttonText = submitButton.querySelector("span");

                if (buttonText) {
                    buttonText.textContent = "Processing Enquiry...";
                }

            }

            // Simulate processing delay

            setTimeout(() => {

                // Personalised confirmation message

                if (enquiryType === "Invoice Enquiry") {

                    successMessage.textContent =
                        "Your invoice enquiry has been completed successfully. Thank you for contacting Herold Logistics Solutions.";

                }

                else if (enquiryType === "Request a Quotation") {

                    successMessage.textContent =
                        "Thank you for requesting a quotation. We appreciate your interest in Herold Logistics Solutions.";

                }

                else {

                    successMessage.textContent =
                        "Your enquiry has been completed successfully. Thank you for choosing Herold Logistics Solutions.";

                }

                // Show popup

                successPopup.inert = false;
                successPopup.setAttribute("aria-hidden", "false");
                successPopup.classList.add("show");

                if (successClose) {
                    successClose.focus();
                }

                // Reset form

                contactForm.reset();

                // Restore button

                if (submitButton) {

                    submitButton.disabled = false;

                    const buttonText = submitButton.querySelector("span");

                    if (buttonText) {
                        buttonText.textContent = "Send Enquiry";
                    }

                }

            }, 1500);

        });

    }

}


// ==========================================
// CLOSE SUCCESS POPUP
// ==========================================

function closeSuccessPopup() {

    if (!successPopup) return;

    successPopup.classList.remove("show");

    successPopup.setAttribute("aria-hidden", "true");
    successPopup.inert = true;

}


// Close using button

if (successClose) {

    successClose.addEventListener("click", closeSuccessPopup);

}


// Close by clicking outside popup

if (successPopup) {

    successPopup.addEventListener("click", (event) => {

        if (event.target === successPopup) {

            closeSuccessPopup();

        }

    });

}


// Close using Escape key

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        successPopup &&
        successPopup.classList.contains("show")
    ) {

        closeSuccessPopup();

    }

});
