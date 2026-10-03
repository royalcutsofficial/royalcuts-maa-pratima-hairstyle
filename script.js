/* ===== Data ===== */
const services = [
  { name: 'Classic Haircut', desc: 'Timeless scissor and clipper cut tailored to your face shape.', price: 250, time: '30 min' },
  { name: 'Fade Haircut', desc: 'Low, mid or high fade blended with razor-sharp precision.', price: 300, time: '40 min' },
  { name: 'Beard Trim', desc: 'Shaped, lined and softened with hot towel and beard oil.', price: 150, time: '20 min' },
  { name: 'Hair + Beard', desc: 'The full combo — haircut plus a complete beard grooming.', price: 450, time: '50 min' },
  { name: 'Hair Styling', desc: 'Professional styling with premium wax, clay or pomade.', price: 200, time: '25 min' },
  { name: 'Kids Haircut', desc: 'Gentle, patient cuts for the little gentlemen (under 12).', price: 180, time: '25 min' },
  { name: 'Premium Shave', desc: 'Traditional straight-razor shave with hot towel and balm.', price: 200, time: '30 min' },
  { name: 'Head Massage', desc: 'Relaxing oil massage to relieve stress and boost circulation.', price: 150, time: '20 min' }
];

const galleryItems = [
  ['haircuts', 'g1'], ['beard', 'g2'], ['styling', 'g3'], ['shop', 'g4'],
  ['haircuts', 'g5'], ['events', 'g6'], ['beard', 'g7'], ['styling', 'g8'],
  ['shop', 'g9'], ['haircuts', 'g10'], ['events', 'g11'], ['beard', 'g12']
];

const reviews = [
  { name: 'Arjun Mehta', date: 'Sep 2026', text: 'Amazing haircut and excellent service! Best fade I have had in years.' },
  { name: 'Sourav Ghosh', date: 'Aug 2026', text: 'Clean shop, friendly barbers and a really relaxing beard trim. Highly recommended.' },
  { name: 'Rohit Sharma', date: 'Jul 2026', text: 'Booked via WhatsApp, no waiting at all. The premium grooming package is worth every rupee.' }
];

/* ===== Render: services ===== */
document.getElementById('servicesGrid').innerHTML = services.map((s, i) => `
  <div class="col-sm-6 col-lg-3 reveal">
    <div class="service-card">
      <div class="service-img"><img src="https://picsum.photos/seed/service${i}/500/340" alt="${s.name}" loading="lazy"></div>
      <div class="service-body">
        <h5>${s.name}</h5>
        <p>${s.desc}</p>
        <div class="service-meta"><span class="price">₹${s.price}</span><span><i class="bi bi-clock"></i> ${s.time}</span></div>
        <a href="https://wa.me/919876543210?text=${encodeURIComponent('Hi, I want to book: ' + s.name)}" target="_blank" rel="noopener" class="btn btn-gold w-100">Book Now</a>
      </div>
    </div>
  </div>`).join('');

/* ===== Render: gallery ===== */
document.getElementById('galleryGrid').innerHTML = galleryItems.map(([cat, seed]) => `
  <div class="col-6 col-md-4 col-lg-3 gallery-item" data-cat="${cat}">
    <div class="gallery-box" data-full="https://picsum.photos/seed/${seed}/1200/900">
      <img src="https://picsum.photos/seed/${seed}/500/500" alt="${cat}" loading="lazy">
    </div>
  </div>`).join('');

/* ===== Render: reviews ===== */
document.getElementById('reviewsGrid').innerHTML = reviews.map((r, i) => `
  <div class="col-md-6 col-lg-4 reveal">
    <div class="review-card">
      <div class="stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
      <p>“${r.text}”</p>
      <div class="reviewer">
        <img src="https://picsum.photos/seed/customer${i}/100/100" alt="${r.name}" loading="lazy">
        <div><strong>${r.name}</strong><small>${r.date}</small></div>
      </div>
    </div>
  </div>`).join('');

