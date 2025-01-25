window.onload = function () {
    var activeList = JSON.parse(localStorage.getItem("activeList"));
    shoppingListScreen(activeList);
}

function shoppingListScreen(list) {

    const headerTitle = document.getElementById("header-title");
    const main = document.createElement('div'); main.id = 'main';

    document.getElementById("pencil-icon").addEventListener('click', function () {
        toggleEditListName();
    });

    document.getElementById("header-title").addEventListener('click', function () {
        toggleEditListName();
    });

    document.getElementById("remove-icon").addEventListener('click', function () {
        doubleCheckDeleteList();
    });

    const productsList = document.getElementById("product-list");

    if (list == null) {
        const listname = checkDuplicateListName("Nova Lista");
        headerTitle.textContent = listname;
        list = {
            "name": listname,
            "products": []
        };

        var listsHTML = JSON.parse(localStorage.getItem("lists"));
        listsHTML.push(list);
        localStorage.setItem("lists", JSON.stringify(listsHTML));
    }

    else {
        let listname = list.name;

        if (listname.length > 11) {
            headerTitle.textContent = listname.substring(0, 10) + "...";
        } else {
            headerTitle.textContent = listname;
        }

        const products = list.products;

        products.forEach(product => {
            var productDiv = document.createElement("div");
            productDiv.classList = "product";
            productDiv.textContent = product.name;

            var removeButton = document.createElement('button'); removeButton.id = "reject-button";
            removeButton.textContent = "X";
            productDiv.appendChild(removeButton);

            removeButton.addEventListener('click', function () {
                doubleCheckRemoveProductPopup(productDiv, product.name);
            });

            productsList.appendChild(productDiv);
        });
    }

    localStorage.setItem("activeList", JSON.stringify(list));
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

//ha problemas com o regex
function checkDuplicateListName(listname) {

    var counter = 0;
    var listsHTML = JSON.parse(localStorage.getItem("lists"));
    listsHTML.forEach(list => {
        if (list.name.match(listname + "$| (#\\d+$)")) {
            counter++;
        }
    });

    if (counter > 0)
        listname += " #" + counter;

    return listname;
}

function changeListName(newListname) {

    var activeList = JSON.parse(localStorage.getItem("activeList"));

    var listsHTML = JSON.parse(localStorage.getItem("lists"));
    for (var i = 0; i < listsHTML.length; i++) {

        if (listsHTML[i].name == activeList.name) {
            activeList.name = newListname;
            listsHTML[i].name = newListname;
            break;
        }
    }

    localStorage.setItem("activeList", JSON.stringify(activeList));
    localStorage.setItem("lists", JSON.stringify(listsHTML));
}

function toggleEditListName() {

    const textbox = document.createElement("div");
    textbox.id = "change-list-name";
    const mic = document.createElement("img");
    mic.id = "mic-icon-list";
    mic.src = "images/soundwave.gif";
    const soundwaveGif = document.createElement("img");
    soundwaveGif.id = "soundwave-gif-list";
    soundwaveGif.setAttribute("src", "images/soundwave.gif");

    textbox.appendChild(soundwaveGif);
    textbox.appendChild(mic);

    document.getElementById("header-title").style = "display: none;";
    document.getElementById("pencil-icon").style = "display: none;";
    document.getElementById("remove-icon").style = "display: none;";
    header.appendChild(textbox);

    setTimeout(function () {

        let newListname = prompt("Nome da lista: ");

        if (newListname != null && newListname !== "") {
            changeListName(newListname);

            if (newListname.length > 11) {
                document.getElementById("header-title").innerHTML = newListname.substring(0, 10) + "...";
            } else {
                document.getElementById("header-title").innerHTML = newListname;
            }
        }

        textbox.remove();
        document.getElementById("header-title").style = "";
        document.getElementById("pencil-icon").style = "display: inline-block;";
        document.getElementById("remove-icon").style = "display: inline-block;";

    }, 1000);
}

function removeListFromStorage(listname) {
    listsHTML = JSON.parse(localStorage.getItem("lists"));

    for (var i = 0; i < listsHTML.length; i++) {
        if (listsHTML[i].name = listname) {
            listsHTML.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("lists", JSON.stringify(listsHTML));
}

function doubleCheckRemoveProductPopup(productDiv, productName) {

    var activeList = JSON.parse(localStorage.getItem("activeList"));

    const popup = document.createElement("div"); popup.id = "popup";
    const content = document.createElement("div"); content.id = "popup-content";

    const confirmBtn = document.createElement("button"); confirmBtn.classList = "button"; confirmBtn.id = "check-button";
    confirmBtn.textContent = "Sim";
    confirmBtn.addEventListener("click", function () {
        productDiv.remove();
        removeProductFromActiveList(productName);
        popup.remove();
    })

    const rejectBtn = document.createElement("button"); rejectBtn.classList = "button"; rejectBtn.id = "reject-button";
    rejectBtn.textContent = "Não";
    rejectBtn.addEventListener("click", function () {
        popup.remove();
    })

    const text = document.createElement("p");

    if (activeList.name.length > 30) {
        text.textContent = "Quer remover " + productName + " da lista " + activeList.name.substring(0, 30) + "..." + " ?";
    } else {
        text.textContent = "Quer remover " + productName + " da lista " + activeList.name + " ?";
    }

    content.appendChild(text);
    content.appendChild(rejectBtn);
    content.appendChild(confirmBtn);

    popup.appendChild(content);
    document.getElementById("main").appendChild(popup);
}

function doubleCheckDeleteList() {

    var activeList = JSON.parse(localStorage.getItem("activeList"));

    const popup = document.createElement("div"); popup.id = "popup";
    const content = document.createElement("div"); content.id = "popup-content";

    const confirmBtn = document.createElement("button"); confirmBtn.classList = "button"; confirmBtn.id = "check-button";
    confirmBtn.textContent = "Sim";
    confirmBtn.addEventListener("click", function () {
        removeListFromStorage(activeList.name);
        window.location.href = "lists.html";
    })

    const rejectBtn = document.createElement("button"); rejectBtn.classList = "button"; rejectBtn.id = "reject-button";
    rejectBtn.textContent = "Não";
    rejectBtn.addEventListener("click", function () {
        popup.remove();
    })

    const text = document.createElement("p");
    
    if (activeList.name.length > 30) {
        text.textContent = "Quer apagar a lista " + activeList.name.substring(0, 30) + "..." + " ?";
    } else {
        text.textContent = "Quer apagar a lista " + activeList.name + " ?";
    }

    content.appendChild(text);
    content.appendChild(rejectBtn);
    content.appendChild(confirmBtn);

    popup.appendChild(content);
    document.getElementById("main").appendChild(popup);
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

    const text = document.createElement("p"); text.id = "help-text"; text.textContent = "Lista de Compras onde pode mudar o seu nome, adicionar/remover produtos, guiar-se pela loja ou apagá-la";

    content.appendChild(text);
    content.appendChild(okBtn);

    helpDiv.appendChild(content);
    document.getElementById("main").appendChild(helpDiv);
}