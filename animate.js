// Some global vars
var jumbotron_height, about_me_height, projects_height, resume_height, scroll_buffer = -100;

var bring_in = function(page, time) {
	// This function animates in the given section
	$("."+page).animate({right: "0px"}, time, function() {
		$("."+page).children(".content").animate({opacity: "1"}, time);
	});
};

var scroll_to = function(element, time, buffer) {
  // This function scrolls to a given element with a bit of offset in a given time
	$('html, body').animate({
		scrollTop: ((element === "home") ? 0 : $("."+element).offset().top)-buffer
	}, time);
};

var main = function() {
	// Call our D3 Scripts to populate the page
  skills();
  experience();
	projects();
	
  // Bring in the About Me section
	bring_in("about_me", 750);

	var scroll_time = 250;
	// Add click listeners to the menu items
	$("[name='home']").click(function() { scroll_to("home", scroll_time, 30); });
	$("[name='about']").click(function() { scroll_to("about_me", scroll_time, 30); });
	$("[name='resume']").click(function() { scroll_to("resume", scroll_time, 30); });
	$("[name='contact']").click(function() { scroll_to("contact", scroll_time, 30); });
  // The project menu will be populated by D3
  
  // Calculate the section heights
	jumbotron_height = 340;
	about_me_height = $(".projects").offset().top - $(".about_me").offset().top;
	projects_height = $(".resume").offset().top - $(".projects").offset().top;
	resume_height = $(".contact").offset().top - $(".resume").offset().top;
};

$(document).ready(main);

// Add our scroll listener
$(window).scroll(function () {
	if ($(".projects").offset().top - $(window).scrollTop() < about_me_height + scroll_buffer) bring_in("projects", 750);
	if ($(".resume").offset().top - $(window).scrollTop() < projects_height + scroll_buffer) bring_in("resume", 750);
  // This section is different because we just want to know if they've reached the bottom of the page
	if ($(window).scrollTop() + $(window).height() == $(document).height()) bring_in("contact", 750);
});