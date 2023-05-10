const username = document.querySelector('#name');
const email = document.querySelector('#email');
const textArea = document.querySelector('#msg');
const checkBox = document.querySelector('#privacy-policy');
const msgStatus = document.querySelector('.contact__msg-status');
const sendBtn = document.querySelector('.contact__form-btn');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMgs = formBox.querySelector('.contact__form-error-text');

	formBox.classList.add('error');
	errorMgs.innerHTML = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		if (el.value.trim() === '') {
			showError(
				el,
				' <i class="fa-solid fa-triangle-exclamation"></i> ' + 'wpisz ' + el.previousElementSibling.textContent
			);
		} else {
			clearError(el);
		}
	});
};

const checkEmail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, '<i class="fa-solid fa-triangle-exclamation"></i> ' + 'E-mail jest niepoprawny');
	}
};

const checkCheckbox = checkBox => {
	if (checkBox.checked == false) {
		showError(checkBox, checkBox.nextElementSibling.innerHTML);
	} else {
		clearError(checkBox);
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__form-box');
	let errorCount = 0;

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		if (document.location.search === '?mail_status=sent') {
			msgStatus.classList.add('success');
			msgStatus.textContent = 'Wiadomość wysłana!';

			setTimeout(() => {
				msgStatus.classList.remove('success');
				location.reload();
			}, 3000);
		}

		if (document.location.search === '?mail_status=error') {
			msgStatus.classList.add('error');
			msgStatus.textContent = 'Wystąpił błąd.';

			setTimeout(() => {
				msgStatus.classList.remove('error');
				location.reload();
			}, 3000);
		}
	}
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();
	checkForm([username, email, textArea]);
	checkEmail(email);
	checkCheckbox(checkBox);
	checkErrors();
});
