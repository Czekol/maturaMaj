// HAMBURGER MENU
const body = document.querySelector('body');
const burgerBtn = document.querySelector('.nav__burger-btn');
const navMobile = document.querySelector('.nav__mobile');
const mobileNavLinks = document.querySelectorAll('.nav__mobile-link');
const navShadow = document.querySelector('.nav__shadow');
// ALL BTNS IN OFFER
const offerBtns = document.querySelectorAll('.offers__card-btn');
// CURRENT YEAR IN FOOTER
const footerYear = document.querySelector('.footer__current-year');
// HANDLE-OBSERVER
const sections = document.querySelectorAll('.section');
const nav = document.querySelector('.nav');
// SCROLLSPY
const scrollspySections = document.querySelectorAll('.scrollspySection');
const navLinks = document.querySelectorAll('.nav-link');

const navToggle = () => {
	navMobile.classList.toggle('show-links');
	navShadow.classList.toggle('show-shadow');
	burgerBtn.classList.toggle('rotate-burger-btn');
	body.classList.toggle('stop-scrolling');
};

// --- ---

offerBtns.forEach(btn =>
	btn.addEventListener('click', e => {
		offerBtns.forEach(btn => btn.classList.remove('offers__card-btn--cta'));
		e.target.classList.add('offers__card-btn--cta');
	})
);

offerBtns.forEach(btn =>
	btn.addEventListener('mouseover', () => {
		btn.classList.add('offers__card-btn--hover-green');
		offerBtns.forEach(btn => btn.classList.add('offers__card-btn--hover-white'));
	})
);

offerBtns.forEach(btn =>
	btn.addEventListener('mouseleave', () => {
		btn.classList.remove('offers__card-btn--hover-green');
		offerBtns.forEach(btn => btn.classList.remove('offers__card-btn--hover-white'));
	})
);

// --- ---

const handleCurrentYear = () => {
	const currentYear = new Date().getFullYear();
	footerYear.textContent = currentYear;
};

handleCurrentYear();

// --- ---

const handleObserver = () => {
	const currentSection = window.scrollY;

	sections.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + nav.clientHeight) {
			nav.classList.add('border-bottom');
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + nav.clientHeight) {
			nav.classList.remove('border-bottom'); 
		}
	});
};

// Calculate the viewport height in vh units

// Use the vh value in your CSS styles

// --- ---

const scrollSpy = () => {
	const currentSection = window.scrollY;
	const screenHeight = window.innerHeight;
	const onevh = screenHeight / 100;
	sections.forEach(section => {
		let id = section.getAttribute('id');
		if (
			section.classList.contains('scrollspySection') &&
			section.offsetTop <= currentSection + nav.clientHeight + onevh * 27.7
		) {
			navLinks.forEach(link => {
				link.classList.remove('active');
				document.querySelector(`.nav__desktop-link[href*=${id}]`).classList.add('active');
				document.querySelector(`.nav__mobile-link[href*=${id}]`).classList.add('active');
			});
		}
	});
};

mobileNavLinks.forEach(link => link.addEventListener('click', navToggle));
burgerBtn.addEventListener('click', navToggle);
navShadow.addEventListener('click', navToggle);
window.addEventListener('scroll', handleObserver);
window.addEventListener('scroll', scrollSpy);
