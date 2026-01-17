const slider = (items, dir, prev, next) => {	
	const slides = document.querySelectorAll(items);

	let paused = false;

	let slideIndex = 1;

	function showSlides(n) {
		if(n > slides.length) {
			slideIndex = 1;
		}

		if(n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach(item => {
			item.classList.add('animated');
			item.style.display = 'none';
		})

		slides[slideIndex-1].style.display = 'block';
	}

	showSlides(slideIndex);

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	try {
		const prevBtn = document.querySelector(prev),
			  nextBtn = document.querySelector(next);

		prevBtn.addEventListener('click', () => {
			plusSlides(-1);
			slides[slideIndex-1].classList.remove('slideInLeft');
			slides[slideIndex-1].classList.add('slideInRight');
		});

		nextBtn.addEventListener('click', () => {
			plusSlides(1);
			slides[slideIndex-1].classList.remove('slideInRight');
			slides[slideIndex-1].classList.add('slideInLeft');
		});
	} catch(e){}

	function activateAnimation() {
		if (dir === 'vertical') {
			paused = setInterval(function(){
				plusSlides(1);
				slides[slideIndex-1].classList.add('slideInDown');
			}, 3000);
		} else {
			paused = setInterval(function() {
				plusSlides(1);
				slides[slideIndex-1].classList.remove('slideInRight');
				slides[slideIndex-1].classList.add('slideInLeft');
			}, 3000)
		}
	}

	activateAnimation();

	slides[0].parentElement.addEventListener('mouseenter', () => {
		clearInterval(paused);
	});

	slides[0].parentElement.addEventListener('mouseleave', () => {
		activateAnimation();
	});


};

export default slider;