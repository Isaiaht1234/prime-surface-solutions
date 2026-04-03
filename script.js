
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', function () {
    alert("Thanks! We got your request and will reach out shortly.");
  });
}


document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Call clicked:', link.href);
  });
});

document.querySelectorAll('a[href^="sms:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Text clicked:', link.href);
  });
});


document.querySelectorAll('.slider').forEach(sliderContainer => {

  const slider = sliderContainer.querySelector('.slider-input');
  const afterImage = sliderContainer.querySelector('.after');
  const sliderLine = sliderContainer.querySelector('.slider-line');
  const handle = sliderContainer.querySelector('.slider-handle');

  function updateSlider(value) {
    const clamped = Math.max(0, Math.min(100, value));
    afterImage.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    sliderLine.style.left = clamped + "%";
    handle.style.left = clamped + "%";
    slider.value = clamped;
  }

  slider.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  let isDragging = false;

  sliderContainer.addEventListener('touchstart', () => {
    isDragging = true;
  });

  sliderContainer.addEventListener('touchend', () => {
    isDragging = false;
  });

  sliderContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const rect = sliderContainer.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const percentage = (touchX / rect.width) * 100;

    updateSlider(percentage);
  });

  updateSlider(slider.value);
});

const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

faders.forEach(el => observer.observe(el));

window.addEventListener('load', () => {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('show');
    }
  });
});