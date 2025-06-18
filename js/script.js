const backToTop = document.getElementById("back-to-top");

// Toggle mobile menu
function toggleMobileNavigation() {
  const mobileNavigation = document.getElementById("mobile-sidenav");
  mobileNavigation.classList.toggle("mobile-links-active");
}

// Scroll to top
function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Show/hide back-to-top button
function scroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}
window.onscroll = function () {
  scroll();
};

// Testimonials Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Optional: auto-advance slides every 8 sec
setInterval(function () {
  plusSlides(1);
}, 8000);
