$(document).ready(function() {

    const windowHeight = $(window).height() / 2;
    const content2Pos = $('.content2').position().top - windowHeight;
    const content3Pos = $('.content3').position().top - windowHeight;
    const content4Pos = $('.content4').position().top - windowHeight;
    const countingBoxPos = $('.counting-box').position().top - windowHeight;
    const content5Pos = $('.content5').position().top - windowHeight;
    const content6Pos = $('.content6').position().top - windowHeight;
    const FooterTopPos = $('.footer-top').position().top - windowHeight;

    let isContent2Animated = false;
    let isContent3Animated = false;
    let isContent4Animated = false;
    let isCountingBoxAnimated = false;
    let isContent5Animated = false;
    let isContent6Animated = false;
    let isFooterTopAnimated = false;

    $(document).scroll(function(event){

      let scrollPos = $(this).scrollTop();

      if (!isContent2Animated && scrollPos > content2Pos) {
        $('.content2').addClass('animated pulse');
        isContent2Animated = true;
      }
      if (!isContent3Animated && scrollPos > content3Pos) {
        $('.content3').addClass('animated pulse');
        isContent3Animated = true;
      }
      if (!isContent4Animated && scrollPos > content4Pos) {
        $('.content4').addClass('animated pulse');
        isContent4Animated = true;
      }
      if (!isCountingBoxAnimated && scrollPos > countingBoxPos) {
        $('.counting-box').addClass('animated flipInX');
        isCountingBoxAnimated =true;
      }
      if (!isContent5Animated && scrollPos > content5Pos) {
        $('.content5').addClass('animated pulse');
        isContent5Animated =true;
      }
      if (!isContent6Animated && scrollPos > content6Pos) {
        $('.content6').addClass('animated pulse');
        isContent6Animated =true;
      }
      if (!isFooterTopAnimated && scrollPos > FooterTopPos) {
        $('.footer-top').addClass('animated slideInRight');
        isFooterTopAnimated =true;
      }
    });

    $(document).scroll(function(event) {
      let s1 = $(this).scrollTop();
      let s2 = Math.abs($('.footer-top').position().top - $(window).height()/2);
        if( s1 > s2) {
          $('.footer-top').addClass('animated slideInRight');
        }
    });

    //scrollspy

    $("body").scrollspy({target:".navbar", offset: 50});

    // Add smooth scrolling on all links inside the navbar
    $("#collapsibleNavbar a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior

      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }  // End if
    });

    // Modal
    $("#modal-button").click(function(){
        $("#myModal").modal();
    });

    $("#modal-button2").click(function(){
      $("#myModal2").modal();
    });

    $("#submit").click(function(){
      validate();
    });
});

function validate() {
  let userEmail = $("#email").val();
  let isValidUserEmail = validateUserEmail(userEmail);

  let userPassword = $("#password").val();
  let isValidUserPassword = validateUSerPassword(userPassword);
}

function validateUserEmail(userEmail) {
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let userEmailError = $("#userEmailError");
      if (!filter.test(userEmail)) {
          userEmailError.text("Please enter a valid email id");
          return false;
      } else {
          userEmailError.text("");
          return true;
      }
}

function validateUSerPassword(userPassword) {
  let userPasswordError = $("#userPasswordError");
    if(userPassword === "") {
      userPasswordError.text("Please enter a valid password");
      return false;
    } else {
      userPasswordError.text("");
      return true;
    }
}
