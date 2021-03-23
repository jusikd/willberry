const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

// cart

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
// const modalClose = document.querySelector('.modal-close');

modalCart.addEventListener('click', function(ev) {
	const target = ev.target;
	if (target.classList.contains('overlay') || target.classList.contains('modal-close')) {
		closeModal()
	}
})

// modalCart.addEventListener('click', function(ev) {
// 	const target = ev.target;
// 	if (target.classList.contains('overlay')) {
// 		closeModal()
// 	}
// 	if (target.classList.contains('modal-close')) {
// 		closeModal()
// 	}
// })

const openModal = function () {
	modalCart.classList.add('show')
}
const closeModal = function () {
	modalCart.classList.remove('show')
}

buttonCart.addEventListener('click', openModal);
// modalClose.addEventListener('click', closeModal);

//scroll smooth

// (function () {
// 	const scrollLink = document.querySelectorAll('a.scroll-link');
// 	for (let i = 0; i < scrollLink.length; i++) {
// 		scrollLink[i].addEventListener('click', function (ev) {
// 			ev.preventDefault();
// 			const id = scrollLink[i].getAttribute('href');
// 			document.querySelector(id).scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'start',
// 			})
// 		})
// 	}
// })()

{
	const scrollLink = document.querySelectorAll('a.scroll-link');
	for (let i = 0; i < scrollLink.length; i++) {
		scrollLink[i].addEventListener('click', function (ev) {
			ev.preventDefault();
			const id = scrollLink[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		})
	}
}

