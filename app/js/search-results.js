window.onload = function () {
    var productName = JSON.parse(localStorage.getItem("searched-productName"));
    searchResultsFor(productName);
}

function searchResultsFor(productName) {

    var activeList = JSON.parse(localStorage.getItem("activeList"));
  
    document.getElementById("header-title").textContent = "Pesquisa por: " + productName;
  
    const produtos = ["Sagres", "Super Bock", "Heineken"]; //nao sei como é que se vai buscar no futuro, maybe info de categorias idk
  
    const productsList = document.getElementById("search-product-list");
  
    produtos.forEach(productName => {
      var product = document.createElement("div");
      product.classList = "product";
      product.textContent = productName;
  
      var addButton = document.createElement('button');
      addButton.textContent = "+";
      product.appendChild(addButton);
  
      addButton.addEventListener('click', function () {
        addProductToActiveList(productName);
        activeList = JSON.parse(localStorage.getItem("activeList"));
        productAddedPopUp(productName);
      });
  
      productsList.appendChild(product);
    });
  }
  
  function addProductToActiveList(productName) { //talvez receber quantidade no futuro
  
    var activeList = JSON.parse(localStorage.getItem("activeList"));
  
    var products = activeList.products;
    var found = false;
    for (var i = 0; i < products.length && !found; i++) {
  
      if (products[i].name == productName) {
        products[i].quantity += 1;
        found = true;
      }
    }
  
    if (!found) {
      const newProduct = {
        "name": productName,
        "price": 4.20, //nao sei como ir buscar o preco
        "quantity": 1
      };
      products.push(newProduct);
    }
  
    var listsHTML = JSON.parse(localStorage.getItem("lists"));
    found = false;
    for (var i = 0; i < listsHTML.length && !found; i++) {
  
      if (listsHTML[i].name == activeList.name) {
        listsHTML[i].products = activeList.products;
        found = true;
      }
    }
  
    if (!found) {
      listsHTML.push(activeList);
    }
  
    localStorage.setItem("activeList", JSON.stringify(activeList));
    localStorage.setItem("lists", JSON.stringify(listsHTML));
  }

function productAddedPopUp(productName) {

  var activeList = JSON.parse(localStorage.getItem("activeList"));

  const popup = document.createElement("div"); popup.id = "popup";
  const content = document.createElement("div"); content.id = "popup-content";
  const text = document.createElement("p"); text.textContent = productName + " adicionado a " + activeList.name; 

  content.appendChild(text);
  popup.appendChild(content);
  document.getElementById("main").appendChild(popup);

  setTimeout(function () {
    popup.remove();
  }, 1500);
}

function toggleMenu() {
  const menu = document.getElementById('menu');

  if (menu.style.display == "none") {
      menu.style.display = "block";
  }

  else
      menu.style.display = "none";
}

function showHelpPopUp() {

  toggleMenu();

  const helpDiv = document.createElement("div"); helpDiv.id = "help-div";
  const content = document.createElement("div"); content.id = "help-content";

  const okBtn = document.createElement("button"); okBtn.classList = "button"; okBtn.id = "ok-button";
  okBtn.textContent = "Ok";
  okBtn.addEventListener("click", function () {
      helpDiv.remove();
  })

  const text = document.createElement("p"); text.id = "help-text"; text.textContent = "Clique no botão '+' para adicionar o produto à sua Lista de Compras";

  content.appendChild(text);
  content.appendChild(okBtn);

  helpDiv.appendChild(content);
  document.getElementById("main").appendChild(helpDiv);
}