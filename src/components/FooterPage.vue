<template>
  <footer class="footer-section bg-white border-top mt-auto">
    <div class="container-xl py-5">
      <div class="row gy-5">
        
        <div class="col-12 col-lg-4 text-center text-lg-start">
          <div class="brand-container mb-3">
            <img src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png" 
                 alt="Footer Logo" class="footer-logo">
            <span class="brand-text ms-2 fw-bold text-primary">NP NEWS</span>
          </div>
          <p class="text-muted small px-3 px-lg-0 footer-desc">
            NP News គឺជាគេហទំព័រផ្តល់ព័ត៌មានឈានមុខគេនៅកម្ពុជា ដែលផ្តល់ជូននូវព័ត៌មានទាន់ហេតុការណ៍ បច្ចេកវិទ្យា កីឡា និងការកម្សាន្ត ប្រកបដោយទំនុកចិត្ត និងវិជ្ជាជីវៈ។
          </p>
          <div class="d-flex justify-content-center justify-content-lg-start gap-2 mt-4">
            <a href="#" class="social-circle fb"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-circle ig"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-circle yt"><i class="bi bi-youtube"></i></a>
            <a href="#" class="social-circle tg"><i class="bi bi-telegram"></i></a>
          </div>
        </div>

        <div class="col-6 col-md-4 col-lg-2 offset-lg-1">
          <h6 class="footer-heading mb-4">ផ្នែកព័ត៌មាន</h6>
          <ul class="list-unstyled footer-links">
            <li v-for="item in menuItems" :key="item">
              <a href="#" @click.prevent="$emit('select-category', item)">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div class="col-6 col-md-4 col-lg-2">
          <h6 class="footer-heading mb-4">ទំនាក់ទំនង</h6>
          <ul class="list-unstyled footer-links contact-info">
            <li><a href="#"><i class="bi bi-geo-alt me-2 text-primary"></i> ភ្នំពេញ, កម្ពុជា</a></li>
            <li><a href="tel:+85512345678"><i class="bi bi-telephone me-2 text-primary"></i> 012 345 678</a></li>
            <li><a href="mailto:info@npnews.com"><i class="bi bi-envelope me-2 text-primary"></i> info@npnews.com</a></li>
            <li><a href="#"><i class="bi bi-info-circle me-2 text-primary"></i> អំពីយើង</a></li>
          </ul>
        </div>

        <div class="col-12 col-md-4 col-lg-3">
          <div class="newsletter-card p-4 rounded-4">
            <h6 class="footer-heading mb-3">ចុះឈ្មោះព្រឹត្តិបត្រ</h6>
            <p class="small text-muted mb-4">ទទួលបានព័ត៌មានថ្មីៗតាមរយៈអ៊ីមែល</p>
            <div class="newsletter-input-group shadow-sm">
              <input type="email" class="form-control border-0" placeholder="អ៊ីមែលរបស់អ្នក...">
              <button class="btn btn-primary btn-send" type="button">
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
            <div class="mt-3">
              <span class="badge bg-primary-subtle text-primary fw-normal">Daily Update</span>
            </div>
          </div>
        </div>

      </div>

      <div class="footer-bottom border-top mt-5 pt-4">
        <div class="row align-items-center gy-3 text-center text-md-start">
          <div class="col-md-6">
            <p class="copyright-text mb-0">© 2026 <strong>NP News</strong>. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="d-flex justify-content-center justify-content-md-end gap-4 text-muted fs-6 footer-icons">
              <span title="Security"><i class="bi bi-shield-check"></i></span>
              <span title="Global"><i class="bi bi-globe"></i></span>
              <span title="Privacy"><i class="bi bi-lock"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  defineProps({ 
    menuItems: {
      type: Array,
      default: () => ['ព័ត៌មានជាតិ', 'សេដ្ឋកិច្ច', 'បច្ចេកវិទ្យា', 'កីឡា', 'កម្សាន្ត']
    }
  });
  defineEmits(['select-category']);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&display=swap');

.footer-section {
  --primary-color: #0d6efd;
  --text-muted: #6c757d;
  --bg-light: #f8f9fa;
  
  width: 100%;
  background-color: #ffffff;
  font-family: 'Battambang', 'Khmer OS Battambong', sans-serif;
  line-height: 1.8;
}

/* Force Khmer font on all text elements */
.footer-section h6, 
.footer-section p, 
.footer-section a, 
.footer-section input, 
.footer-section button,
.footer-section span {
  font-family: 'Battambang', 'Khmer OS Battambong', sans-serif;
}

.brand-text {
  font-size: 1.25rem;
  letter-spacing: 1px;
}

.footer-logo {
  height: 45px;
  width: auto;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.footer-logo:hover {
  transform: rotate(5deg) scale(1.1);
}

.footer-desc {
  font-size: 0.9rem;
  max-width: 320px;
}

.footer-heading {
  font-weight: 700;
  color: #212529;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
}

.footer-heading::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 30px;
  height: 2px;
  background-color: var(--primary-color);
}

/* Links & Hover Effects */
.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  position: relative;
}

.footer-links a:hover {
  color: var(--primary-color);
  padding-left: 8px;
}

/* Social Icons */
.social-circle {
  width: 38px;
  height: 38px;
  border-radius: 10px; /* Squircle style */
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  color: #495057;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-circle:hover {
  color: white;
  transform: translateY(-3px);
  background-color: var(--primary-color);
}

/* Newsletter Card Refined */
.newsletter-card {
  background: #fdfdfd;
  border: 1px solid #f0f0f0;
}

.newsletter-input-group {
  display: flex;
  background: white;
  padding: 5px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.newsletter-input-group .form-control {
  background: transparent;
  padding-left: 15px;
}

.newsletter-input-group .form-control:focus {
  box-shadow: none;
}

.btn-send {
  border-radius: 8px !important;
  width: 45px;
  height: 40px;
  padding: 0;
}

/* Copyright Section */
.footer-bottom {
  border-color: #f1f1f1 !important;
}

.copyright-text {
  font-size: 0.85rem;
  color: #888;
}

.footer-icons i {
  transition: color 0.3s ease;
  cursor: help;
}

.footer-icons i:hover {
  color: var(--primary-color);
}

/* Mobile Adjustments */
@media (max-width: 991px) {
  .footer-heading::after {
    left: 50%;
    transform: translateX(-50%);
  }
  .footer-heading {
    text-align: center;
    display: block;
  }
  .footer-links {
    text-align: center;
  }
}
</style>