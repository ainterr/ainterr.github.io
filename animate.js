/*
Copyright (c) 2015 by Alex Interrante-Grant (http://ainterr.github.io) 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// CONFIGURATION OPTIONS
// The time in ms that the bring_in animation will take
var bring_in_speed = 750;
// The distance in pixels above the bottom of the screen at which we will bring
// in the next section
var scroll_buffer = 150;
// The time in ms that it will take to scroll to a given section
var scroll_time = 500;
// END CONFIGURATION OPTIONS

// A boolean to keep track of the position of the navbar
var navbar = 0;

// This function gives us the "slide in" effect
var bring_in = function(page, time) {
  $("."+page).animate({right: "0px"}, time, function() {
    $("."+page).children(".content").animate({opacity: "1"}, time);
  });
};

// This function scrolls to a given element with a bit of offset in a given time
var scroll_to = function(element, time, buffer) {
  $('html, body').animate({
    scrollTop: ((element === "home") ? 0 : $("."+element).offset().top)-buffer
  }, time);
};

var main = function() {
  // Call our D3 Scripts to populate the page
  skills();
  experience();
  projects(scroll_time);
  news();
	
  // Fade in the jumbotron and its background
  $(".jumbotron").animate({opacity: "1"}, 1000);
  $(".jumbotron-background").animate({opacity: "1"}, 1000);
	
  // Bring in the About Me section to start
  //bring_in("about_me", bring_in_speed);

  // Add click listeners to the menu items
  $("[name='home']").click(function(e) { e.preventDefault(); scroll_to("home", scroll_time, 30); });
  $("[name='projects']").click(function(e) { e.preventDefault(); scroll_to("projects", scroll_time, 30); });
  $("[name='about']").click(function(e) { e.preventDefault(); scroll_to("about_me", scroll_time, 30); });
  $("[name='news']").click(function(e) { e.preventDefault(); scroll_to("news", scroll_time, 20); });
  $("[name='resume']").click(function(e) { e.preventDefault(); scroll_to("resume", scroll_time, 30); });
  $("[name='contact']").click(function(e) { e.preventDefault(); scroll_to("contact", scroll_time, 30); });
};

$(document).ready(main);

// Add our scroll listener
$(window).scroll(function () {
  position = $(window).scrollTop();
  height = $(window).height();
  
  // Animate in sections
  if ($(".about_me").offset().top - position < height - scroll_buffer) bring_in("about_me", bring_in_speed);
  if ($(".projects").offset().top - position < height  - scroll_buffer) bring_in("projects", bring_in_speed);
  if ($(".news").offset().top - position < height  - scroll_buffer) bring_in("news", bring_in_speed);
  if ($(".resume").offset().top - position < height - scroll_buffer) bring_in("resume", bring_in_speed);
  // This section is different because we just want to know if they've reached the bottom of the page
  if (position + height > $(document).height() - 50) bring_in("contact", bring_in_speed);
  
  // Bring in and take out the navbar
  if (position > 50 && !navbar) { 
    $(".navbar").css("z-index","100");
	$(".navbar").animate({top: "0px", opacity:"1"}, 250); 
	navbar = !navbar; 
  }
  if (position < 50 && navbar) { 
    $(".navbar").animate({top: "-51px", opacity:"0"}, 250, function() {
      $(".navbar").css("z-index","-100");
	});
	navbar = !navbar; 
  }
});