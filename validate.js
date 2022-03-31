//Any comments in practice files may seem basic, overly descriptive,
//or even redundant, since commenting should be explaining the "why" and not the "how".
//These comments are solely for my reference and for note taking, including defining js syntax.
//In regular projects, it will be assumed that the viewer of the code already knows its language.

//Defining id variables plucked from the DOM's form.
const form = document.getElementByID('form');
const username = document.getElementByID('username');
const email = document.getElementByID('email');
const password = document.getElementByID('password');
const password2 = document.getElementByID('password2');

//Upon submit, we validate the input. Just in case, it's best to remove
//any default form behavior that could interfere with our form validation.
//I am not familiar with the "=>" syntax in this case. I will update the comments
//as I learn.
form.addEventListener('submit', event => {
	event.preventDefault();

	validateInputs();
})

//Adds error class to the input divs in the DOM. This sets an error message.
//Please note the setup of the parameters-- error messages can differ amongst
//the different elements in question. 
const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('.error');

	//This code displays the error message if the form
	//input is not correct. It adds an error class 
	//to the form's input, marking it as errorneous.
	errorDisplay.innerText = message;
	inputControl.classList.add('error');
	inputControl.classList.remove('success');
}

const setSuccess = element => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('error');

	//If there was a previous error that had been triggered,
	//this line of code clears the error message. It adds
	//a success class to the form's input.
	errorDisplay.innerText = '';
	inputControl.classList.add('success');
	inputControl.classList.remove('error');
}

const isValidEmail = email => {
	//A regular expession meant to check if the email address is written in 
	//a valid format (no missing @s and that sort of thing)
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

//trim() serves to remove any unnecessary whitespace that the string may have.
const validateInputs = () => {
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();

	//validating each input-- username, email, password, and a matching password.
	if (usernameValue === ''){
		setError(username, 'Username is required');
	}else{
		setSuccess(username);
	}

	if (emailValue === ''){
		setError(email, 'Email is required');
	} else if (!isValidEmail(emailValue)){
		setError(email, 'Provide a  valid email address');
	} else {
		setSuccess(email);
	}

	if (passwordValue === ''){
		setError(password, 'Password is required');
	}else if(passwordValue.length < 8) {
		setError(password, 'Password must be at least 8 characters');
	}else {
		setSuccess(password);
	}

	if (password2Value === ''){
		setError(password2, 'Password is required');
	} else if(password2Value !== passwordValue){
		setError(password2, "Passwords don't match");
	}else{
		setSuccess(password2)
	}

}
