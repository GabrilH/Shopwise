const listsEx = [{
  "name": "Lista Exemplo",
  "products": [{
    "name": "Sagres",
    "price": 1.50,
    "quantity": 5
  },

  {
    "name": "Super Bock",
    "price": 1.75,
    "quantity": 10
  },

  {
    "name": "Ovo",
    "price": 2,
    "quantity": 15
  },
  ]
},

{
  "name": "Outra Lista",
  "products": [{
    "name": "Arroz",
    "price": 1,
    "quantity": 7
  }]
}];

const products = [{"name" : "Sagres", //adicionar categoria no futuro
                "price" : 1.00},

                {"name" : "Sagres Litrosa",
                "price" : 1.50},

                {"name" : "Sagres Minis",
                "price" : 0.80},

                {"name" : "Super Bock",
                "price" : 1.75},
                
                {"name" : "Heineken",
                "price" : 2.00},
               
                {"name" : "Ovo",
                "price" : 1.25},
               
                {"name" : "Arroz",
                "price" : 1.00},
               
                {"name" : "Bolacha",
                "price" : 2.50},
               
                {"name" : "Leite",
                "price" : 0.75},
               
                {"name" : "Água",
                "price" : 0.25}];

window.onload = function () {

  if (localStorage.getItem('lists') == null) {
    localStorage.setItem('lists', JSON.stringify(listsEx));
  }
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

  const text = document.createElement("p"); text.id = "help-text"; text.textContent = "Seja bem-vindo à ShopWise";

  content.appendChild(text);
  content.appendChild(okBtn);

  helpDiv.appendChild(content);
  document.getElementById("main").appendChild(helpDiv);
}