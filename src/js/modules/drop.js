import { postData } from "../services/requests";

const drop = () => {
	const fileInputs = document.querySelectorAll('[name="upload"]');

	['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, preventDefaults, false)
		});		
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function highlight(item) {
		item.closest('.file_upload').style.border = '5px solid yellow';
		item.closest('.file_upload').style.backgroundColor = 'rgb(0,0,0,.7)';
	}

	function unhighlight(item) {
		item.closest('.file_upload').style.border = 'none';
		if(item.closest('.calc-form')) {
			item.closest('.file_upload').style.backgroundColor = '#fff';
		} else if(item.closest('.hidden-xs')) {
			item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
		} else {
			item.closest('.file_upload').style.backgroundColor = '#ededed';
		}
	}

	['dragenter','dragover'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => highlight(input), false)
		});
	
	});

	['dragleave','drop'].forEach(eventName => {
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => unhighlight(input), false)
		});
	
	});

	const clearInputs = () => {
		fileInputs.forEach(item => {
			setTimeout(() => {
				item.previousElementSibling.textContent = 'Файл не выбран';
			}, 4000)
			item.previousElementSibling.textContent = 'Файл загружен успешно';
		})
	}

	fileInputs.forEach(input => {
		input.addEventListener('drop', (e) => {
			input.files = e.dataTransfer.files;
			let dots;
			let arr = input.files[0].name.split('.');
			arr[0].length > 6 ? dots = '...' : dots = '.';
			input.previousElementSibling.textContent = arr[0].substring(0, 6) + dots + arr[1];
			if(input.closest('.hidden-xs')) {
			const formData = new FormData();
				formData.append('file', input.files[0]);
				postData('assets/server.php', formData)
					.then(res => {
						console.log(res);
					})
					.catch(res => {
						input.textContent = 'Something wrong...'
					})
					.finally(res => {
						clearInputs();
					});
			}
		})
	})		



};

export default drop;