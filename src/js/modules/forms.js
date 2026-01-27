import { postData } from "../services/requests";

const forms = (state) => {
	const form = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');
	const upload = document.querySelectorAll('[name="upload"]');
	const select = document.querySelectorAll('select');
	const calcPrice = document.querySelector('.calc-price');


	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Мы скоро с вами свяжемся!',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	}


	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		})
		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		})

		select.forEach(item => {
			item.value = '';
		})
		
		calcPrice.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
	}

	const clearState = () => {
	for(let prop of Object.keys(state)) {
		delete state[prop];
	}
	}

	upload.forEach(item => {
		item.addEventListener('input', () => {
			let dots;
			let arr = item.files[0].name.split('.');
			arr[0].length > 6 ? dots = '...' : dots = '.';
			item.previousElementSibling.textContent = arr[0].substring(0, 6) + dots + arr[1];
		})
	})


	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 100);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);


			const formData = new FormData(item);
			for(let key in state) {
				formData.append(key, state[key]);
			}
			let api;
			item.closest('.popup-design') || item.classList.contains('calc-form') ? api = path.designer : api = path.question;
			console.log(api)


			postData(api, formData)
			.then(res => {
				console.log(res);
				statusImg.setAttribute('src', message.ok);
				textMessage.textContent = message.success;

			})
			.catch(res => {
				statusImg.setAttribute('src', message.fail);
				statusMessage.textContent = message.failure;				
			})
			.finally(res => {
				clearInputs();
				clearState();
				setTimeout(() => {
					statusMessage.remove();
					item.style.display = 'block';
					item.classList.remove('fadeOutUp');
					item.classList.add('fadeInUp');
				}, 5000);
			})
		})
	})
};

export default forms;