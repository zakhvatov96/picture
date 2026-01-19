import modals from "./modals";
import slider from "./slider";
import forms from "./forms";

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	modals();
	slider('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
	slider('.main-slider-item', 'vertical');
	forms();
});