function isValid(inputType, data){
	if (inputType === 'text') {
		if (data !=='')
			return data;
		else {
			alert ('Incorrect input');
			return undefined;
		}
	} else if (inputType === 'email'){
		var atpos=data.indexOf("@");
		var dotpos=data.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=data.length)	{	
			alert ('Incorrect email');
			return undefined;
		} else {
			return data;
		}
	} else if (inputType === 'number'){
		if ((data.search(/^[0-9]+$/) != -1) && (parseInt(data) < 101)){
			return data;
		} else {
			alert ('Incorrect numeric!');
			return undefined;
		}
	} else {
		return undefined;
	}
}

function canSend (object) {
var errcount = 0;
	for (var i in object) {
		if (object[i] === undefined){
			errcount = errcount+1;
		}
	}
	if (errcount > 0) {
		return false;
	} else {
		return true;
	}

}