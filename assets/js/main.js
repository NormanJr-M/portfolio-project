/* =====================================================
   Norman's Portfolio — JavaScript
   Written in a simple, beginner-friendly style.
   No frameworks, just plain JavaScript.
   ===================================================== */


/* -----------------------------------------------------
   1. SET THE CURRENT YEAR IN THE FOOTER
   Instead of typing "2026" by hand, we let JS fill it in.
----------------------------------------------------- */
var yearSpan = document.getElementById("year");
var currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;


/* -----------------------------------------------------
   2. MOBILE MENU (HAMBURGER BUTTON)
   Clicking the button shows/hides the nav menu.
----------------------------------------------------- */
var menuBtn = document.getElementById("menuBtn");
var navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
  // toggle() adds the class if it's missing, removes it if it's there
  navMenu.classList.toggle("open");
});

// Close the menu automatically when a link is clicked (nice on mobile)
var navLinks = document.querySelectorAll(".nav-link");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navMenu.classList.remove("open");
  });
}


/* -----------------------------------------------------
   3. ANIMATED NUMBER COUNTERS (in the hero stats)
   Counts up from 0 to the target number.
----------------------------------------------------- */
var counters = document.querySelectorAll(".counter");

function startCounter(counterElement) {
  var target = parseInt(counterElement.getAttribute("data-target"));
  var current = 0;

  // setInterval runs this function repeatedly, every 30 milliseconds
  var timer = setInterval(function () {
    current = current + 1;
    counterElement.textContent = current;

    // once we reach the target, stop the timer
    if (current >= target) {
      counterElement.textContent = target;
      clearInterval(timer);
    }
  }, 30);
}

// Keep track of whether we've already started the counters,
// so they don't restart every time the user scrolls.
var countersStarted = false;


/* -----------------------------------------------------
   4. SCROLL ANIMATIONS
   Adds the "fade-in" class to sections so CSS can animate them,
   then adds "show" once they're visible on screen.
----------------------------------------------------- */

// Add the fade-in class to every section when the page first loads
var animatedSections = document.querySelectorAll(".section, .hero");
animatedSections.forEach(function (section) {
  section.classList.add("fade-in");
});

// This function checks each element and reveals it if it's in view
function checkScroll() {
  animatedSections.forEach(function (section) {
    var sectionTop = section.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    // If the top of the section has scrolled into the visible area...
    if (sectionTop < windowHeight - 100) {
      section.classList.add("show");
    }
  });

  // Start the number counters once the hero stats are visible
  var statsBox = document.querySelector(".stats");
  if (statsBox && !countersStarted) {
    var statsTop = statsBox.getBoundingClientRect().top;
    if (statsTop < window.innerHeight - 50) {
      counters.forEach(startCounter);
      countersStarted = true;
    }
  }
}

// Run once on page load, then again every time the user scrolls
checkScroll();
window.addEventListener("scroll", checkScroll);


/* -----------------------------------------------------
   5. CONTACT FORM
   Basic validation + a fake "success" message.
   (There is no real backend here, so nothing is actually
   emailed — this just demonstrates the front-end behaviour.)
----------------------------------------------------- */
var contactForm = document.getElementById("contactForm");
var formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  // Stop the form from refreshing the page
  event.preventDefault();

  var nameValue = document.getElementById("name").value.trim();
  var emailValue = document.getElementById("email").value.trim();
  var messageValue = document.getElementById("message").value.trim();

  // Very simple checks - just enough to catch empty fields
  if (nameValue === "" || emailValue === "" || messageValue === "") {
    alert("Please fill in every field before sending.");
    return; // stop here, don't continue
  }

  // Simple check for an "@" symbol in the email
  if (emailValue.indexOf("@") === -1) {
    alert("Please enter a valid email address.");
    return;
  }

  // If we get here, everything looks fine
  formMessage.classList.remove("hidden");
  contactForm.reset();

  // Hide the success message again after 4 seconds
  setTimeout(function () {
    formMessage.classList.add("hidden");
  }, 4000);
});