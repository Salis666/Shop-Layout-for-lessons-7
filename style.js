'use strict';

let brandDark = document.querySelector('.photo_logo_dark');
let objective_menu = document.querySelector('.objective_menu');
let headerBars = document.querySelector('.menu_dashes_botton');
let menuClose = document.querySelector('.objective_menu_close');



function toggleMenu() {
            brandDark.classList.toggle('objective_menu_none');
            objective_menu.classList.toggle('objective_menu_none');
}

headerBars.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);