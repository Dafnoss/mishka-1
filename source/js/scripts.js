
    var navList = document.querySelector('.page-header__nav');
    var navButton = document.querySelector('.page-header__button');
    var popUp = document.querySelector('.pop-up');
    var popUpBtn = document.querySelector('.page-features__button');
    var BasketsCatalog = document.querySelectorAll('.product-card__basket-icon');
    var map = document.querySelector('.page-contacts__image');
    var form = document.querySelector('.order__body');

    navList.classList.add('page-header__nav--js');

    navButton.addEventListener('click', function () {
        this.classList.toggle('page-header__button--close');
        navList.classList.toggle('page-header__nav--open');
    });

    if (popUp) {
        popUp.addEventListener('click', function (etv) {
            if (etv.target === popUp) {
                this.classList.remove('pop-up--open');
            }
        });
    }

    if (popUpBtn) {
        popUpBtn.addEventListener('click', function () {
            popUp.classList.add('pop-up--open')

        })
    }

    if (BasketsCatalog) {
        BasketsCatalog.forEach(function (item, index, arr) {
            item.addEventListener('click', function () {
                popUp.classList.add('pop-up--open');
            });
        })
    }

    function signUp (formObj) {
        var config = {
            apiKey: "AIzaSyCnonepIvEoUsdNMR2Vx1hTT7kRLclSono",
            authDomain: "empirical-vial-203519.firebaseapp.com",
            databaseURL: "https://empirical-vial-203519.firebaseio.com",
            projectId: "empirical-vial-203519",
            storageBucket: "empirical-vial-203519.appspot.com",
            messagingSenderId: "62726786832"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        var mailsRef = firebase.database().ref('emails');
        var newMailRef = mailsRef.push();
        newMailRef.set({
            mail: formObj.email.value,
            test: 'test'
        });

    }

    if (form) {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            return signUp(this);
        })
    }