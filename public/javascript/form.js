var lettersS;
var lettersM;
var largeEnvF;
var parcels;

window.onload = function loadup() {
  $.get('/getData', {}, function callback(data, status) {
		lettersS = data.lettersS;
		lettersM = data.lettersM;
		largeEnvF = data.largeEnvF;
		parcels = data.parcels;
  });
};

$(function(){
   $("input[name=type]").click(estimateCost);
   $("input[name=weight]").keyup(estimateCost);
});

function estimateCost() {
	var type = $("input[name=type]:checked").val();
	var weight = parseFloat($("input[name=weight]").val());
	var values;
	var meterFlag = false;
	if (type == "lettersS") {
		values = lettersS;
	} else if (type == "lettersM") {
		values = lettersM;
		meterFlag = true;
	} else if (type == "largeEnvF") {
		values = largeEnvF;
	} else if (type == "parcels") {
		values = parcels;
	}
	var result;
	if (values == null || isNaN(weight) || weight <= 0) {
		result = "";
	} else {
		for (var key in values) {
			if (weight <= key) {
				result = "$" + values[key];
				break;
			}
		}
		if (result == null && meterFlag) {
			for (var key in largeEnvF) {
				if (weight <= key) {
					result = "$" + largeEnvF[key];
					break;
				}
			}
		}
	}
	if (result == null) {
		result = "Too Heavy";
	}
	$("#resultDiv").html(result);
}