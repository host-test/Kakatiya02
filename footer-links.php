<script src="assets/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/dist/js/offcanvas.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="assets/dist/js/multislider/multislider.js"></script>
<script>
   $('#basicSlider').multislider({
   			continuous: true,
   			duration: 5000
   		});
   		$('#mixedSlider').multislider({
   			duration: 750,
   			interval: 3000
   		});
</script>

<!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> -->


<script src="assets/dist/js/multislider/multislider.js"></script>

<script>
	$('#mixedSlider').multislider({
		duration: 750,
		interval: 3000
	});
</script>

<script src="assets/dist/js/multislider/durableslider.js"></script>
<script>
$('#scrollimage').durableslider({
	slidesToShow:7,
	slidesToScroll: 1,
	autoplay:false,
	centerMode: true,
	fade: true,
	focusOnSelect: true,
	duration:1000,
	interval:0
});
</script>