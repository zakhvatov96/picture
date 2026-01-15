const modals = (state) => {
	let btnPressed = false;
	function bindModal (triggerSelector, modalSelector, closeSelector, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
			  modal = document.querySelector(modalSelector),
			  close = document.querySelector(closeSelector),
			  windows = document.querySelectorAll('[data-modal]'),
			  scroll = calcScroll(),
			  giftTrigger = document.querySelector('.fixed-gift');

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if(e.target) {
					e.preventDefault();
					if(destroy) {
						item.remove();
					}
					btnPressed = true;
					windows.forEach(item => {
						item.style.display = 'none';
						item.classList.add('animated', 'fadeIn');
					})
					modal.style.display = 'block';
					document.body.style.overflow = 'hidden';
					document.body.style.marginRight = `${scroll}px`;
					giftTrigger.style.marginRight = `${scroll}px`;
				}
			})
		})

		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			})
			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = '0px';

		})

		modal.addEventListener('click', (e) => {
			if(e.target === modal) {
				windows.forEach(item => {
					item.style.display = 'none';
				})
				modal.style.display = 'none';
				document.body.style.overflow = '';
				document.body.style.marginRight = '0px';
	
			}
		})
	}

	function showModalByTime (selector, time) {
		const modal = document.querySelector(selector);
		setTimeout(function() {
			let display = false;
			document.querySelectorAll('[data-modal]').forEach(item => {
				if(window.getComputedStyle(item).display !== 'none') {
					display = 'block';
				}
			})

			if(!display) {
			  	let scroll = calcScroll();
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
				document.body.style.marginRight = `${scroll}px`;
			}


		}, time);
	}

	function calcScroll() {
		const div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);

		const scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		return scrollWidth;
	}

	function modalScroll(selector) {
		window.addEventListener('scroll', () => {
			const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
			if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
				document.querySelector(selector).click();
			}
		})
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
	showModalByTime('.popup-consultation', 60000);
	modalScroll('.fixed-gift');
};

export default modals;