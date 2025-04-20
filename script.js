//Nav Bar
document.addEventListener("DOMContentLoaded", function () {
  var menuIcon = document.getElementById("menuIcon");
  var menu = document.getElementById("navLinks");

  menuIcon.addEventListener("click", function () {
    menu.classList.toggle("nav-open");
    console.log(menu.classList);
    if (menu.classList.contains("nav-open")) {
      menuIcon.innerHTML = "&#10006;";
    } else {
      menuIcon.innerHTML = "&#9776;";
    }
  });
});





//Portfolio Category Open
document.addEventListener("DOMContentLoaded", function () {
  const filterItems = document.querySelectorAll(".portfolio-filters li");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterItems.forEach((filter) => {
    filter.addEventListener("click", function () {
      // Remove active class from all filters
      filterItems.forEach((item) => item.classList.remove("filter-active"));
      this.classList.add("filter-active");

      // Get selected filter value
      const filterValue = this.getAttribute("data-filter");

      // Loop over portfolio items and filter
      portfolioItems.forEach((item) => {
        if (
          filterValue === "*" ||
          item.classList.contains(filterValue.substring(1))
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});





//Image Open And Close
document.addEventListener("DOMContentLoaded", function () {
  // Get all portfolio items, modal elements and close button
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalClose = document.querySelector(".modal-close");

  // Loop over each portfolio item and attach a click event
  portfolioItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Get the image source from the clicked item
      const img = this.querySelector("img");
      if (img) {
        modalContent.src = img.src;
        // Display the modal by changing its display property
        modal.style.display = "block";
      }
    });
  });

  // Close the modal when the close icon is clicked
  modalClose.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Optionally, close the modal when clicking outside of the modal-content
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});



//View More Button
const loadMoreBtn = document.querySelector(".view-more-btn");
const hiddenItems = document.querySelectorAll(".portfolio-item.hidden");

loadMoreBtn.addEventListener("click", () => {
  hiddenItems.forEach((item) => {
    item.classList.remove("hidden");
  });
  loadMoreBtn.style.display = "none"; // Button ko hide kar do after loading
});






//Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  // List of selectors you want to animate (Added '.footer')
  const animatedElements = [
    ".android-hero h2",
    ".android-hero h1",
    ".android-tag",
    ".android-hero p",
    ".tech-stack",
    ".btn-android",
    ".section-title",
    ".about-content h2",
    ".about-content p",
    ".about-info",
    ".about-img",
    ".skills",
    ".service",
    ".job",
    ".portfolio-item",
    ".card",
    ".view-more-btn",
    ".contact-info",
    ".btn-cv",
    ".form-wrapper",
    ".contact",
    ".footer",
  ];

  // Define the different animation classes available.
  const animations = [
    "fade-up",
    "fade-left",
    "fade-right",
    "zoom-in",
    "rotate-in",
  ];

  // IntersectionObserver to trigger animations when elements become visible.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Choose a random animation class from the available animations.
          const randomAnimation =
            animations[Math.floor(Math.random() * animations.length)];
          entry.target.classList.add(randomAnimation);
          // Stop observing the element once it has animated.
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible.
      rootMargin: "0px 0px -50px 0px", // Adjust trigger point as needed.
    }
  );

  // Start observing each element in the list.
  animatedElements.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      observer.observe(element);
    });
  });
});





/* Improved Form Validation + EmailJS Integration */

// Initialize EmailJS (make sure you've included their SDK and called emailjs.init)
// emailjs.init('YOUR_USER_ID');

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // grab inputs
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  // grab error spans
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // reset errors
  [nameInput, emailInput, subjectInput, messageInput].forEach((el) =>
    el.classList.remove("invalid")
  );
  [nameError, emailError, subjectError, messageError].forEach(
    (span) => (span.textContent = "")
  );

  let valid = true;

  // validation rules
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    nameInput.classList.add("invalid");
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Please enter your email.";
    emailInput.classList.add("invalid");
    valid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.classList.add("invalid");
    valid = false;
  }

  if (subjectInput.value.trim() === "") {
    subjectError.textContent = "Subject cannot be empty.";
    subjectInput.classList.add("invalid");
    valid = false;
  }

  if (messageInput.value.trim() === "") {
    messageError.textContent = "Please enter a message.";
    messageInput.classList.add("invalid");
    valid = false;
  } else if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    messageInput.classList.add("invalid");
    valid = false;
  }

  if (!valid) return;

  // prepare params
  const params = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    subject: subjectInput.value.trim(),
    message: messageInput.value.trim(),
  };





  // send via EmailJS
  emailjs
    .send("service_6giizaw", "template_zcy7m6m", params)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      // clear all input fields on success
      nameInput.value = "";
      emailInput.value = "";
      subjectInput.value = "";
      messageInput.value = "";
      // optionally clear any lingering errors
      [nameError, emailError, subjectError, messageError].forEach(
        (span) => (span.textContent = "")
      );
      // show a simple success notification
      alert("Your message has been sent successfully!");
    })
    .catch((error) => {
      console.error("FAILED...", error);
      alert("Oops! Something went wrong. Please try again.");
    });
});
