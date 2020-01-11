$(function() {

  $("#contactForm input").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
	  //var gender = $("input.gender:checked").val();	  
	  //see https://stackoverflow.com/questions/37811288/my-form-always-sends-the-first-option
	  var anrede = $("input.gender:checked").val();
      var vorname = $("input#vorname").val();
	  var nachname = $("input#nachname").val();
      var email = $("input#email").val();
	  var m_code = $("input#m_code").val();
      var firstName = vorname; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "https://www.schlaf-los.de/cosmos-indirekt.de.mailingliste.php",
        type: "POST",
        data: {
           anrede: anrede,
           vorname: vorname,
           nachname: nachname,
           email: email,
		   m_code: m_code		   
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            //.append("<strong>Hi " + firstName + ", Your message has been sent. </strong>");
			.append("<strong>Hallo " + firstName + "</strong>,<br><small>Ihre Newsletter-Anmeldung wurde erfolgreich übermittelt.<br>Jetzt müssen Sie Ihre Anmeldung nur noch bestätigen.<br>Eine E-Mail mit einem Link zur Bestätigung wird Ihnen gerade an diese Adresse<br><strong>" + email + "</strong> zugestellt</small>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success').append($("<strong>").text("Hallo " + firstName + ", Ihre Newsletter-Anmeldung wurde erfolgreich übermittelt! Jetzt müssen Sie Ihre Anmeldung nur noch bestätigen. Eine Mail mit einem Link zur Bestätigung wird Ihnen gerade zugestellt."));
          $('#success > .alert-success').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
