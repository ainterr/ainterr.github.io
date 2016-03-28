/*
Copyright (c) 2015 by Alex Interrante-Grant (http://ainterr.github.io) 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var skills = function () {
// This function will generate our skills virtualization
// Skills Data
	var data = [ 
	{ text:"Python", size:100, description:"Python is my go-to language for quick scripts, file conversions, data parsing, or anything that has a short turnover time. It's an essential tool for my everyday work. I'm also very comfortable with robust web frameworks written in python like Django and Flask." },
	{ text:"C/C++", size:80, description:"I took classes in C and C++ in high school and college and have used it in numerous projects and activities." },
	{ text:"Java", size:60, description:"Java was one of the first languages I learned and I've used it in a couple of projects. I also became much more familiar with Java in my work at Sandia writing Android apps." },
	{ text:"Web Dev", size:55, description:"I have a side interest in web development and have done it as a part-time job in the past. I'm pretty comfortable with HTML5, CSS3, Javascript, PHP, <a href='https://jquery.com/' target='_blank'>jQuery</a>, <a href='http://getbootstrap.com/' target='_blank'>Bootstrap</a>, and <a href='http://d3js.org/' target='_blank'>D3.js</a>." },
	{ text:"Bash", size:35, description:"I hate doing the same work twice. I'm a big fan of automation and scripting for just about anything repetitive." },
	{ text:"Ruby", size:20, description:"I contributed to <a href='https://github.com/ccss-sandia/antfarm' target='_blank'>ANTFARM</a> - a network mapping solution developed by Sandia written in Ruby with Active Record." },
	{ text:"System Admin", size:60, description:"I'm the team captain of Northeastern's <a href='http://www.nationalccdc.org/' target='_blank'>CCDC</a> team. If you're not familiar with the CCDC, it's a competition where a team of eight students is dropped into a small business network environment and is actively targeted by a professional red team. Teams are scored on service availability, mitigation of red team activity, and response to business injects." },
	{ text:"Virtualization", size:70, description:"In my time with Northeastern's <a href='http://www.nationalccdc.org/' target='_blank'>CCDC</a> team, I've had a lot of experience with <a href='http://www.vmware.com/' target='_blank'>VMware</a> and <a href='http://aws.amazon.com/' target='_blank'>AWS</a>. From setting up labs to simulating competiton environments almost all of our practice is virtualized. I also worked in a high performance virtualization lab at Sandia where we used <a href='http://openvswitch.org/' target='_blank'>OVS</a> and <a href='http://www.linux-kvm.org/page/Main_Page' target='_blank'>KVM</a> to host very large networks for testing purposes." },
	{ text:"Powershell", size:20, description:"" },
	{ text:"jQuery", size:20, description:"" },
	{ text:"D3.js", size:30, description:"" },
	{ text:"OpenCV", size:20, description:"" },
	{ text:"Git", size:25, description:"" },
	{ text:"HTML", size:20, description:"" },
	{ text:"CSS", size:20, description:"" },
	];

	// Color palette - some colors from the site with weighted frequency so 
	// randomization is a bit more aesthetically pleasing
	var color_palette = [
	"333333", "333333", "333333", "333333", "333333",
	"999966", "999966", "999966", "999966",
	"963100", "963100", "963100",
	"5cb85c", "5cb85c",
	"CC0000",
	"FF9900"
	];

	// Some parameters for changing the size of the visualization
	var style = {
	width: document.body.clientWidth < 800+160 ? document.body.clientWidth-.25*document.body.clientWidth : 800,
	height: 400
	};

	// Create the fill object
	var fill = d3.scale.category20();

	// Create the word cloud object with our data
	d3.layout.cloud().size([style.width, style.height])
		.words(data)
		.padding(5)
		// Allow rotation angles from -90 to 90  in 12 degree increments
		.rotate(function() { return ~~(Math.random() * 15) * 12 - 90; })
		.font("Impact")
		// Set our weighted size
		.fontSize(function(d) { return d.size; })
		.on("end", draw)
		.start();

	function draw(words) {
	// This function draws the words on the page
	div = d3.select(".skills").append("div");
	div.attr("class", "word-cloud")
		.style("position", "relative")
		.style("margin", "0 auto");
		
	svg = div.append("svg")
		.attr("width", style.width)
		.attr("height", style.height)
    .attr("viewBox", "0 0 "+style.width+" "+style.height)
    .style("width", "100%")
    .style("height", style.height);

	text = svg.append("g")
		.attr("transform", "translate("+style.width/2+","+style.height/2+")")
		.selectAll("text").data(words).enter()
		.append("text");

	// Generate the words
	text.style("font-size", function(d) { return d.size + "px"; })
		// Random color from the color palette
		.style("fill", function(d) { return "#"+color_palette[~~(Math.random() * color_palette.length)]; })
		.style("font-family", "Impact")
		.style("opacity", 0)
		.attr("text-anchor", "middle")
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) { return d.text; });

	// This lets us create clickable words with descriptions
	text.style("cursor", function(d) {
			if (d.description) return "pointer";
			else return "default";
		})
		.on("click", function(d) {
			if (!d.description) return;
			
			// Create a clickout box so we can leave the description
			clickout = svg.append("rect")
				.attr("width", style.width)
				.attr("height", style.height)
				.style("opacity", 0)
				.on("click", function(d) {
					text.transition()
						.duration(250)
						.style("opacity", 1)
						.each("end", function() { clickout.remove(); });
						popup.remove();
				});
			
			// Add the description popup
			popup = div.append("p")
				.attr("class", "skills-desc")
				.style("opacity", 0)
				.style("width", "80%")
				.html(d.description);
				
			text.transition()
				.duration(250)
				.style("opacity", .2);
				
			popup.transition()
				.duration(250)
				.style("opacity", 1);
		});

	// Add the transition effects
	text.transition()
		.duration(function(d) { return (~~(Math.random() * 7) + 1) * 200; })
		.style("opacity", 1)
		.each("end", function(d) {
			d3.select(this).on("mouseenter", function(d) {
				if (!d.description) return;
				d3.select(this).transition()
					.duration(100)
					.style("font-size", d.size+4);
			})
			.on("mouseout", function(d) {
				if (!d.description) return;
				d3.select(this).transition()
					.duration(100)
					.style("font-size", d.size);
			});
		});
	}
}

var experience = function() {
var data = [
{ "company":"MIT Lincoln Laboratory", "start_date": new Date(2016, 1, 1), "end_date": new Date(), "description":"Worked with a small development team to create a distrubuted malware analysis platform based on Lincoln Lab's R&D 100 Award winning <a href='https://github.com/moyix/panda' target='_blank'>PANDA</a> technology using a distributed task queue (<a href='http://www.celeryproject.org/' target='_blank'>Celery</a>) and <a href='http://www.celeryproject.org/' target='_blank'>Django</a>.", "color":"#003767"},
{ "company":"Sandia National Laboratories" , "start_date": new Date(2015, 5, 1), "end_date": new Date(2015, 12, 31), "description": "Developed analytics capabilities using Splunk in a high-performance virtualization lab focused on automated adversary detection and network migration. Visualized many aspects of a network (nodes, connectivity, processes execution, data transfer) in one, near real time web-based application.", "color":"#003366"},
{ "company":"Raytheon IDS", "start_date": new Date(2015, 0, 1), "end_date": new Date(2015, 5, 1), "description":"Developed a deployment plan for the Host Based Security System across DoD owned, Raytheon administered networks including a custom windows installation image. Hardened systems to comply with Security Technical Implementation Guides (STIGs).", "color":"#ce1126"},
{ "company":"New Mexico Center for Family Policy/Values", "start_date": new Date(2014, 3, 1), "end_date": new Date(2014, 11, 1), "description":"Acted as lead webmaster and migrated an old, static HTML website to dynamic PHP implementing <a href='https://jquery.com/' target='_blank'>jQuery</a>, AJAX, and CSS3. Reported directly to the Executive Director and developed new pages for events, anouncements, and information delivering on-time results.", "color":"#FFFF00"},
{ "company":"Sandia National Laboratories", "start_date": new Date(2014, 3, 1), "end_date": new Date(2014, 6, 1), "description":"Contributed to Sandia's <a href='https://github.com/ccss-sandia/antfarm' target='_blank'>ANTFARM</a>. Identified network traffic fingerprints for various Android advertising frameworks. Worked with a team of cyber security professionals in a high-performance computing lab designing, constructing, and testing large virtual networks.", "color":"#003366"},
{ "company":"Sridhar NeuroDot Lab", "start_date": new Date(2013, 9, 1), "end_date": new Date(2014, 3, 1), "description":"Worked with post-doc student to develop firmware for Arduino-based, minimal-contact, low-power neural imaging device. Helped implement Bluetooth 4.0 for wireless communication from sensor to python-based GUI on a linux workstation. Volunteer.", "color":"#cc0000"},
{ "company":"Sandia National Laboratories", "start_date": new Date(2012, 5, 1), "end_date": new Date(2013, 8, 1), "description":"Implemented a number open source tools to demonstrate the interception and decryption of GSM (2G) cellphone calls using publicly available rainbow tables. Developed a python-based XML reader/writer. <a href='http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=6735818&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D6735818' target='_blank'>Published in MILCOM 2013</a>.", "color":"#003366"},
];

  var width = document.body.clientWidth < 900+180 ? document.body.clientWidth-.25*document.body.clientWidth : 900;
function main() {
  timeline = generate_timeline(width, 160, get_min_date(data), new Date(), ".experience");
  draw_events(timeline, data);
}

main();
}

var projects = function(scroll_time) {
  // This will populate our project data
  // Project Data
  
  // Notes:
  // Titles should be ~ 50 characters
  // Descriptions should be ~ 450 - 500 characters
  var projects = [ 
  { "date":"Summer 2015", "name":"Force Visualization", "short":"force_vis", "description":"I did some self-guided work with <a href='http://d3js.org' target='_blank'>d3.js</a> this summer at Raytheon. I was tasked with developing a database for tracking a system's compliance with various IA security frameworks. As a side project, I developed a javascript library for visualizing the data. One of the best things about <a href='http://d3js.org' target='_blank'>d3.js</a> is that you can build robust visualizations supporting varied data sets. Using d3's built-in force layout and <a href='http://slodge.com/teach/#' target='_blank'>slodge's visualization</a> as a model, I came up with something pretty cool.", "link":"https://github.com/ainterr/force_vis" },
  { "date":"Spring 2015", "name":"This Site (Bootstrap, jQuery, and D3.js)", "short":"thissite", "description":"Web development is a hobby of mine and holds a special place in my heart since my first experience with programming was in a WebDev class in high school. After spending lots of time developing web pages for other people part time I decided it was finally time to write a personal page. I used <a href='http://getbootstrap.com/' target='_blank'>Bootstrap</a> for the styles and cross-browser compatability, <a href='https://jquery.com/' target='_blank'>jQuery</a> for the animations, and <a href='http://d3js.org/' target='_blank'>D3.js</a> to make the page easily extensible.", "link":"https://github.com/ainterr/ainterr.github.io" },
  { "date":"Fall 2014", "name":"WiiMote Controlled Robot Arm (FPGA and C++)", "short":"arm", "description":"The first really interesting class I took at Northeastern was <a href='http://www.northeastern.edu/esl/content/embedded-des-enabling-robotics-fall-2014' target='_blank'>Embedded Design Enabling Robotics</a>. It was an introduction into C++ and FPGA programming through the use of a <a href='http://zedboard.org/' target='_blank'>ZedBoard</a>. The class was designed around a project - control a servo-powered robotic arm using an WiiMote. We developed FPGA designs in Simulink for pulse width modulation to control the individual servo motors and C++ to gather input from the WiiMote via memory-mapped I/O.", "link":"http://www.youtube.com/watch?v=OV6TqJquSAU" },
  { "date":"Spring 2014", "name":"Image Processing Coin Counter (C++)", "short":"coin", "description":"In my second semester I took an introductory C++ class. Since I already knew C++ fairly well I caught on quickly and soon asked my professor for some extra work. Dr. Tadmor challenged me to write a program to count the amount of change in some pictures of coins lying on a table. After a lot of work I came up with a program that compares the relative diameters of the coins using <a href='http://opencv.org/' target='_blank'>OpenCV</a> along with some computer vision algorithms I created myself for edge detection.", "link":"https://github.com/ainterr/CoinCounter" },
  { "date":"Fall 2013", "name":"5x5x5 LED Cube (Arduino and Hardware)", "short":"cube", "description":"In my freshman year at Northeastern I was required to take a lot of introductory level engineering, math, and science classes. After a few weeks of Chemistry, Differential Equations, and Engineering Design I decided I needed something to keep my skills sharp while I satisfied requirements so I bought a couple hundred LEDs, some multiplexor ICs, and an <a href='http://arduino.cc/en/main/arduinoBoardUno' target='_blank'>Arduino Uno</a>. After hours of soldering, the result was a 5x5x5 LED cube that I could program in C++.", "link":"https://youtu.be/PA8yM02Kvf8" },
  { "date":"Spring 2012", "name":"WAV File Visualizer (Java)", "short":"wav", "description":"In one of my first programming classes I was given free rein to work on a project of my choosing in Java. I decided I wanted to make a visualizer for audio files - not knowing the rabit hole I was walking into. After half a semester exploring fourier series, java optimization, and file formats I came up with a working visualization tool that uses a Fast Fourier Transform (FFT) to depict the frequency domain for single channel WAV files in near real time.", "link":"https://github.com/ainterr/AudioViz" }
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
  divs.append("p").html(function(d) { return d.description; });
  divs.append("div")
    .attr("class","project-btn")
    .html(function(d) { return ' <a href="'+d.link+'" target="_blank"><button type="button" class="btn btn-success btn-contact">Check it out &raquo;</button></a>'; 
    });
	
// Append the menu items
  enter = d3.select(".dropdown-menu").selectAll("li")
    .data(projects).enter();
  lis = enter.append("li");
  as = lis.append("a").text(function(d) { return d.name; });
  as.attr("name", function(d) { return d.short; });
  
  as.on("click",function(d) { scroll_to(d.short, scroll_time, 50); });
};

var news = function() {
  // This will populate our news data
  // News Data
  
  var news = [
  { "headline":"NECCDC 2016", "description":"Northeastern placed first at the 2016 NECCDC - looking forward to the national competition in San Antonio!", "image":"img/neccdc.jpg", "link":"http://www.raytheon.com/spotlight/nccdc/" },
  ];
  
  // Add indicators
  dat = Array.apply(null, {length: news.length}).map(Number.call, Number);
  enter = d3.select(".carousel-indicators").selectAll("li")
    .data(dat).enter();
  indicators = enter.append("li").attr("data-target","#news-carousel")
    .attr("data-slide-to", function(d) { return d; });
  
  // Add news entries
  enter = d3.select(".carousel-inner").selectAll("div")
    .data(news).enter();
  divs = enter.append("div").attr("class","item");
  // Add a background picture
  imgs = divs.append("div");
  imgs.attr("class","carousel-background")
    .attr("style", function(d) { return "background-image: url('"+d.image+"')"; });
  // Add captions
  captions = divs.append("div").attr("class","container")
    .append("div").attr("class","carousel-caption");
  captions.append("h1").text(function(d) { return d.headline; });
  captions.append("p").attr("class","carousel-text").append("h4").html(function(d) { return d.description; });
  captions.append("a")
    .attr("class","btn btn-success clear-btn")
	.attr("role","button")
	.attr("href", function(d) { return d.link; })
	.attr("target","_blank")
	.html("Check it out &raquo;");
	
  // Activate the first indicator and article
  d3.select(divs[0][0]).attr("class","item active");
  d3.select(indicators[0][0]).attr("class","active");
}
