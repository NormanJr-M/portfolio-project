"use strict";

// ---------------------------------------------------------
// GRAB THE ELEMENTS NEEDED FROM THE PAGE
// ---------------------------------------------------------
const track = document.getElementById("track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsWrap = document.getElementById("dots");
const navWrap = document.getElementById("topnav");

const panels = Array.from(track.querySelectorAll(".panel"));

const ariaLabels = ["Air / Home", "Water / About", "Earth / Skills", "Fire / Experience", "Energy / Contact"];
const navLabels = ["Home", "About", "Skills", "Experience", "Contact"];

let currentIndex = 0;

// ---------------------------------------------------------
// BUILD THE DOTS AND THE TOP NAV LINKS
// ---------------------------------------------------------

const dots = panels.map(function (panel, i) {
  const dot = document.createElement("button"); // create a new <button> element
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", "Go to " + ariaLabels[i]);

  // When this dot is clicked, jump to panel number i.
  dot.addEventListener("click", function () {
    goToPanel(i);
  });

  dotsWrap.appendChild(dot); // actually insert it into the page
  return dot;
});

const navButtons = panels.map(function (panel, i) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = navLabels[i];

  button.addEventListener("click", function () {
    goToPanel(i);
  });

  navWrap.appendChild(button);
  return button;
});

// ---------------------------------------------------------
// THE CORE FUNCTION: MOVE TO A GIVEN PANEL
// ---------------------------------------------------------
function goToPanel(targetIndex) {
  currentIndex = Math.max(0, Math.min(panels.length - 1, targetIndex));

  const percentToShift = currentIndex * 20;
  track.style.transform = "translateX(-" + percentToShift + "%)";

  // Loop over every panel and update its classes/attributes.
  panels.forEach(function (panel, i) {
    const isActive = i === currentIndex;
    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });

  // Same idea for the dots — only the current one gets "is-active".
  dots.forEach(function (dot, i) {
    dot.classList.toggle("is-active", i === currentIndex);
  });

  // And the top nav buttons.
  navButtons.forEach(function (button, i) {
    button.classList.toggle("is-active", i === currentIndex);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === panels.length - 1;

  const activePanelStyles = getComputedStyle(panels[currentIndex]);
  document.documentElement.style.setProperty("--arrow-fg", activePanelStyles.getPropertyValue("--fg"));
  document.documentElement.style.setProperty("--arrow-accent", activePanelStyles.getPropertyValue("--accent"));
}

function goNext() { goToPanel(currentIndex + 1); }
function goPrev() { goToPanel(currentIndex - 1); }

// ---------------------------------------------------------
// WIRE UP THE ARROW BUTTONS
// ---------------------------------------------------------
nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

// ---------------------------------------------------------
// KEYBOARD SUPPORT
// ---------------------------------------------------------
document.addEventListener("keydown", function (event) {
  const typingInField = event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA";
  if (typingInField) return;

  if (event.key === "ArrowRight") goNext();
  if (event.key === "ArrowLeft") goPrev();
  if (event.key === "Home") goToPanel(0);
  if (event.key === "End") goToPanel(panels.length - 1);
});

// ---------------------------------------------------------
// 6. SWIPE SUPPORT (touchscreens / mobile)
// ---------------------------------------------------------
let touchStartX = 0;
let touchStartY = 0;

track.addEventListener("touchstart", function (event) {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

track.addEventListener("touchend", function (event) {
  const touch = event.changedTouches[0];
  const distanceX = touch.clientX - touchStartX;
  const distanceY = touch.clientY - touchStartY;
  const SWIPE_THRESHOLD = 55; // must move at least this many pixels to count as a swipe

  const wasHorizontalSwipe = Math.abs(distanceX) > SWIPE_THRESHOLD && Math.abs(distanceX) > Math.abs(distanceY);
  if (!wasHorizontalSwipe) return; // ignore small movements or vertical scrolling

  if (distanceX < 0) { goNext(); } else { goPrev(); }
});

document.querySelectorAll("[data-goto]").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault(); // stop the link from trying to navigate to "#fire"
    const targetIndex = parseInt(element.dataset.goto, 10);
    goToPanel(targetIndex);
  });
});

// ---------------------------------------------------------
// CONTACT FORM (front-end only — no email is actually sent)
// ---------------------------------------------------------
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading, which is the browser's default behavior

  if (!form.checkValidity()) {
    status.textContent = "Please complete every field before sending.";
    return;
  }

  status.textContent = "Message sent — I'll reply shortly.";
  form.reset(); // clears the input fields
});

goToPanel(0);
