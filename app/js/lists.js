window.onload = function () {
    shoppingListsScreen();
}

function shoppingListsScreen() {

    const listsDiv = document.getElementById("shopping-lists");

    const lists = JSON.parse(localStorage.getItem('lists'));

    if (lists[0] != null) {
        lists.forEach(function (list) {
            var listDiv = document.createElement('a');
            listDiv.classList.add('button');

            if (list.name.length > 16) {
                listDiv.textContent = list.name.substring(0, 16) + "...";
            } else {
                listDiv.textContent = list.name;
            }

            listDiv.href="active-list.html"
            listDiv.addEventListener("click", function () {
                localStorage.setItem("activeList", JSON.stringify(list)); 
            });
            
            listsDiv.appendChild(listDiv);
        });
    }

    const newList = document.getElementById("new-list");

    newList.addEventListener("click", function () {
        localStorage.setItem("activeList", null); 
    });
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

    const text = document.createElement("p"); text.id = "help-text"; text.textContent = "As suas Listas de Compras";

    content.appendChild(text);
    content.appendChild(okBtn);

    helpDiv.appendChild(content);
    document.getElementById("main").appendChild(helpDiv);
}