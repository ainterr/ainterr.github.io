var jumbotron_height, about_me_height, projects_height, resume_height, scroll_buffer = 200;

var bring_in = function(page, time) {
	// Animate in the given page
	$("."+page).animate({right: "0px"}, time, function() {
		$("."+page).children(".content").animate({opacity: "1"}, time);
	});
};

var scroll_to = function(element, time, buffer) {
	$('html, body').animate({
		scrollTop: ((element === "home") ? 0 : $("."+element).offset().top)-buffer
	}, time);
};

var main = function() {
	// Call our D3 Script
	projects()
	
	bring_in("about_me", 750);

	var scroll_time = 250;
	// Add the click listeners
	$("[name='home']").click(function() { scroll_to("home", scroll_time, 30); });
	$("[name='about']").click(function() { scroll_to("about_me", scroll_time, 30); });
	$("[name='resume']").click(function() { scroll_to("resume", scroll_time, 30); });
	$("[name='contact']").click(function() { scroll_to("contact", scroll_time, 30); });
	
	
	$("[name='wav']").click(function() { scroll_to("wav", scroll_time, 65); });
	$("[name='coin']").click(function() { scroll_to("coin", scroll_time, 65); });
	$("[name='arm']").click(function() { scroll_to("arm", scroll_time, 65); });
	$("[name='cube']").click(function() { scroll_to("cube", scroll_time, 65); });
	$("[name='ovskvm']").click(function() { scroll_to("ovskvm", scroll_time, 65); });
	$("[name='thissite']").click(function() { scroll_to("thissite", scroll_time, 65); });

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
	if ($(".contact").offset().top - $(window).scrollTop() < resume_height + scroll_buffer) bring_in("contact", 750);
});