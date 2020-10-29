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
const restaurantTitle = document.querySelector('.restaurant-title');
const restaurantRating = document.querySelector('.rating')
const restaurantPrice = document.querySelector('.price')
const restaurantCategory = document.querySelector('.category') 


let login = localStorage.getItem('login');


const getData = async function(url){
  const respons = await fetch(url);
  if(!respons.ok) {
    throw new Error (`Ошибка по адресу ${url}`)
  }
  return await respons.json();
}


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



function createCardRestaurant (restaurant){
  const { image, kitchen, name, price, products, stars, time_of_delivery: timeOfDelivery } = restaurant
  

  const cardRestaurant = document.createElement('a');
  cardRestaurant.className = "card card-restaurant";
  cardRestaurant.products = products;
  cardRestaurant.info = {kitchen, name, price, stars};


  const card = `
    
      <img src=${image} alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
        
      </div>
    
 `
 cardRestaurant.insertAdjacentHTML('beforeend', card)
 cardRestaurants.insertAdjacentElement('beforeend', cardRestaurant);
}



function createCardsGood(goods) {
    const { description, name, price, image } = goods;
    
    
    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
  
						<img src=${image} alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
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

      const { name, kitchen, price, stars } = restaurant.info;
      
      
      restaurantTitle.textContent = name;
      restaurantRating.textContent = stars;
      restaurantPrice.textContent = `От ${price} Р`;
      restaurantCategory.textContent = kitchen;

      getData(`./db/${restaurant.products}`).then(function(data){
        data.forEach(createCardsGood)
      })

      

      
    };
  } else {
    toggleModalAuth ();

  }

}

function init (){
  getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant)
  })
  
  
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
  
  
  checkAuth ();
}
init();