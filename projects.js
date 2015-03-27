var projects = function() {
	var projects = [
	{ "category":"High School", "name":"WAV File Visualizer (Java)", "short":"wav", "description":"Back in High School in one of my first programming classes I was given free rein to work on a project of my choosing in Java. I decided I wanted to make a visualizer for audio files. I had no idea that something so seemingly simple could be so difficult... After half a semester exploring fourier series, java optimization, and file formats I came up with a working visualization tool that uses a Fast Fourier Transform (FFT) to depict the frequency domain for single channel WAV files in near real time. <a href='#' target='_blank'>Check it out</a>." },
	{ "category":"College", "name":"Image Processing Coin Counter (C++)", "short":"coin", "description":"In my freshman year of college I took an introductory C++ class that was required for all Electrical and Computer Engineering majors. Since I had taken a C++ programming class in high school I caught on quickly and soon asked my professor (Dr. Tadmor) for some extra work. Professor Tadmor told me he had a collection of pictures of coins sitting on a table. He challenged me to write a program to count the amount of change in each the pictures reliably. After a lot of work I came up with a program that successfully worked with a majority of the pictures he gave me by comparing the relative diameters of the coins using <a href='http://opencv.org/' target='_blank'>OpenCV</a> along with some computer vision algorithms I created myself for edge detection. <a href='#' target='_blank'>Check it out</a>." },
	{ "category":"Personal", "name":"5x5x5 LED Cube (Arduino and Hardware)", "short":"cube", "description":"[Description]" },
	{ "category":"College", "name":"WiiMote Controlled Robotic Arm (FPGA and C++)", "short":"arm", "description":"[Description]" },
	{ "category":"Personal", "name":"Open-Source vSphere Alternative", "short":"ovskvm", "description":"[Description]" },
	{ "category":"Personal", "name":"This Site (Bootstrap, jQuery, and D3.js)", "short":"thissite", "description":"Web development is a hobby of mine and holds a special place in my heart since my first experience with programming was in a WebDev class in high school. I've made the source code to this site available on github. I used <a href='http://getbootstrap.com/' target='_blank'>Bootstrap</a> for the styles and cross-browser compatability, <a href='https://jquery.com/' target='_blank'>jQuery</a> for the animations, and <a href='http://d3js.org/' target='_blank'>D3.js</a> to make my project section extensible. <a href='#' target='_blank'>Check it out</a>." }
	];
	
	var enter = d3.select(".projects .content .col-md-12").selectAll("div")
		.data(projects).enter();
	var divs = enter.append("div");
	divs.attr("class", function(d) { return "project "+d.short; });
	divs.append("h3").text(function(d) { return d.name; });
	divs.append("p").html(function(d) { return d.description; });
	
	enter = d3.select(".dropdown-menu").selectAll("li")
		.data(projects).enter();
	lis = enter.append("li");
	as = lis.append("a").text(function(d) { return d.name; });
	as.attr("href", function(d) { return "#"+d.short; });
	as.attr("name", function(d) { return d.short; });
};