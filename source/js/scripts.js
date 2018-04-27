window.onload = function () {
    var navList = document.querySelector('.page-header__nav');
    var navButton =  document.querySelector('.page-header__button');

    navList.classList.add('page-header__nav--js');

    navButton.addEventListener('click', function () {
        navList.classList.toggle('page-header__nav--open');
    })
};