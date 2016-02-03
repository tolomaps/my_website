//initialize function called when the script loads
function initialize(){
    cities();
};

var cityPop;
function cities(){
    //define an array of objects for cities and population
    cityPop = [
        {
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

		//create the table element
		$("#mydiv").append("<table>");
		$("table").append("<tr>");
		$("tr").append("<th>City</th><th>Population</th>");

		//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
      //assign longer html strings to a variable
      var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
      //add the row's html string to the table
      $("table").append(rowHtml);
    };
		addColumns(cityPop);
		addEvents();
};

function addColumns(cityPop){
	$('tr').each(function(i){
		if (i == 0){
			$(this).append('<th>City Size</th>');
		} else {
			var citySize;
			if (cityPop[i-1].population < 100000){
				citySize = 'Small';
			} else if (cityPop[i-1].population < 500000){
				citySize = 'Medium';
			} else {
				citySize = 'Large';
			};
			$(this).append('<td>' + citySize + '</td>');
		};
	});
};

function addEvents(){
	$('table').mouseover(function(){
		var color = "rgb(";
		for (var i=0; i<3; i++){
			var random = Math.round(Math.random() * 255);
			color += random;
			if (i<2){
				color += ",";
			} else {
				color += ")";
			};
		}
		$(this).css('color', color);
	});

	function clickme(){
		alert('Hey, you clicked me!');
	};
	$('table').on('click', clickme);
};
$(document).ready(initialize);



//define AJAX function
function jQueryAjax(){
  //basic jQuery ajax method
  // $.ajax("data/madison.geojson", {
  //   dataType: "json",
  //   success: callback
  // });
  //
  // //jQuery.get() method...Example 2.5 line 3
  // $.get("data/MegaCities.geojson", callback, "json");

  //jQuery.getJSON() method...Example 2.5 line 3
  $.getJSON("data/MegaCities.geojson", callback);
};

function callback(response) {
  console.log("This is the data: ", response);
};

// function jsAjax(){
//     // Step 1: Create the request
//     var ajaxRequest = new XMLHttpRequest();
//
//     //Step 2: Create an event handler to send received data to a callback function
//     ajaxRequest.onreadystatechange = function(){
//         console.log("AJAX request state: " + ajaxRequest.readyState);
//         if (ajaxRequest.readyState === 4){
//             callback(ajaxRequest.response);
//             console.log("AJAX request state: " + ajaxRequest.readyState);
//             console.log("ready!");
//         };
//     };
//
//     //Step 3: Open the server connection
//     ajaxRequest.open('GET', 'data/MegaCities.geojson', true);
//
//     //Step 4: Set the response data type
//     ajaxRequest.responseType = "json";
//
//     //Step 5: Send the request
//     ajaxRequest.send();
// };

function debugAjax(){

	var mydata;

	$.ajax("data/madison.geojson", {
		dataType: "json",
		success: function(response){
      console.log("successful");
			debugCallback(response);
		}
	});

	// $("#mydiv").append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};

function debugCallback(response){

  $("#mydiv").append('GeoJSON data: ' + JSON.stringify(response));
};

$(document).ready(jQueryAjax);
$(document).ready(debugAjax);
// window.onload = jsAjax();