/* ===== Navbar: sticky style + active link + close on click ===== */
const nav = document.getElementById('mainNav');
const toTop = document.getElementById('toTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...navLinks].map(l => document.querySelector(l.getAttribute('href')));

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  toTop.classList.toggle('show', window.scrollY > 500);
  const y = window.scrollY + 120;
  sections.forEach((sec, i) => {
    if (sec && sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[i].classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll);
onScroll();

navLinks.forEach(l => l.addEventListener('click', () => {
  const menu = document.getElementById('navMenu');
  if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== Hero typed text ===== */
const words = ['Fresh Fades.', 'Clean Shaves.', 'Premium Style.'];
let w = 0, c = 0, del = false;
const typed = document.getElementById('typed');
(function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1500); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 50 : 110);
})();

/* ===== Reveal on scroll ===== */
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  revealObs.observe(el);
});

/* ===== Animated counters ===== */
const counterObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n;
      if (n >= target) clearInterval(t);
    }, 30);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

/* ===== Gallery filter + lightbox ===== */
document.getElementById('galleryFilters').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  document.querySelectorAll('#galleryFilters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.classList.toggle('hide', f !== 'all' && item.dataset.cat !== f);
  });
});

const lightbox = new bootstrap.Modal('#lightbox');
document.getElementById('galleryGrid').addEventListener('click', e => {
  const box = e.target.closest('.gallery-box');
  if (!box) return;
  document.getElementById('lightboxImg').src = box.dataset.full;
  lightbox.show();
});

/* ===== Video modal ===== */
const videoModalEl = document.getElementById('videoModal');
const videoModal = new bootstrap.Modal(videoModalEl);
const frame = document.getElementById('videoFrame');
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    frame.src = card.dataset.video + '?autoplay=1&rel=0';
    videoModal.show();
  });
});
videoModalEl.addEventListener('hidden.bs.modal', () => { frame.src = ''; });

/* ===== Before / After sliders ===== */
document.querySelectorAll('.ba-slider').forEach(slider => {
  const range = slider.querySelector('.ba-range');
  const beforeImg = slider.querySelector('.ba-before');
  const update = () => {
    slider.style.setProperty('--pos', range.value + '%');
    // keep the "before" image full-width regardless of the clip width
    beforeImg.style.width = slider.offsetWidth + 'px';
  };
  range.addEventListener('input', update);
  window.addEventListener('resize', update);
  update();
});



/* ==========================================
   CONTACT FORM - FORM SUBMIT
========================================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        // Check form validation
        if (!contactForm.checkValidity()) {

            e.stopPropagation();

            contactForm.classList.add("was-validated");

            return;
        }

        contactForm.classList.add("was-validated");

        // Submit button
        const submitBtn = contactForm.querySelector(
            "button[type='submit']"
        );

        // Loading state
        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Sending...
        `;

        // Get form data
        const formData = new FormData(contactForm);

        try {

            // Send form to FormSubmit
            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                // Success message
                formStatus.innerHTML = `
                    <div class="alert alert-success">
                        <i class="bi bi-check-circle me-2"></i>
                        Thank you! Your message has been sent successfully.
                    </div>
                `;

                // Reset form
                contactForm.reset();

                // Remove validation
                contactForm.classList.remove("was-validated");

            } else {

                // Error message
                formStatus.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="bi bi-exclamation-circle me-2"></i>
                        Something went wrong. Please try again.
                    </div>
                `;

            }

        } catch (error) {

            console.error("Form Error:", error);

            formStatus.innerHTML = `
                <div class="alert alert-danger">
                    <i class="bi bi-wifi-off me-2"></i>
                    Network error. Please check your internet connection.
                </div>
            `;

        }

        // Restore button
        submitBtn.disabled = false;

        submitBtn.innerHTML = `
            <i class="bi bi-send me-2"></i>
            Send Message
        `;

    });

}

/* ===== Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear();