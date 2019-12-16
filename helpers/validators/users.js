const Validator = require('validator')
const isEmpty = require('./is-empty')

const validateLoginInput = data => {
	const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{7,}$/
	let errors = {}

	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.first_name = !isEmpty(data.first_name) ? data.first_name : ''
	data.last_name = !isEmpty(data.last_name) ? data.last_name : ''
	data.num_phone = !isEmpty(data.num_phone) ? data.num_phone : ''

	//email
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid'
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email cannot empty'
	}
	//password
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password cannot empty'
	}
	if (!Validator.isLength(data.password, { min: 7, max: undefined })) {
		errors.password = 'Password Should Min. 7 characters'
	}
	//firstname
	if (Validator.isEmpty(data.first_name)) {
		errors.first_name = 'First Name cannot empty'
	}
	if (!Validator.isLength(data.first_name, { min: 3, max: undefined })) {
		errors.first_name = 'First Name should be atleast 3 characters'
	}
	//lastname
	if (Validator.isEmpty(data.last_name)) {
		errors.last_name = 'Last Name cannot empty'
	}
	if (!Validator.isLength(data.last_name, { min: 3, max: undefined })) {
		errors.last_name = 'Last Name should be atleast 3 characters'
	}
	//phone number
	if (Validator.isEmpty(data.num_phone.toString())) {
		errors.num_phone = 'Phone Number cannot empty'
	}
	if (!Validator.isNumeric(data.num_phone)) {
		errors.num_phone = 'Phone number format is incorrect'
	}
	if (!Validator.isLength(data.num_phone, { min: 10, max: 12 })) {
		errors.num_phone = 'Phone number format is incorrect'
	}
	return { errors, isValid: isEmpty(errors) }
}

module.exports = { validateLoginInput }
