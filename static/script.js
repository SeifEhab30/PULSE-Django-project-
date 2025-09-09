document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.querySelector('.select-container');
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const bgCustom = document.querySelectorAll('.bg-custom');
  const footer = document.querySelector('.footer');
  const aboutUs = document.querySelector('.about-us');
  const navitems = document.querySelectorAll('.nav-link');
  const navbarBrand = document.querySelector('.navbar-brand');
  const footersocials = document.querySelectorAll('.footer-socials');
  const disp = document.querySelectorAll('.disp');
  const productCards = document.querySelectorAll('.product-card');
  // const modalHeaders = document.querySelectorAll('.modal-header');
  const buttons = document.querySelectorAll('.btn-prod');

  // Load saved theme
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    applyTheme(savedTheme);
    if (themeSelector) themeSelector.value = savedTheme;
  }

  if (themeSelector) {
    themeSelector.addEventListener('change', function () {
      const selectedTheme = this.value;
      localStorage.setItem('selectedTheme', selectedTheme);
      applyTheme(selectedTheme);
    });
  }

  function applyTheme(themeValue) {
    // Remove old theme classes
    body.classList.remove('basketball', 'football');
    navbar?.classList.remove('basketball', 'football');
    bgCustom.forEach(item => item.classList.remove('basketball', 'football', 'text-dark'));
    footer?.classList.remove('basketball', 'football', 'text-dark');
    themeSelector?.classList.remove('text-dark');
    navbarBrand?.classList.remove('text-dark');
    navitems.forEach(item => item.classList.remove('text-dark'));
    footersocials.forEach(item => item.classList.remove('text-dark'));
    aboutUs?.classList.remove('text-dark', 'basketball', 'football');
    disp.forEach(item => item.classList.remove('basketball', 'football', 'text-dark'));
    productCards.forEach(item => item.classList.remove('basketball', 'football', 'text-dark'));
    // modalHeaders.forEach(item => item.classList.remove('basketball', 'football', 'text-dark'));
    buttons.forEach(item => item.classList.remove('btn-light'));
    buttons.forEach(item => item.classList.add('btn-dark'));

    // Apply selected theme
    if (themeValue === '2') {
      body.classList.add('basketball');
      navbar?.classList.add('basketball');
      bgCustom.forEach(item => item.classList.add('basketball'));
      footer?.classList.add('basketball');
      aboutUs?.classList.add('basketball');
      disp.forEach(item => item.classList.add('basketball'));
      productCards.forEach(item => item.classList.add('basketball'));
      // modalHeaders.forEach(item => item.classList.add('basketball'));
      buttons.forEach(item => item.classList.add('btn-light'));
      buttons.forEach(item => item.classList.remove('btn-dark'));
    } 
    else if (themeValue === '3') {
      body.classList.add('football');
      navbar?.classList.add('football');
      bgCustom.forEach(item => item.classList.add('football', 'text-dark'));
      footer?.classList.add('football', 'text-dark');
      aboutUs?.classList.add('football', 'text-dark');
      navitems.forEach(item => item.classList.add('text-dark'));
      themeSelector?.classList.add('text-dark');
      navbarBrand?.classList.add('text-dark');
      footersocials.forEach(item => item.classList.add('text-dark'));
      disp.forEach(item => item.classList.add('football', 'text-dark'));
      productCards.forEach(item => item.classList.add('football', 'text-dark'));
      // modalHeaders.forEach(item => item.classList.add('football', 'text-dark'));
      buttons.forEach(item => item.classList.remove('btn-light'));
      buttons.forEach(item => item.classList.add('btn-dark'));
    }
  }

  const isAuthed = document.body.dataset.auth === "true";
  const username = document.body.dataset.username || "";

  const showWhenIn  = document.querySelectorAll(".logged-in");
  const showWhenOut = document.querySelectorAll(".logged-out");
  const nameTarget  = document.getElementById("nav-username");

  if (isAuthed) {
    showWhenIn.forEach(el => el.style.display = "");
    showWhenOut.forEach(el => el.style.display = "none");
    if (nameTarget) nameTarget.textContent = username;
  } else {
    showWhenIn.forEach(el => el.style.display = "none");
    showWhenOut.forEach(el => el.style.display = "");
  }



  // const cartButtons = document.querySelectorAll('.add-to-cart');
  
  // cartButtons.forEach(button => {
    //   button.addEventListener('click', function () {
      
  //     if(!isAuthed){
  //      displayWarning(); 
  //     }
  //     else{
    //       displayError();
  //     }
  //   });
});


  // Select ALL buttons with the class 'add-to-cart'
  

  // Pagination setup
  const itemsPerPage = 6; // products per page
  let currentPage = parseInt( '1', 10);
  const productContainer = document.querySelector('.product-grid'); // parent element
  const productCardsArray = Array.from(document.querySelectorAll('.product-card'));
  const paginationContainer = document.querySelector('.pagination-container');
  // const rowsArray = Array.from(document.querySelectorAll('.row'));
  
  // Function to show a specific page
  function showPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  
  
  productCardsArray.forEach((card, index) => {
    card.style.display = (index >= start && index < end) ? 'block' : 'none';``
  });
  
  
  currentPage = page;
  updatePaginationButtons();
}

// Function to create pagination buttons
function updatePaginationButtons() {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(productCardsArray.length / itemsPerPage);
  
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.classList.add('pagination-btn','bg-custom');
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => showPage(i));
    paginationContainer.appendChild(btn);
  }
}

// Initialize pagination (keep page after refresh)
if (productCardsArray.length) {
  showPage(currentPage);
}
document.addEventListener("DOMContentLoaded", function () {
  // auth flag from body (make sure you set data-auth on body)
  const isAuthed = document.body.dataset.auth === "true";
  // selectors
  const errorMessage = document.querySelector('.error-message');
  const warning = document.querySelector('.warning');

  // helper to get inner msg span
  function setMsg(container, text) {
    if (!container) return;
    const msgSpan = container.querySelector('.msg-text');
    if (msgSpan) msgSpan.textContent = text;
    container.style.display = 'block';
  }
  function hideEl(container) {
    if (!container) return;
    container.style.display = 'none';
  }

  // wire close buttons (works for multiple if present)
  [errorMessage, warning].forEach(container => {
    if (!container) return;
    const closeBtns = container.querySelectorAll('.close');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        hideEl(container);
      });
    });
  });

  // attach add-to-cart handlers
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // stop navigation

      // not logged in -> show warning box
      if (!isAuthed) {
        setMsg(warning, "Please register or log in to add items to your cart.");
        return;
      }

      // logged in -> call endpoint
      const url = button.getAttribute('href');
      if (!url) {
        console.error("add-to-cart element missing href:", button);
        setMsg(errorMessage, "Could not add item to cart (no URL).");
        return;
      }

      fetch(url, {
        method: "GET", // or "POST" if your view expects POST (then include CSRF)
        headers: { "X-Requested-With": "XMLHttpRequest" }
      })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok: " + response.status);
        return response.json();
      })
      .then(data => {
        // show success message (use message from backend if present)
        setMsg(errorMessage, data.message || "Item added to cart.");
        // update cart-count badge if exists
        const cartCountEl = document.querySelector("#cart-count");
        if (cartCountEl && typeof data.cart_count !== 'undefined') {
          cartCountEl.textContent = data.cart_count;
        }
      })
      .catch(err => {
        console.error("Add to cart failed:", err);
        setMsg(errorMessage, "There was a problem adding the item to the cart.");
      });
    });
  });
});

