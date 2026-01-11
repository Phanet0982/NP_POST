<template>
  <footer class="footer-section bg-white border-top mt-auto">
    <div class="container-xl py-5">
      <div class="row gy-5">
        
        <div class="col-12 col-lg-4 text-center text-lg-start">
          <img src="https://png.pngtree.com/png-vector/20220714/ourmid/pngtree-np-icon-vector-illustration-design-letter-monogram-alphabet-vector-png-image_37915324.png" 
               alt="Footer Logo" class="footer-logo mb-3">
          <p class="text-muted small px-3 px-lg-0">
            NP News គឺជាគេហទំព័រផ្តល់ព័ត៌មានឈានមុខគេនៅកម្ពុជា ដែលផ្តល់ជូននូវព័ត៌មានទាន់ហេតុការណ៍ បច្ចេកវិទ្យា កីឡា និងការកម្សាន្ត។
          </p>
          <div class="d-flex justify-content-center justify-content-lg-start gap-3 mt-4">
            <a href="#" class="social-circle fb"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-circle ig"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-circle yt"><i class="bi bi-youtube"></i></a>
            <a href="#" class="social-circle tg"><i class="bi bi-telegram"></i></a>
          </div>
        </div>

        <div class="col-6 col-md-3 col-lg-2 offset-lg-1">
          <h6 class="fw-bold mb-4 text-dark">ផ្នែកព័ត៌មាន</h6>
          <ul class="list-unstyled footer-links">
            <li v-for="item in menuItems" :key="item">
              <a href="#" @click.prevent="$emit('select-category', item)">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div class="col-6 col-md-3 col-lg-2">
          <h6 class="fw-bold mb-4 text-dark">ជំនួយ</h6>
          <ul class="list-unstyled footer-links">
            <li><a href="#">អំពីយើង</a></li>
            <li><a href="#">ពាណិជ្ជកម្ម</a></li>
            <li><a href="#">ឯកជនភាព</a></li>
            <li><a href="#">ទំនាក់ទំនង</a></li>
          </ul>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="newsletter-card p-4 rounded-4 bg-light">
            <h6 class="fw-bold mb-3 text-dark">ចុះឈ្មោះព្រឹត្តិបត្រ</h6>
            <p class="small text-muted mb-3">ទទួលបានព័ត៌មានថ្មីៗបំផុត</p>
            <div class="input-group flex-nowrap shadow-sm">
              <input type="email" class="form-control border-0 px-3" placeholder="Email...">
              <button class="btn btn-primary" type="button">
                <i class="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>

      </div>

      <div class="footer-bottom border-top mt-5 pt-4">
        <div class="row align-items-center gy-3 text-center text-md-start">
          <div class="col-md-6">
            <p class="text-muted small mb-0">© 2026 **NP News**. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="d-flex justify-content-center justify-content-md-end gap-3 text-muted fs-5">
              <i class="bi bi-shield-check"></i>
              <i class="bi bi-globe"></i>
              <i class="bi bi-credit-card"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({ menuItems: Array });
defineEmits(['select-category']);
</script>


<style scoped>
/* Layout & Container */
.footer-section {
  width: 100%;
  margin-top: auto;
  background-color: #ffffff;
  font-family: 'Inter', 'Hanuman', sans-serif; /* Recommended for Khmer/English mix */
}

.footer-logo {
  height: 50px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.05);
}

/* Links Styling */
.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #6c757d;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  display: inline-block;
}

.footer-links a:hover {
  color: #0d6efd; /* Bootstrap primary color */
  transform: translateX(5px);
}

/* Social Media Circles */
.social-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #495057;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid #eee;
}

.social-circle:hover {
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.social-circle.fb:hover { background-color: #3b5998; border-color: #3b5998; }
.social-circle.ig:hover { background-color: #e4405f; border-color: #e4405f; }
.social-circle.yt:hover { background-color: #cd201f; border-color: #cd201f; }
.social-circle.tg:hover { background-color: #0088cc; border-color: #0088cc; }

/* Newsletter Card */
.newsletter-card {
  border: 1px solid rgba(0,0,0,0.05);
  transition: box-shadow 0.3s ease;
}

.newsletter-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.newsletter-card .form-control:focus {
  box-shadow: none;
  background-color: #fff;
}

.newsletter-card .btn-primary {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
}

/* Footer Bottom */
.footer-bottom {
  border-color: #f1f1f1 !important;
}

.footer-bottom i {
  opacity: 0.6;
  transition: opacity 0.3s;
  cursor: pointer;
}

.footer-bottom i:hover {
  opacity: 1;
  color: #0d6efd;
}

/* Responsiveness Fixes */
@media (max-width: 768px) {
  .footer-links {
    text-align: center;
  }
  .footer-links li {
    margin-bottom: 8px;
  }
}
</style>


