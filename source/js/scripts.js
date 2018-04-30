window.onload = function () {
    var navList = document.querySelector('.page-header__nav');
    var navButton =  document.querySelector('.page-header__button');
    var popUp = document.querySelector('.pop-up');
    var popUpBtn = document.querySelector('.page-features__button');

    navList.classList.add('page-header__nav--js');

    navButton.addEventListener('click', function () {
        this.classList.toggle('page-header__button--close');
        navList.classList.toggle('page-header__nav--open');
    })

    if (popUp) {
        popUp.addEventListener('click', function (etv) {
            if (etv.target === popUp ) {
                this.classList.remove('pop-up--open');
            };
        });
    };

    if (popUpBtn) {
        popUpBtn.addEventListener('click', function () {
            popUp.classList.add('pop-up--open')

        })
    }

};