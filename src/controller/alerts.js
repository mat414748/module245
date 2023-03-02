let freezeClick = false;
//Create a custom allert with customizable design
function customAlert(typeOfAlertMessage, alertMessage) {
    //Create DOM elements
    const shading = document.createElement("div");
    const alertWindow = document.createElement("div");
    const closeAlert = document.createElement("span");
    const alertText = document.createElement("strong");
    //Text
    closeAlert.innerText = "X";
    //Chose alert design 
    switch (typeOfAlertMessage) {
        case 1:
            alertWindow.className = "absolute top-0 bg-[rgb(244,31,31)] text-white w-[100%] h-[7rem] text-[40px] flex flex-row";
            alertText.innerText = "Error: " + alertMessage;
            break;
        case 2:
            alertWindow.className = "absolute top-0 bg-[rgb(232,228,34)] text-white w-[100%] h-[7rem] text-[40px] flex flex-row";
            alertText.innerText = "Warning: " + alertMessage;
            break;
        case 3:
            alertWindow.className = "absolute top-0 bg-green-500 text-white w-[100%] h-[7rem] text-[40px] flex flex-row";
            alertText.innerText = "Success: " + alertMessage;
            break;
    }
    //index
    const allIndexes = document.querySelectorAll("[tabindex]");
    for (let i = 0; i < allIndexes.length; i++) {
        allIndexes[i].tabIndex = -1;
    }
    closeAlert.tabIndex = 1;
    //Id for eacj alert element
    alertWindow.id = "alert";
    closeAlert.id = "close";
    shading.id = "darknessDungeon";
    //Design for close alert and shading div
    alertText.className = "mt-5";
    shading.className = "absolute bg-black opacity-25 top-28 h-[90vh] w-[98.7vw]";
    closeAlert.className = "float-right mr-[2.5rem] mt-5 ml-auto text-white text-[40px] cursor-pointer";
    //Close alert
    ["click", "keypress"].forEach(function(event) {
        closeAlert.addEventListener(event, function() {
            document.getElementById("alert").remove();
            document.getElementById("darknessDungeon").remove();
            freezeClick = false;
            document.addEventListener("click", handler, true);
            for (let i = 0; i < allIndexes.length; i++) {
                allIndexes[i].tabIndex = i+1;
            }
        })
    });
    //Connect all elements
    alertWindow.appendChild(alertText);
    alertWindow.appendChild(closeAlert);
    document.body.appendChild(alertWindow);
    document.body.appendChild(shading);
    //Freze window
    freezeClick = true;
    ["click", "keypress"].forEach(function(event) {
        document.addEventListener(event, handler, true);
    });
    //Change focus
    closeAlert.focus();
}
//Frezing function
function handler(event) {
    if (freezeClick) {
        if(event.target.id!=="close") {
            event.stopPropagation()
        }
    }
}