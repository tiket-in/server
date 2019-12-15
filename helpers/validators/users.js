const Validator = require('validator')

const validateLoginInput = data => {
	const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{7,}$/
	let errors = {}

	//email
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid'
	}
	if (Validator.isEmpty(data.email.trim())) {
		errors.email = 'Email cannot empty'
	}
	//password
	if (Validator.isEmpty(data.password.trim())) {
		errors.password = 'Password cannot empty'
	}
	if (!passReg.test(data.password)) {
		errors.password =
			'Password Should Min. 7 characters with combination of number, symbol, & capital letter'
	}
	//firstname
	if (Validator.isEmpty(data.first_name.trim())) {
		errors.first_name = 'First Name cannot empty'
	}
	if (!Validator.isLength(data.first_name, { min: 3, max: undefined })) {
		errors.first_name = 'First Name should be atleast 3 characters'
	}
	//lastname
	if (Validator.isEmpty(data.last_name.trim())) {
		errors.first_name = 'First Name cannot empty'
	}
	if (!Validator.isLength(data.last_name, { min: 3, max: undefined })) {
		errors.first_name = 'First Name should be atleast 3 characters'
	}
	//phone number
	if (Validator.isEmpty(data.password.toString().trim())) {
		errors.phone_number = 'Phone Number cannot empty'
	}
	if (!Validator.isNumeric(data.phone_number)) {
		errors.phone_number = 'Phone number format is incorrect'
	}
	if (!Validator.isLength(data.phone_number, { min: 10, max: 12 })) {
		errors.phone_number = 'Phone number format is incorrect'
	}
	return { errors }
}

module.exports = { validateLoginInput }
