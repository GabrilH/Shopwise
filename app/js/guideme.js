window.onload = function () {
    guideMe();
}

function guideMe() {

    var activeList = JSON.parse(localStorage.getItem("activeList"));

    const headerTitle = document.getElementById("header-title");
    const main = document.getElementById("main");

    if (activeList.products.length != 0) {

        var activeProduct = activeList.products[0];
        headerTitle.textContent = "Produto: " + activeProduct.name;

        const man = document.getElementById("man-walking");

        const pin = document.createElement("img");
        pin.id = "map-pin";
        pin.setAttribute("src", "images/pin.png");

        pin.addEventListener("mousedown", function () {

            move(man);
            pin.remove();

            showScan();
        });

        main.appendChild(man);
        main.appendChild(pin);
    }

    else {
        headerTitle.textContent = "Lista Vazia";
    }
}

function move(man) {
    man.style.left = '130px';
    man.style.top = '170px';
}

function showScan() {


    const blackScreen = document.createElement("div"); blackScreen.id = "popup";
    const scanButton = document.createElement('a');
    scanButton.classList.add('button');
    scanButton.textContent = 'SCAN';
    scanButton.href = "scanner.html";
    scanButton.id = 'scan-button';

    main.appendChild(blackScreen);
    blackScreen.appendChild(scanButton);
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

    const text = document.createElement("p"); text.id = "help-text"; text.textContent = "Siga as indicações e desloque-se até ao sítio onde se encontra o produto";

    content.appendChild(text);
    content.appendChild(okBtn);

    helpDiv.appendChild(content);
    document.getElementById("main").appendChild(helpDiv);
}