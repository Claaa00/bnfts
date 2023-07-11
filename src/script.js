$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $("header").addClass("scrolled-bg");
    } else {
      $("header").removeClass("scrolled-bg");
    }
  });

  var scrollPosition = localStorage.getItem("scrollPosition");

  if (scrollPosition && parseInt(scrollPosition) > 0) {
    $("header").addClass("scrolled-bg");
  } else {
    $("header").removeClass("scrolled-bg");
  }

  $(window).scroll(function () {
    localStorage.setItem("scrollPosition", $(window).scrollTop());
  });

  function updateActiveLink() {
    var scrollPosition = $(window).scrollTop();
    var windowHeight = $(window).height();
    var headerHeight = $("header").outerHeight();
    var footerTop = $("footer").offset().top - headerHeight;
    var footerHeight = $("footer").outerHeight();

    $("header a").removeClass("active");

    $("main section, footer").each(function () {
      var sectionId = $(this).attr("id");
      var sectionTop = $(this).offset().top - headerHeight;
      var sectionBottom = sectionTop + $(this).outerHeight();

      if (
        (scrollPosition >= sectionTop && scrollPosition < sectionBottom) ||
        (scrollPosition + windowHeight >= footerTop + footerHeight &&
          sectionId === "contact")
      ) {
        $('header a[href="#' + sectionId + '"]').addClass("active");

        if (sectionId === "about") {
          $('header a[href="#home"]').removeClass("active");
        } else if (sectionId !== "insights") {
          $('header a[href="#insights"]').removeClass("active");
        }
      } else {
        $('header a[href="#' + sectionId + '"]').removeClass("active");
      }
    });
  }

  updateActiveLink();

  $(window).scroll(updateActiveLink);

$('a[href^="#"]').click(function (e) {
  e.preventDefault();

  var headerHeight = $("header").outerHeight();
  var target = $($.attr(this, "href"));
  var offsetTop = target.offset().top - headerHeight;

  var scrollAdjustment = -10; 
  offsetTop -= scrollAdjustment;

  $("html, body").animate({ scrollTop: offsetTop }, "slow", function () {
    updateActiveLink(); 
  });
});


var closeToggle = $("#close-toggle");
var menuToggle = $("#menu-toggle");
var menuContent = $("#menu-content");

menuContent.addClass("hidden");

menuToggle.click(function() {
  if (menuContent.hasClass("hidden")) {
    menuContent.removeClass("hidden");
    menuToggle.addClass("hidden");
    closeToggle.removeClass("hidden");
  } else {
    menuContent.addClass("hidden");
    menuToggle.removeClass("hidden");
    closeToggle.addClass("hidden");
  }
});

closeToggle.click(function() {
  if (menuContent.hasClass("hidden")) {
    menuContent.removeClass("hidden");
    menuToggle.addClass("hidden");
    closeToggle.removeClass("hidden");
  } else {
    menuContent.addClass("hidden");
    menuToggle.removeClass("hidden");
    closeToggle.addClass("hidden");
  }
});

$(document).click(function(event) {
  if (
    !menuContent.is(event.target) &&
    !menuToggle.is(event.target) &&
    !closeToggle.is(event.target) &&
    menuContent.has(event.target).length === 0
  ) {
    menuContent.addClass("hidden");
    menuToggle.removeClass("hidden");
    closeToggle.addClass("hidden");
  }
});

$("#newsletter-form").validate({
  rules: {
    fName: "required",
    lName: "required",
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    fName: "Please enter your first name",
    lName: "Please enter your last name",
    email: {
      required: "Please enter your email address",
      email: "Please enter a valid email address"
    }
  },
  highlight: function(element) {
    $(element).css("border-color", "#EF4444");
    $(element).addClass("border-red-500");
  },
  unhighlight: function(element) {
    $(element).css("border-color", "");
    $(element).removeClass("border-red-500");
  },
  errorElement: "p",
  errorClass: "text-red-700",
  submitHandler: function(form) {
    $(form).find(":submit").prop("disabled", true).text("Subscribed");
  
    var successMessage = $("<div>")
      .addClass("success-message flex items-center rounded-lg py-3 px-6 sm:gap-28 gap-6 shadow-lg font-semibold text-234E8F bg-66ECBC")
      .append(
        $("<p>")
          .text("Successfully subscribed!")
      )
      .append(
        $("<button>")
          .addClass("close-button p-2")
          .text("x")
          .click(function() {
            $(this).closest(".overlay").fadeOut("fast", function() {
              $(this).remove();
            });
          })
      );
  
    var overlay = $("<div>").addClass("overlay").append(successMessage);
  
    $("body").append(overlay);
  
    setTimeout(function() {
      overlay.fadeOut("fast", function() {
        $(this).remove();
      });
    }, 5000);
  }
  
  
});


});

