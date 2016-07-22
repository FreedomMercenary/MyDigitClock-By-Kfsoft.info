SUMMARY
*******
This tiny jquery plugin help your to add live digital clock(s) to you page, with simple animation effect. 
Work with all major browsers (IE / FF / chrome / safari / opera).


USAGE
*****
1. Download jquery.MyDigitClock.js add its reference to your page.

<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="jquery.MyDigitClock.js"></script>

2. Add div(s) to your page body.
 
<div id="clock1"></div>
<div id="clock2"></div>
<div id="clock3"></div>

3. After the page is rendered, run MyDigitClock function. See the following examples.

$(function(){
	$("#clock1").MyDigitClock();

	$("#clock2").MyDigitClock({
		fontSize:50, 
		fontFamily:"Century gothic", 
		fontColor: "#000", 
		fontWeight:"bold", 
		bAmPm:true,
		background:'#fff',
		bShowHeartBeat:true
		});
		
	$("#clock3").MyDigitClock({
		fontSize:150, 
		fontColor:"grey",
		background:"#fff",
		fontWeight:"bold",
		timeFormat: '{HH}<span id="ch1">:</span>{MM}'}
	);
});


DEMO
****
http://www.kfsoft.info/home/digitClockDemo.php

AUTHOR
******
KF SOFTWARE HOUSE (http://www.kfsoft.info)

License
*******
MIT license  