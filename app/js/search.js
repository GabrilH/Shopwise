window.onload = function () {
    var activeList = JSON.parse(localStorage.getItem("activeList"));

    if (activeList.name.length > 14) {
        document.getElementById("header-title").textContent = activeList.name.substring(0, 14) + "..." + " -> Pesquisar Produto:";
    } else {
        document.getElementById("header-title").textContent = activeList.name + " -> Pesquisar Produto:";
    }

    searchProduct();
}

function searchProduct() {

    const main = document.getElementById("main");
    const searchBox = document.getElementById("search-box");
    const icon = document.getElementById("mic-icon");

    searchBox.addEventListener("click", function () {

        var prevResults = document.getElementById("search-box-results");
        if (prevResults != null) {
            prevResults.remove();
        }

        if (document.getElementById("soundwave-gif") == null) {

            const soundwaveGif = document.createElement("img");
            soundwaveGif.id = "soundwave-gif";
            soundwaveGif.setAttribute("src", "images/soundwave.gif");

            const popup = document.createElement("div"); popup.id = "popup";
            const content = document.createElement("div"); content.id = "popup-content";

            popup.appendChild(content);
            popup.appendChild(soundwaveGif);
            searchBox.textContent = "";

            main.appendChild(popup);

            setTimeout(function () {

                searchBox.textContent = "Cerveja";
                searchBox.appendChild(icon);

                const results = ["Cerveja", "Cerveja sem Álcool"]; //no futuro vai-se buscar ao localstorage com regex maybe
                const resultsDiv = document.createElement("div");
                resultsDiv.id = "search-box-results";

                results.forEach(productName => {
                    var result = document.createElement("a");
                    result.textContent = productName;
                    result.classList = "product";
                    result.href = "search-results.html";
                    result.addEventListener("click", function () {
                        localStorage.setItem("searched-productName", JSON.stringify(productName));
                    })

                    resultsDiv.appendChild(result);
                });

                popup.remove();
                main.appendChild(resultsDiv);

            }, 2000);
        }
    })
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

    const text = document.createElement("p"); text.id = "help-text"; text.textContent = "Pesquise por produtos para adicionar à sua Lista de Compras";

    content.appendChild(text);
    content.appendChild(okBtn);

    helpDiv.appendChild(content);
    document.getElementById("main").appendChild(helpDiv);
}