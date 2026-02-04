const accordion = (triggerSelector) => {
	const btns = document.querySelectorAll(triggerSelector);
	// 	  blocks = document.querySelectorAll(itemsSelector);

	btns.forEach(btn => {
		btn.addEventListener('click', function() {
			btns.forEach(item => {
				item.classList.remove('active-style');
				item.nextElementSibling.classList.remove('active-content');
				item.nextElementSibling.style.maxHeight = '0px';

			})
			this.classList.add('active-style');
			this.nextElementSibling.classList.add('active-content');

			if(this.classList.contains('active-style')) {
				this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 +'px';
			} else {
				this.nextElementSibling.style.maxHeight = '0px';
			}
		});
	})






	// blocks.forEach(block => {
	// 	block.classList.add('animated', 'fadeInDown');
	// });

	// btns.forEach(btn => {
	// 	btn.addEventListener('click', function() {
	// 		if(!this.classList.contains('active')) {
	// 			btns.forEach(item => {
	// 				item.classList.remove('active', 'active-style');
	// 			})
	// 			this.classList.add('active', 'active-style');
	// 		}
	// 	})
	// })


}

export default accordion;