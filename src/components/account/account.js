import './account.css';
import services from '../../services/services.js';
import userAds from '../../components/templates/userAds.hbs';
import userFav from '../../components/templates/userFav.hbs';

const refs = {
  modal: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  content: document.querySelector('.lightbox__content'),
  btn: document.querySelector('button[data-action="close-lightbox"]'),
  ads: document.querySelector('.ads'),
  favorites: document.querySelector('.favorites'),
  headerBtn: document.querySelector('.account_btn'),
  wrapperAds: document.querySelector('.ads-wrapper'),
  wrapperFav: document.querySelector('.fav-wrapper'),
  wrapperTitleAds: document.querySelector('.title-wrapper-ads'),
  wrapperTitleFav: document.querySelector('.title-wrapper-fav'),
  lightboxTitleAds: document.querySelector('.lightbox__title-ads'),
  lightboxTitleFav: document.querySelector('.lightbox__title-fav'),
  popup: document.querySelector('.popup'),
  popupEnter: document.querySelector('.popup-enter'),
  popupExit: document.querySelector('.popup-exit'),
  popupEnterText: document.querySelector('.popup-enter-text'),
  popupExitText: document.querySelector('.popup-exit-text'),
  body: document.querySelector('body'),
  userName: document.querySelector('.account_btn-name'),
  accountBtn: document.querySelector('.account_btn'),
  menu: document.querySelector('.modal-menu'),
};

///------------------для мобилки

refs.menu.addEventListener('click', () => {
  const onMobile = document.querySelector('.loginOnMobile');
  const modalka = document.querySelector('#modalka');
  onMobile.addEventListener('click', e => {
    if (e.target === onMobile) {
      refs.modal.classList.add('is-open');
      modalka.setAttribute('class', 'menu-wrapper-none');
    }
  });

  //--------------открываем личный кабинет
  refs.modal.addEventListener('click', event => {
    if (
      event.target.nodeName == 'I' ||
      event.target == refs.btn ||
      event.target == refs.overlay
    ) {
      refs.modal.classList.remove('is-open');
    }

    //--------------добавляем объявления юзера
    if (
      event.target == refs.ads ||
      event.target == refs.wrapperAds ||
      event.target == refs.wrapperTitleAds ||
      event.target == refs.lightboxTitleAds
    ) {
      services.getUser(token).then(data => {
        refs.ads.innerHTML = userAds(data.data.ads);
      });
    }

    //----------------добавляем избранное
    if (
      event.target == refs.favorite ||
      event.target == refs.wrapperFav ||
      event.target == refs.wrapperTitleFav ||
      event.target == refs.lightboxTitleFav
    ) {
      services.getUserFavorites(token).then(data => {
        refs.favorites.innerHTML = userFav(data.data.user.favorites);
      });
    }

    let deleteButton = document.querySelector('.lightbox__content');

    deleteButton.addEventListener('click', event => {
      if (event.target.nodeName !== 'BUTTON') {
        return;
      }
  
      if (event.target.dataset.del) {
        const id = event.target.closest('li').dataset.id;
        services.deletedProduct(id);
      }
  
      // // if(evt.target.dataset.edit) {
      // //   //редактируем
      // // }
  
      services.getUserFavorites(token).then(data => {
        refs.favorites.innerHTML = userFav(data.data.user.favorites);
      });
    });
  });
});

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWJmNmJiNDA4ZTQwMjZhYTBlNjNmZiIsImlhdCI6MTU3NTc0NTIxMX0.TTIUMe21zVLseN_8Wu0hWTXcTa0nEWLZ5wdeKrBFJbQ';

//const token = localStorage.getItem('token');
//!!!!!!!!добавить local storage вместо токена

///--------------открываем popup
refs.body.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }

  if (event.target == refs.headerBtn || event.target == refs.userName) {
    refs.popup.style.display = 'block';
  }

  //---------------закрываем popup
  if (event.target !== refs.headerBtn && event.target !== refs.userName) {
    refs.popup.style.display = 'none';
  }
});

//----------------имя

if (localStorage.getItem('token')) {
  const userName = localStorage.getItem('userName');
  refs.userName.textContent = userName;
  refs.accountBtn.textContent = userName[0];
}

//---------------открываем модалку
refs.popupEnter.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }

  if (event.target == refs.popupEnter || event.target == refs.popupEnterText) {
    refs.modal.classList.add('is-open');
    refs.popup.style.display = 'none';
  }

  //---------------закрываем модалку
  refs.modal.addEventListener('click', event => {
    if (
      event.target.nodeName == 'I' ||
      event.target == refs.btn ||
      event.target == refs.overlay
    ) {
      refs.modal.classList.remove('is-open');
    }

    //--------------добавляем объявления юзера
    if (
      event.target == refs.ads ||
      event.target == refs.wrapperAds ||
      event.target == refs.wrapperTitleAds ||
      event.target == refs.lightboxTitleAds
    ) {
      services.getUser(token).then(data => {
        refs.ads.innerHTML = userAds(data.data.ads);
      });
    }

    //----------------добавляем избранное
    if (
      event.target == refs.favorite ||
      event.target == refs.wrapperFav ||
      event.target == refs.wrapperTitleFav ||
      event.target == refs.lightboxTitleFav
    ) {
      services.getUserFavorites(token).then(data => {
        refs.favorites.innerHTML = userFav(data.data.user.favorites);
      });
    }
  });

  //--------------удаляем объявления и снова отрисовываем!
  let deleteButton = document.querySelector('.lightbox__content');

  deleteButton.addEventListener('click', event => {
    if (event.target.nodeName !== 'BUTTON') {
      return;
    }

    if (event.target.dataset.del) {
      const id = event.target.closest('li').dataset.id;
      services.deletedProduct(id);
    }

    // if(evt.target.dataset.edit) {
    //   //редактируем
    // }

    services.getUserFavorites(token).then(data => {
      refs.favorites.innerHTML = userFav(data.data.user.favorites);
    });
  });
});