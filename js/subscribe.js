$("#contactForm__footer" ).submit(function( e ) {
  e.preventDefault();
    var email = $("input#email__footer").val();
    var theLanguage = $('html').attr('lang');
    $('#success__footer > p.text-danger').hide();
    $('#success__footer > .alert-danger').hide();
    $('#success__footer > .alert-success').hide();
    if( email && validateEmail(email) ) {

        $('#email__footer').blur();
        $.ajax({
                url: "https://i.aeron.aero/api/mail",
                type: "POST",
                data: {
                    email: email,
                    lang: theLanguage

                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success__footer > .alert-success').show();
                    $('#contactForm__footer').trigger("reset");

                },
                error: function() {
                    // Fail message
                    $('#success__footer > .alert-danger').show();
                },
            });


    } else {
        $('#success__footer > p.text-danger').show();
    }
});



$("#contactForm" ).submit(function( e ) {
  e.preventDefault();
    var email = $("input#email").val();
    var theLanguage = $('html').attr('lang');
    $('#success > p.text-danger').hide();
    $('#success > .alert-danger').hide();
    $('#success > .alert-success').hide();

    if( email && validateEmail(email) ) {
        $('#email').blur();
        $.ajax({
                url: "https://i.aeron.aero/api/mail",
                type: "POST",
                data: {
                    email: email,
                    lang: theLanguage

                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success > .alert-success').show();
                    $('#contactForm').trigger("reset");

                },
                error: function() {
                    // Fail message
                    $('#success > .alert-danger').show();
                },
            });


    } else {
        $('#success > p.text-danger').show();

    }
});


$( "#contactForm__presale" ).submit(function( e ) {

    e.preventDefault();
    var email = $("input#email").val();



    var AMOUNT = $("#AMOUNT").val();
    var DEPBTC = $("#DEPBTC").is(":checked") ? 1 : 0;
    var DEPETH = $("#DEPETH").is(":checked") ? 1 : 0;
    var PRESALE = $("#PRESALE").is(":checked") ? 1 : 0;
    var theLanguage = $('html').attr('lang');


    $('#error__email').hide();
    $('#error__server').hide();
    $('#success > .alert-success').hide();

if( email && validateEmail(email) ) {

        $('#email').blur();
        $.ajax({
                url: "https://i.aeron.aero/api/mail",
                type: "POST",
                data: {
                    email: email,
                    AMOUNT: AMOUNT,
                    DEPBTC: DEPBTC,
                    DEPETH: DEPETH,
                    PRESALE: PRESALE,
                    lang: theLanguage

                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success > .alert-success').show();
                    $('#contactForm__presale').trigger("reset");

                },
                error: function() {
                    // Fail message
                    $('#error__server').show();
                },
            });

    } else {
        $('#error__email').show();

    }




});


 function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}
