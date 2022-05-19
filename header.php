<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->
<nav class="navbar navbar-expand-lg d_fixed-top navbar-dark" aria-label="Main navigation">
   <div class="container-fluid">
      <a class="navbar-brand" href="index.php">
      <img src="assets/brand/ajara_logo_lg.png" class="img-fluid" alt="Ajara Hospital Logo Warangal">
      </a>
      <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation"  onclick="crossBars()">
      <span class="navbar-toggler-icon" id="togllerIcon"></span>
      </button>
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
         <ul class="navbar-nav mx-auto mb-lg-0">
            <!--
               <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="#">Home</a>
               </li>
               -->
            <li class="nav-item">
               <a class="nav-link active" href="#">About Us</a>
            </li>
             <li class="nav-item dropdown">
               <a class="nav-link dropdown-toggle" href="specialist.php" id="dropdown01" data-bs-toggle="dropdown">specialist</a>
               <ul class="dropdown-menu" aria-labelledby="dropdown01">
                  <li><a class="dropdown-item" href="Oncology.php">Oncology</a></li>
                  <li><a class="dropdown-item" href="Orthopedic.php">Orthopetic</a></li>
                  <li><a class="dropdown-item" href="medicine.php">Medicine</a></li>
                  <li><a class="dropdown-item" href="urology.php">Urology</a></li>
                  <li><a class="dropdown-item" href="Cardiology Non Invasive & Invasive.php">Cardiology Non Invasive & Invasive</a></li>
                  <li><a class="dropdown-item" href="Respiratory Medicine.php">Respiratory Medicine</a></li>
                  <li><a class="dropdown-item" href="Neurology & Neuro Surgery.php">Neurology & Neuro Surgery</a></li>
                  <li><a class="dropdown-item" href="Psychiatry.php">Psychiatry</a></li>
                  <li><a class="dropdown-item" href="Plastic Surgery.php">Plastic Surgery</a></li>
               </ul>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#">Super Specialities</a>
            </li>
            <li class="nav-item dropdown">
               <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Facilities</a>
               <ul class="dropdown-menu" aria-labelledby="dropdown01">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
               </ul>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#">Doctors</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#">Gallery</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#">Careers</a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#">Contact Us</a>
            </li>
         </ul>
         <div class="row">
            <div class="phonecon">
               <i class="fa-solid fa-phone"></i>
            </div>
            <div class="ambulancecon">
               <img src="assets/img/icons/ambulance_blue.png" class="img-fluid" alt="Ajara Hospital Warangal">
            </div>
            <div class="emergetxt">
               <ul>
                  <li>
                     <span>24/7 Emergency</span>
                  </li>
                  <li>
                     <a href="tel:0870 2959555">0870 2959555</a>,
                     <a href="tel:0870 2950555">2950555</a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </div>
</nav>
<script>
   function crossBars() {
      var element = document.getElementById("togllerIcon");
      element.classList.toggle("crossbar-toggler-icon");
   }
</script>