(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {

        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
  
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });
    
    


    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
    });
    
    var form = document.getElementById('contactForm');
      if (!form) return;
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var submitBtn = form.querySelector('button[type="submit"]');
        var alertBox = document.getElementById('formAlert');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        alertBox.innerHTML = '';

        var data = new FormData(form);

        fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        }).then(function(response){
          if (response.ok) {
            form.reset();
            alertBox.innerHTML = '<div class="alert alert-success">Thank you! Your request has been sent.</div>';
          } else {
            return response.json().then(function(err){
              var msg = (err && err.errors) ? err.errors.map(function(i){return i.message}).join(', ') : 'Submission failed.';
              alertBox.innerHTML = '<div class="alert alert-danger">'+ msg +'</div>';
            });
          }
        }).catch(function(){
          alertBox.innerHTML = '<div class="alert alert-danger">Network error. Please try again later.</div>';
        }).finally(function(){
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Request';
        });
      });
})(jQuery);

// Initialize date and time pickers

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    const formAlert = document.getElementById('formAlert');
    
    // Show loading state
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    submitBtn.disabled = true;
    
    // Clear previous alerts
    formAlert.innerHTML = '';
    formAlert.className = 'alert mb-3';
    
    // Send form data
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'success') {
            formAlert.className = 'alert alert-success mb-3';
            formAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i>Message sent successfully! We will contact you soon.';
            form.reset();
        } else {
            formAlert.className = 'alert alert-danger mb-3';
            formAlert.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>Error: ${data}`;
        }
        
        // Scroll to alert
        formAlert.scrollIntoView({ behavior: 'smooth' });
        
        // Hide alert after 8 seconds
        setTimeout(() => {
            formAlert.innerHTML = '';
            formAlert.className = 'mb-3';
        }, 8000);
    })
    .catch(error => {
        formAlert.className = 'alert alert-danger mb-3';
        formAlert.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>Network error: ${error}`;
    })
    .finally(() => {
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
});