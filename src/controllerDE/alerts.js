let freezeClick = false;

function customAlert(typeOfAlertMessage, alertMessage) {
    const shading = document.createElement("div");
    const alertWindow = document.createElement("div");
    const alertText = document.createElement("p");
    const closeAlert = document.createElement("span");
    const alertType = document.createElement("strong");

    alertText.innerText = alertMessage;
    closeAlert.innerText = "X";

    switch (typeOfAlertMessage) {
        case 1:
            alertWindow.className = "absolute top-0 bg-[rgb(244,31,31)] text-white w-[100%] h-[5rem] text-[40px] flex flex-row";
            alertType.innerText = "Fehler: ";
            break;
        case 2:
            alertWindow.className = "absolute top-0 bg-[rgb(232,228,34)] text-white w-[100%] h-[5rem] text-[40px] flex flex-row";
            alertType.innerText = "Warnung: ";
            break;
        case 3:
            alertWindow.className = "absolute top-0 bg-green-500 text-white w-[100%] h-[5rem] text-[40px] flex flex-row";
            alertType.innerText = "Erfolg: ";
            break;
    }
    
    alertWindow.id = "alert";
    closeAlert.id = "close";
    shading.id = "darknessDungeon";
    shading.className = "absolute bg-black opacity-25 top-20 h-[100%] w-[100%]";
    closeAlert.className = "float-right mr-[2.5rem] ml-auto text-white text-[40px] cursor-pointer"

    closeAlert.addEventListener("click", function() {
        document.getElementById("alert").remove();
        document.getElementById("darknessDungeon").remove();
        freezeClick = false;
        document.addEventListener("click", handler, true);
    })

    alertWindow.appendChild(alertType);
    alertWindow.appendChild(alertText);
    alertWindow.appendChild(closeAlert);
    document.body.appendChild(alertWindow);
    document.body.appendChild(shading);
    freezeClick = true;
    document.addEventListener("click", handler, true);
}

function handler(e) {
    if (freezeClick) {
        if(e.target.id!=="close") {
        e.stopPropagation()
        }
    }
}