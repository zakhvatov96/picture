const calc = (state, size, material, options, promocode, result) => {
	const sizeBlock = document.querySelector(size),
		  materialBlock = document.querySelector(material),
		  optionsBlock = document.querySelector(options),
		  promocodeBlock = document.querySelector(promocode),
		  resultBlock = document.querySelector(result);

	let sum = 0;

	function calcSum (e, prop) {
		sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

		if(sizeBlock.value === '' || materialBlock.value === '') {
			resultBlock.textContent = 'Выберите размер и материал картины';
		} else if(promocodeBlock.value === 'IWANTPOPART') {
			resultBlock.textContent = sum*0.7;
		} else {
			resultBlock.textContent = sum;
		}
		state[prop] = e.target.value;
		state['result'] = resultBlock.textContent;
		console.log(state);
	}

	sizeBlock.addEventListener('change', (e) => calcSum(e, 'size'));
	materialBlock.addEventListener('change', (e) => calcSum(e, 'material'));
	optionsBlock.addEventListener('change', (e) => calcSum(e, 'options'));
	promocodeBlock.addEventListener('input', (e) => calcSum(e, 'promocode'));
}

export default calc;