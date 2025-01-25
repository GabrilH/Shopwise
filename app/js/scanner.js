window.onload = function () {
    var activeList = JSON.parse(localStorage.getItem("activeList"));
    productScanned(activeList.products[0]);
}

function productScanned(product) {

    //meter informacoes sobre product mais bonitas
    var productDiv = document.getElementById("product");
    productDiv.textContent = "Nome: " + product.name + " Preço: " + product.price;

    document.getElementById("check-button").addEventListener("click", function () {
        removeProductFromActiveList(product.name);
    });
}

function removeProductFromActiveList(productName) { //no futuro passar também quantidade a remover

    var activeList = JSON.parse(localStorage.getItem("activeList"));
  
    const products = activeList.products;
    for (var i = 0; i < products.length; i++) {
      if (products[i].name == productName)
        products.splice(i, 1);
    }
  
    var listsHTML = JSON.parse(localStorage.getItem("lists"));
    for (var i = 0; i < listsHTML.length; i++) {
  
      if (listsHTML[i].name == activeList.name) {
        listsHTML[i].products = activeList.products;
        break;
      }
    }
  
    localStorage.setItem("activeList", JSON.stringify(activeList));
    localStorage.setItem("lists", JSON.stringify(listsHTML));
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

    const text = document.createElement("p"); text.id = "help-text"; text.textContent = "Confirme que o produto (e o preço) apresentado é o correto";

    content.appendChild(text);
    content.appendChild(okBtn);

    helpDiv.appendChild(content);
    document.getElementById("main").appendChild(helpDiv);
}