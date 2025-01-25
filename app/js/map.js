window.onload = function () {
    zoom();
}

function zoom() {
    const zoomElement = document.querySelector(".zoom");
    let zoom = 1;
    const ZOOM_SPEED = 0.1;

    document.addEventListener("wheel", function(e) {  
        
        if(e.deltaY < 0){    
            zoomElement.style.transform = `scale(${zoom += ZOOM_SPEED})`;  
        }else{    
            zoomElement.style.transform = `scale(${zoom -= ZOOM_SPEED})`;  }

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

    const text = document.createElement("p"); text.id = "help-text"; text.textContent = "Pode dar scroll no rato para dar zoom no mapa";

    content.appendChild(text);
    content.appendChild(okBtn);

    helpDiv.appendChild(content);
    document.getElementById("main").appendChild(helpDiv);
}