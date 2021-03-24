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

//универсальный функционал для скролла

// {
// 	const scrollLinks = document.querySelectorAll('a.scroll-link');
// 	for (const scrollLink of scrollLinks) {
// 		scrollLink.addEventListener('click', function (ev) {
// 			ev.preventDefault();
// 			const id = scrollLink.getAttribute('href');
// 			document.querySelector(id).scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'start',
// 			})
// 		})
// 	}
// }

//goods

const more = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

// получаем из json нужный массив данных
// await - дожидаемся результата от выражения справа, прежде чем исполнять дальнейший код (может использоваться в асинхронных функциях)
// async - асинхронная функция
// fetch - API которое может запрашивать данные с сервера и возвращает promise
// promise - обещание получить данные от сервера (либо будут получены, либо нет)

const getGoods = async function () {
	const  result = await fetch('db/db.json');
	if (!result.ok) {
		throw 'Ошибочка: ' + result.status
	}
	return await result.json();
};
// getGoods();
// console.log(getGoods());  - увидеть результат промиса

getGoods().then(function (data) {
//	console.log(data); // увидеть массив, который пришёл из json
});

// ещё один вариант написания того же самого

// fetch('db/db.json')
// 	.then(function (response) {
// 	return response.json()
// 	})
// 	.then(function (data) {
// 	console.log(data);
// });

//создаём карточку с нужной вёрсткой
const createCard = function ({label, name, img, description, id, price}) { //деструктуризация, чтобы потом не обращаться каждый раз object.name
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
// ${} - интерполяция
	card.innerHTML = `
	<div class="goods-card">
	${label ? 
		`<span class="label">${label}</span>` :  
		 ''} 
	<img src="db/${img}" alt="${name}" class="goods-image">
	<h3 class="goods-title">${name}</h3>
	<p class="goods-description">${description}</p> 
	<button class="button goods-card-btn add-to-cart" data-id="${id}">
	<span class="button-price">$${price}</span>
	</button>
	</div>
	`;
	// console.log(card);
	return card;
};

// пишем функцию, которая будет рендерить карточки на страницу
const renderCards = function (data) {
	longGoodsList.textContent = ''; // textContent работает быстрее,чем innerHTML
	const cards = data.map(createCard); // перебирает и возвращает массив

//	console.log(cards[0]); - посмотреть только один первый элемент из массива
//	cards.forEach(function (card) { // forEach в отличие от map только перебирает, но не возвращает массив
	longGoodsList.append(...cards) // - добавляем на страницу карточки, разделяя массив ... на отдельные объекты
//	}) - осталось от forEach
	document.body.classList.add('show-goods') //исчезают почти все эелементы на странице из-за добавления класса show-goods
};

more.addEventListener('click', function (event) {
	event.preventDefault();
	getGoods().then(renderCards);

	document.querySelector('body').scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	})

})

//делаем фильтр по полю gender у карточек
const filterCards = function (field, value) {
	getGoods()
		.then(function (data) {
		const filteredGoods = data.filter( function (good) { // filter вернёт все элементы, которые вернут true, а остальные проигнорирует
			return (value !== 'All') ? good[field] === value : good;
		});
		return filteredGoods;
	})
	.then(renderCards);
};

//filterCards('gender', 'Mens')

navigationLink.forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		const field = link.dataset.field; // объект dataset, чтобы получить из html data атрибут
		const value = link.textContent; // из html берём текстовое значение внутри тега
		filterCards(field, value);
	})
});

// тренировочный массив. На самом деле надо получать массив с сервера
// const arr = [{"id": "003",
// 	"img": "img/61SVZdHi1SL.jpg",
// 	"name": "TOMS Women's Alpargata Loafer",
// 	"label": "Bestseller",
// 	"description": "Red",
// 	"price": "219",
// 	"category": "Shoes",
// 	"gender": "Womens"},
// 	{
// 	"id": "003",
// 	"img": "img/61SVZdHi1SL.jpg",
// 	"name": "TOMS Women's Alpargata Loafer",
// 	"label": "Bestseller",
// 	"description": "Red",
// 	"price": "219",
// 	"category": "Shoes",
// 	"gender": "Womens"
// },
// 	{"id": "003",
// 		"img": "img/61SVZdHi1SL.jpg",
// 		"name": "TOMS Women's Alpargata Loafer",
// 		"label": "Bestseller",
// 		"description": "Red",
// 		"price": "219",
// 		"category": "Shoes",
// 		"gender": "Womens"
// 	}]

// renderCards(arr);

