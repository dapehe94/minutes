/* Navbar toggle */
$(document).ready(function() {
  $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });
});

/* Companies menu toggle
$(document).ready(function() {
  $(".menu-list").click(function() {
		$(".menucompanyitem").toggleClass("is-active");
  });
});
*/