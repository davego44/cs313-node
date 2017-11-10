module.exports = function calculateCost(lettersS, lettersM, largeEnvF, parcels, type, weight, callback) {
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
		callback("invalidArgs");
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
		callback("tooHeavy");
	}
	callback(null, result);
}