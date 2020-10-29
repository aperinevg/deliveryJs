const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const modalAuth = document.querySelector(".modal-auth");
const buttonAuth = document.querySelector(".button-primary");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardRestaurants = document.querySelector(".cards-restaurants");
const cardsRestaurants = document.querySelector('.cards-restaurants');
const menu = document.querySelector('.menu');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');


let login = localStorage.getItem('login');




function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth () {
  modalAuth.classList.toggle("is-open");
};



function authorized () {
  console.log("Авторизован");

  function logOut () {
    login ='';
    localStorage.removeItem('login');    
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';

    buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  userName.textContent = login;

  buttonOut.addEventListener('click', logOut);
}



function notAuthorized () {
  console.log("Не авторизован");

  function logIn (event) {
    event.preventDefault();
    if(!loginInput.value) { 
      loginInput.placeholder = 'Введите логин';
    } else {
      login = loginInput.value;
      localStorage.setItem('login', login);
      toggleModalAuth ();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      loginInput.placeholder ='';
      checkAuth();
    }
    
  };

  buttonAuth.addEventListener('click', toggleModalAuth);

  closeAuth.addEventListener('click', toggleModalAuth);

  logInForm.addEventListener('submit', logIn);
}
function checkAuth () {
  if (login) {
    authorized ()
  } else {
    notAuthorized ()
  }
}



function createCardRestaurant (){
  const card = `
    <a  class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
        
      </div>
    </a>
 `
 cardRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardsGood() {
  
  
    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
  
						<img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Везувий</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
									«Халапенье», соус «Тобаско», томаты.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">545 ₽</strong>
							</div>
						</div>
					
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);

  
  
  

}

function openGoods(event) {

  if (login) {
    const restaurant = event.target.closest('.card-restaurant');
    
    if (restaurant){
      cardsMenu.textContent = '';
      menu.classList.remove('hide');
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');

      createCardsGood();
      createCardsGood();
      createCardsGood();
    };
  } else {
    toggleModalAuth ();

  }

}




cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', () => {
    menu.classList.add('hide');
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
})



cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

createCardRestaurant ();
createCardRestaurant ();
createCardRestaurant ();
checkAuth ();