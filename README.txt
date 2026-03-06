  =>  Template Name    : GPSNYBUILDERS - Construction Company Website Template Free

  =>  Template Link    : https://htmlcodex.com/construction-company-website-template-free

  =>  Template License : https://htmlcodex.com/license (or read the LICENSE.txt file)

  =>  Template Author  : HTML Codex

  =>  Author Website   : https://htmlcodex.com

  =>  About HTML Codex : HTML Codex is one of the top creators and publishers of Free HTML templates, HTML landing pages, HTML email templates and HTML snippets in the world. Read more at ( https://htmlcodex.com/about-us )

  // ...existing code...
                    <form id="contactForm" action="https://formspree.io/f/yourFormId" method="POST">
                        <div id="formAlert" class="mb-3"></div>
                        <div class="row g-3">
                            <div class="col-12 col-sm-6">
                                <input name="name" type="text" class="form-control border-0" placeholder="Your Name" style="height: 55px;" required>
                            </div>
                            <div class="col-12 col-sm-6">
                                <input name="email" type="email" class="form-control border-0" placeholder="Your Email" style="height: 55px;" required>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="date" id="date" data-target-input="nearest">
                                    <input name="date" type="text"
                                        class="form-control border-0 datetimepicker-input"
                                        placeholder="Call Back Date" data-target="#date" data-toggle="datetimepicker" style="height: 55px;">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="time" id="time" data-target-input="nearest">
                                    <input name="time" type="text"
                                        class="form-control border-0 datetimepicker-input"
                                        placeholder="Call Back Time" data-target="#time" data-toggle="datetimepicker" style="height: 55px;">
                                </div>
                            </div>
                            <div class="col-12">
                                <textarea name="message" class="form-control border-0" rows="5" placeholder="Message" required></textarea>
                            </div>
                            <input type="hidden" name="_subject" value="Website contact request">
                            <div class="col-12">
                                <button class="btn btn-primary w-100 py-3" type="submit">Submit Request</button>
                            </div>
                        </div>
                    </form>
// ...existing code...
    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/tempusdominus/js/moment.min.js"></script>
    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>
    <script src="lib/isotope/isotope.pkgd.min.js"></script>
    <script src="lib/lightbox/js/lightbox.min.js"></script>

    <script>
    // Contact form submit via Fetch to Formspree (or any POST endpoint)
    (function(){
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
    })();
    </script>

    <!-- Template Javascript -->
    <script src="js/main.js"></script>
// ...existing code...