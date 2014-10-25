var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email : { 
		type: String, 
		required: true,
		unique: true 
	},
	password: {
		type:String,
		required: true
	},
	salt: { 
		type: String, 
		default: 'secretsalt'
	},
	create: { 
		type: Date, 
		default: Date.now
	},
	update: { 
		type: Date, 
		default: Date.now 
	},
	cityId : {
		type : Schema.Types.ObjectId,
		ref : 'City'
	},	
	firstName: { 
		type: String, 
		default: 'Adam'
	},
	lastName: { 
		type: String, 
		default: 'Smith'
	},
	resetPasswordToken: String,
	resetPasswordExpires: String
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
	var salt = bcrypt.genSaltSync(8);
	var hash = bcrypt.hashSync(password, salt, null);
    return {
    	hash: hash,
    	salt:salt
    };
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.isValid = function (inputType, data){
	if (inputType === 'text') {
		if (data !=='')
			return data;
		else {
			return undefined;
		}
	} else if (inputType === 'email'){
		var atpos=data.indexOf("@");
		var dotpos=data.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=data.length)	{	
			return undefined;
		} else {
			return data;
		}
	} else if (inputType === 'number'){
		if ((data.search(/^[0-9]+$/) != -1) && (parseInt(data) < 101)){
			return data;
		} else {
			return undefined;
		}
	} else {
		return undefined;
	}
}

userSchema.methods.canSend = function(object) {
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
// create the model for users and expose it to our app
module.exports =  mongoose.model('User', userSchema);