var skills = function() {
  // This will populate our skill data
  // Skill Data
  var skills = [
  { "name":"Python", "description":"Python is my go-to language for quick scripts, file conversions, data parsing, or anything that has a short turnover time. It's an essential tool for my everyday work." },
  { "name":"C and C++", "description":"I took classes in C and C++ in high school and college and have used it in numerous projects and activities." },
  { "name":"Java", "description":"Java was one of the first languages I learned and I've used it in a couple of projects. I also became much more familiar with Java in my work at Sandia writing Android apps." },
  { "name":"Web Development", "description":"I have a side interest in web development and have done it as a part-time job in the past. I'm pretty comfortable with HTML5, CSS3, Javascript, PHP, jQuery, Bootstrap, and D3.js." },
  { "name":"Bash (scripting)", "description":"I hate doing the same work twice. I'm a big fan of automation and scripting for just about anything repetitive." },
  { "name":"Ruby", "description":"I contributed to <a href='https://github.com/ccss-sandia/antfarm' target='_blank'>ANTFARM</a> - a network mapping solution developed by Sandia written in Ruby with Active Record." },
  { "name":"Network Administration", "description":"I'm the team captain of Northeastern's <a href='http://www.nationalccdc.org/' target='_blank'>CCDC</a> team. If you're not familiar with the CCDC, it's a competition where a team of eight students is dropped into a small business network environment and is actively targeted by a professional red team. Teams are scored on service availability, mitigation of red team activity, and response to business injects." }
  ];
  
  var enter = d3.select(".skills .skill-list").selectAll("li").data(skills).enter();
  var lis = enter.append("li").html(function(d) { return d.name+" - "+d.description; });
};

var experience = function() {
  // This will populate our experience data
  // Experience Data
  var experience = [
  { "date":"January 2015 - Present", "company":"Raytheon IDS", "description":"Researched and deployed the Host Based Security System (HBSS) on DoD owned Raytheon systems. Hardened systems to comply with their respective Security Technical Implementation Guides (STIGs)." },
  { "date":"April 2014 - December 2014", "company":"The New Mexico Center for family Policy/Values", "description":"Acted as lead webmaster and migrated old website from static HTML to dynamic PHP implementing jQuery, AJAX, and CSS3." },
  { "date":"April 2014 - August 2014", "company":"Sandia National Laboratories", "description":"Contributed to Sandia's <a href='https://github.com/ccss-sandia/antfarm' target='_blank'>ANTFARM</a>. Identified network traffic fingerprints for various Android advertising frameworks. Worked with a team of cyber security professionals in a high-performance computing lab constructing virtual networks using KVM and OVS and presenting findings to multi-million dollar customers." },
  { "date":"October 2013 - April 2014", "company":"Sridhar NeuroDot Lab", "description":"Work with post-doc students to develop firmware for Arduino-based, minimal contact neural imaging device. Helped implement Bluetooth 4.0 for wireless communication from sensor to python-based GUI." },
  { "date":"June 2012 - September 2013", "company":"Sandia National Laboratories", "description":"Implemented a number open source tools to demonstrate the interception and decryption of GSM (2G) cellphone calls using publicly available rainbow tables. <a href='http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=6735818&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D6735818' target='_blank'>Published in MILCOM 2013</a>." }
  ];
  
  var enter = d3.select(".experience .experience-list").selectAll("tr").data(experience).enter();
  var trs = enter.append("tr")
  trs.append("td").text(function(d) { return d.date; });
  trs.append("td").html(function(d) { return d.company; });
  trs.append("td").html(function(d) { return d.description; });
};

