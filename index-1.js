
/* MOBILE HAMBURGER MENU */
const burgerBtn = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("open");
  mainNav.classList.toggle("open");
});

// close the mobile menu whenever a nav link is clicked
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burgerBtn.classList.remove("open");
    mainNav.classList.remove("open");
  });
});


/* MENU "MORE" BUTTON
  Shows/hides the extra dish cards in the menu section.*/
const moreBtn = document.getElementById("moreBtn");
const extraDishes = document.getElementById("extraDishes");

moreBtn.addEventListener("click", () => {
  extraDishes.classList.toggle("show");

  if (extraDishes.classList.contains("show")) {
    moreBtn.textContent = "Show Less −";
  } else {
    moreBtn.textContent = "More +";
  }
});


/* RESERVATION MODAL
  Both "RESERVE A TABLE" buttons open the same modal.*/
const reserveBtn1 = document.getElementById("reserveBtn1");   // header button
const reserveBtn2 = document.getElementById("reserveBtn2");   // banner button
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const reserveForm = document.getElementById("reserveForm");
const modalSuccess = document.getElementById("modalSuccess");
const resDateInput = document.getElementById("resDate");

function openModal() {
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden"; // stop background from scrolling
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

reserveBtn1.addEventListener("click", openModal);
reserveBtn2.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);

// close if the person clicks the dark area outside the modal box
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// close if the person presses the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("open")) {
    closeModal();
  }
});

// don't let people pick a date in the past
const today = new Date().toISOString().split("T")[0];
resDateInput.setAttribute("min", today);

// handle the reservation form submit
reserveForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from refreshing

  const name = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = resDateInput.value;
  const time = document.getElementById("resTime").value;
  const guests = document.getElementById("guests").value;

  // pre-order is optional, so just gather whichever boxes are checked
  const checkedDishes = document.querySelectorAll('input[name="preorder"]:checked');
  const preorderList = Array.from(checkedDishes).map((box) => box.value);

  if (!name || !phone || !date || !time) {
    modalSuccess.style.color = "#e07a5f";
    modalSuccess.textContent = "Please fill in every field before booking.";
    return;
  }

  // everything looks good — show a confirmation message
  modalSuccess.style.color = "#6fcf97";
  let message = `Thanks, ${name}! Your table for ${guests} on ${date} at ${time} is booked.`;

  if (preorderList.length > 0) {
    message += ` Pre-order: ${preorderList.join(", ")}.`;
  }

  modalSuccess.textContent = message;

  // clear the form, then close the modal after a short pause
  reserveForm.reset();
  setTimeout(() => {
    modalSuccess.textContent = "";
    closeModal();
  }, 2500);
});


/* TESTIMONIAL SLIDER*/
const testimonials = [
  {
    quote: `"The best dining experience I've ever had!"<br>"The food, service and ambience were absolutely perfect."`,
    name: "&ndash; Amara Ogbona",
    img: "imgs/profile-1.png"
  },
  {
    quote: `"Every dish felt handmade with care."<br>"Ember Royale is now our go-to spot for celebrations."`,
    name: "&ndash; Daniel Okafor",
    img: "imgs/profile-2.png"
  },
  {
    quote: `"Cozy atmosphere, incredible flavours."<br>"The ribeye steak alone is worth the visit."`,
    name: "&ndash; Avrav Malik",
    img: "imgs/profile-3.png"
  }
];

let currentTestimonial = 0;

const quoteEl = document.getElementById("testimonialQuote");
const nameEl = document.getElementById("testimonialName");
const imgEl = document.getElementById("testimonialImg");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");

function showTestimonial(index) {
  const t = testimonials[index];

  // small fade effect while the text swaps
  quoteEl.style.opacity = 0;

  setTimeout(() => {
    quoteEl.innerHTML = t.quote;
    nameEl.innerHTML = t.name;
    imgEl.src = t.img;
    quoteEl.style.opacity = 1;
  }, 200);
}

nextArrow.addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

prevArrow.addEventListener("click", () => {
  currentTestimonial =
    (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});


/* GALLERY LIGHTBOX
  Clicking a gallery photo shows it full-size. */
const galleryImages = document.querySelectorAll("#galleryGrid img");

// build the lightbox once and reuse it for every image
const lightbox = document.createElement("div");
lightbox.className = "lightbox-overlay";
lightbox.innerHTML = `
  <button class="lightbox-close">&times;</button>
  <img src="" alt="">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("open");
  }
});


/* STICKY HEADER SHADOW + ACTIVE NAV LINK ON SCROLL */
const header = document.querySelector("header");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // add a shadow to the header once the page has scrolled a bit
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
  } else {
    header.style.boxShadow = "none";
  }

  // highlight the nav link that matches the section currently in view
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // small offset for the sticky header
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
