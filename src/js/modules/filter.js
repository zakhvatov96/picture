const filter = () => {
	const menu = document.querySelector('.portfolio-menu'),
		  items = menu.querySelectorAll('li'),
		  wrapper = document.querySelector('.portfolio-wrapper')


	const typeFilter = (markType) => {
		const markAll = wrapper.querySelectorAll('.all'),
		 	  no = document.querySelector('.portfolio-no');
		
		markAll.forEach(item => {
			item.style.display = 'none';
			item.classList.remove('animated', 'fadeIn');
		})

		no.style.display = 'none';
		no.classList.remove('animated', 'fadeIn');

		if(markType) {
			markType.forEach(item => {
				item.style.display = 'block';
				item.classList.add('animated', 'fadeIn');
			})
		} else {
			no.style.display = 'block';
			no.classList.add('animated', 'fadeIn');
		}
	}


	const addListeners = (btnSelector, contentSelector) => {
		const btn = menu.querySelector(btnSelector),
			  content = wrapper.querySelectorAll(contentSelector);

		btn.addEventListener('click', () => {
			contentSelector ? typeFilter(content) : typeFilter();
		})
	}

	addListeners('.all', '.all');
	addListeners('.lovers', '.lovers');
	addListeners('.chef', '.chef');
	addListeners('.girl', '.girl');
	addListeners('.guy', '.guy');
	addListeners('.grandmother');
	addListeners('.granddad');


	menu.addEventListener('click', (e) => {
		const target = e.target;
		if(target && target.tagName === 'LI') {
			items.forEach(item => {
				item.classList.remove('active');
			})
			target.classList.add('active');
		}
	})

};

export default filter;