var projects = function() {
  // This will populate our project data
  // Project Data
	var projects = [
	{ "date":"Spring 2015", "name":"This Site (Bootstrap, jQuery, and D3.js)", "short":"thissite", "description":"Web development is a hobby of mine and holds a special place in my heart since my first experience with programming was in a WebDev class in high school. After spending lots of time developing web pages for other people part time I decided it was finally time to write a personal page. I used <a href='http://getbootstrap.com/' target='_blank'>Bootstrap</a> for the styles and cross-browser compatability, <a href='https://jquery.com/' target='_blank'>jQuery</a> for the animations, and <a href='http://d3js.org/' target='_blank'>D3.js</a> to make my project section extensible.", "link":"https://github.com/ainterr/ainterr.github.io" },
	{ "date":"Fall 2014", "name":"WiiMote Controlled Robotic Arm (FPGA and C++)", "short":"arm", "description":"The first really interesting class I took at Northeastern was <a href='http://www.northeastern.edu/esl/content/embedded-des-enabling-robotics-fall-2014' target='_blank'>Embedded Design Enabling Robotics</a>. It was an introduction into C++ and FPGA programming through the use of a <a href='http://zedboard.org/' target='_blank'>ZedBoard</a>. The class was designed around a project - control a servo-powered robotic arm using an WiiMote. We developed FPGA designs in Simulink for pulse width modulation to control the individual servo motors and C++ to gather input from the WiiMote via memory-mapped I/O.", "link":"http://www.youtube.com/watch?v=OV6TqJquSAU" },
	{ "date":"Spring 2014", "name":"Image Processing Coin Counter (C++)", "short":"coin", "description":"In my freshman year of college I took an introductory C++ class that was required for all Electrical and Computer Engineering majors. Since I had taken a C++ programming class in high school I caught on quickly and soon asked my professor (Dr. Tadmor) for some extra work. Professor Tadmor told me he had a collection of pictures of coins sitting on a table. He challenged me to write a program to count the amount of change in each the pictures reliably. After a lot of work I came up with a program that successfully worked with a majority of the pictures he gave me by comparing the relative diameters of the coins using <a href='http://opencv.org/' target='_blank'>OpenCV</a> along with some computer vision algorithms I created myself for edge detection.", "link":"https://github.com/ainterr/CoinCounter" },
	{ "date":"Fall 2013", "name":"5x5x5 LED Cube (Arduino and Hardware)", "short":"cube", "description":"In my freshman year at Northeastern I was required to take a lot of introductory level engineering, math, and science classes. I decided I needed something to keep my skills sharp while I satisfied requirements for more interesting classes so I bought a couple hundred LEDs, some multiplexor ICs, and an <a href='http://arduino.cc/en/main/arduinoBoardUno' target='_blank'>Arduino Uno</a>. After hours of soldering, the result was a 5x5x5 LED cube that I could program in C++.", "link":"https://youtu.be/PA8yM02Kvf8" },
	{ "date":"Spring 2012", "name":"WAV File Visualizer (Java)", "short":"wav", "description":"Back in High School in one of my first programming classes I was given free rein to work on a project of my choosing in Java. I decided I wanted to make a visualizer for audio files. I had no idea that something so seemingly simple could be so difficult... After half a semester exploring fourier series, java optimization, and file formats I came up with a working visualization tool that uses a Fast Fourier Transform (FFT) to depict the frequency domain for single channel WAV files in near real time.", "link":"https://github.com/ainterr/AudioViz" }
	];

  // Append the Divs
	var enter = d3.select(".projects .content .col-md-12").selectAll("div")
		.data(projects).enter();
	var divs = enter.append("div");
	divs.attr("class", function(d) { return "project col-md-4 "+d.short; });
  // Add the image
  imgs = divs.append("img").attr({ "class":"img-circle project-pic", "width":"200", "height":"200"});
  imgs.attr("src", function(d) { return "img/"+d.short+".png"; });
  imgs.attr("alt", function(d) { return d.short; });  
	divs.append("h3").text(function(d) { return d.name+" - "+d.date; });
  // Add the check it out button
  //<a href="https://drive.google.com/open?id=0B8o9ECRWDu2CbG9Pb2ZwSlV0VGM&authuser=0" target="_blank"><button type="button" class="btn btn-success btn-contact">Download my Resume</button></a>
  divs.append("p").html(function(d) { return d.description; });
  divs.append("div")
    .attr("class","project-btn")
    .html(function(d) { return ' <a href="'+d.link+'" target="_blank"><button type="button" class="btn btn-success btn-contact">Check it out &gt&gt</button></a>'; 
    });
	
  // Append the menu items
	enter = d3.select(".dropdown-menu").selectAll("li")
		.data(projects).enter();
	lis = enter.append("li");
	as = lis.append("a").text(function(d) { return d.name; });
	as.attr("href", function(d) { return "#"+d.short; });
	as.attr("name", function(d) { return d.short; });
  
  var scroll_time = 250;
  as.on("click",function(d) { scroll_to(d.short, scroll_time, 65); });
};