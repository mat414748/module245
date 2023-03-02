let typeOfHomePage = 0;

function setEvent() {
    document.getElementById("homePage").addEventListener("click", function() {
        mainPage();
    })

    document.getElementById("aboutUs").addEventListener("click", function() {
        aboutUsPage();
    })

    document.getElementById("loginLogout").addEventListener("click", function() {
        switch (typeOfHomePage) {
            case 0: 
                loginWindow();
                break;
            case 1:
                logout();
                mainPage();
                break;
        }
        
    })

    document.getElementById("clientList").addEventListener("click", function() {
        createClientList();
    })
}

function logout() {
    const login = document.getElementById("loginLogout");
    login.innerText = "Abmelden";
    document.getElementById("clientList").style.display = "block";
    login.onclick = function() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        login.innerText = "Anmelden";
        customAlert(3,"Erfolgreich Abgemeldet");
        document.getElementById("clientList").style.display = "none";
        typeOfHomePage = 0;
        mainPage();
        login.onclick = function() {
            loginWindow();
        };
    }
}

function loginWindow() {
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const title = document.createElement("div");
    const loginWindow = document.createElement("div");
    const username = document.createElement("div");
    const usernameInput = document.createElement("input");
    const password = document.createElement("div");
    const passwordInput = document.createElement("input");
    const signIn = document.createElement("div");

    title.innerText = "Bei Gruppe Rot anmelden";
    username.innerText = "Name";
    password.innerText = "Passwort";
    signIn.innerText = "Anmelden";

    usernameInput.id = "Name";
    passwordInput.id = "Passwort";

    const inputStyle = "text-[25px] text-left w-[30rem] m-auto border-2  border-black rounded placeholder:italic placeholder:text-slate-400";
    const labelStyle = "text-[40px] text-left w-[30rem] m-auto font-bold";
    usernameInput.placeholder = "Enter your username";
    passwordInput.placeholder = "Enter your password";

    title.className = "text-[40px] font-bold m-auto mb-2.5";
    username.className = labelStyle;
    usernameInput.className = inputStyle;
    password.className = labelStyle + " mt-10";
    passwordInput.className = inputStyle + " mb-10";
    signIn.className = "text-[40px] text-white bg-green-500 border-2 border-black rounded w-[30rem] mb-5 pb-2 m-auto cursor-pointer";
    loginWindow.className = "border-2  border-black bg-white rounded text-center w-[35rem] m-auto";
    mainDiv.className = mainDiv.className.replace("mt-20", "mt-0"); 

    signIn.addEventListener("click", function() {
        if (document.getElementById("username").value == "") {
            customAlert(1, "Bitte geben Sie den Benutzernamen ein");
        } else if (document.getElementById("password").value == "") {
            customAlert(1, "Bitte geben Sie das Passwort ein");
        } else {
            authentication(usernameInput, passwordInput);
        }
    })

    loginWindow.appendChild(username);
    loginWindow.appendChild(usernameInput);
    loginWindow.appendChild(password);
    loginWindow.appendChild(passwordInput);
    loginWindow.appendChild(signIn);
    mainDiv.appendChild(title);
    mainDiv.appendChild(loginWindow);
}

function mainPage() {
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const welcome = document.createElement("div");
    const welcomeText = document.createElement("div");
    const loginHome = document.createElement("div");

    if (typeOfHomePage === 1) {
        welcome.innerText = "Willkommen auf der Homepage";
        welcomeText.innerText = "Sehr geehrter Nuzer \n vergessen sie nicht sich abzumelden wenn sie Fertig mit arbeiten sind.";
        loginHome.innerText = "Abmelden";
    } else {
        welcome.innerText = "Willkommen auf der Homepage";
        welcomeText.innerText = "Sehr geehrter Nutzer \n melden sie sich bitte an";
        loginHome.innerText = "Anmelden";
    }

    welcome.className = "text-[40px] font-bold";
    welcomeText.className = "text-[40px]";
    loginHome.className = "text-[40px] bg-sky-400 border-4 border-black rounded-lg mt-5 pb-2 m-auto w-80 cursor-pointer";
    mainDiv.className = "text-center mt-20"

    loginHome.addEventListener("click", function() {
        switch (typeOfHomePage) {
            case 0: 
                loginWindow();
                break;
            case 1:
                const login = document.getElementById("loginLogout");
                login.click();
                break;
        }
            
    })
    mainDiv.appendChild(welcome);
    mainDiv.appendChild(welcomeText);
    mainDiv.appendChild(loginHome);
}

function aboutUsPage() {
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const aboutGrup = document.createElement("div");
    const aboutGrupText = document.createElement("div");
    const ourTeam = document.createElement("div");
    const ourTeamText = document.createElement("div");

    aboutGrup.innerText = "Über die Gruppe Rot";
    aboutGrupText.innerText = "Gruppe rot ist ein Team von CSBE-Studenten und diese Seite ist Teil ihres Projekts. Ziel des Projekts ist es, unsere erworbenen Fähigkeiten zu zeigen.";
    ourTeam.innerText = "Unser Team";
    ourTeamText.innerText = "Unser Team besteht aus Applikationsentwickler und Plattformentwicklern.\n appanwendungsentwickler: Dominic Streit, Denis Basler, Manuel Schibli, Matvej Levantsou, Ryad Mohamed, Timoteo Muñoz Blasco \n Plattworm-Entwickler: Björn Hari, Kevin Fledie, Yannis Nussbaumer. \n projektleitung: Manuel Schibli";

    aboutGrup.className = "text-[50px]";
    aboutGrupText.className = "text-[25px]";
    ourTeam.className = "text-[50px]";
    ourTeamText.className = "text-[25px]";
    mainDiv.className = "text-left"

    mainDiv.appendChild(aboutGrup);
    mainDiv.appendChild(aboutGrupText);
    mainDiv.appendChild(ourTeam);
    mainDiv.appendChild(ourTeamText);
}

function createTableHead(tableHead) {
    const tab = "text-[40px] text-left";
    let tableCell = document.createElement("td");
    tableCell.className = tab + " w-[20%]";
    tableCell.innerText = "Name";
    tableHead.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[10%]";
    tableCell.innerText = "Geschlecht";
    tableHead.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[25%]";
    tableCell.innerText = "Adresse";
    tableHead.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[25%]";
    tableCell.innerText = "E-mail";
    tableHead.appendChild(tableCell);

    tableCell = document.createElement("td");
    tableCell.className = tab;
    tableCell.innerText = "";
    tableHead.appendChild(tableCell);
}
function createTableLine(tableData, rowId) {
    const subTable = document.createElement("table");
    const tableLine = document.createElement("tr");
    const informationTable = document.createElement("div");
    informationTable.id = "info"+rowId;

    let subInfoState = true;
    const tab = "text-[20px] text-left bg-white";

    let tableCell = document.createElement("td");
    tableCell.className = tab + " w-[20%]";
    tableCell.innerText = tableData.name + tableData.surname;
    if (tableCell.innerText.length > 20) {
        tableCell.innerText = tableCell.innerText.slice(0, 20);
    }
    tableLine.appendChild(tableCell);   

    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[10%]";
    tableCell.innerText = tableData.sex;
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[25%]";
    tableCell.innerText = tableData.street + tableData.postcode + tableData.city;
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[25%]";
    tableCell.innerText = Object.values(tableData)[10];
    tableLine.appendChild(tableCell); 

    const deleteLine = document.createElement("div");
    const editLine = document.createElement("div");
    const moreInfo = document.createElement("div");
    moreInfo.id = rowId;
    
    deleteLine.innerText="🗑Löschen";
    editLine.innerText="Bearbeiten";
    moreInfo.innerText="V";

    deleteLine.className = "border-2  border-black rounded pt-2 pr-1 text-red-500 cursor-pointer";
    editLine.className = "ml-5 border-2  border-black rounded pt-2 pr-1 text-orange-500 cursor-pointer";
    moreInfo.className = "ml-5 font-bold text-[30px] cursor-pointer rotate-0";
    tableLine.className = "w-auto";
    subTable.className = "m-auto w-[100%] mt-10";

    tableCell = document.createElement("td");
    tableCell.className = "w-auto text-[20px] text-left bg-white flex flex-row w-auto";

    moreInfo.addEventListener("click", function() {
        if (subInfoState) {
            moreInfo.className = moreInfo.className.replace("rotate-0", "rotate-90");;
            informationTable.appendChild(subInformation(tableData));
            subTable.after(informationTable);
            subInfoState = false;
        } else {
            moreInfo.className = moreInfo.className.replace("rotate-90", "rotate-0");
            document.getElementById("info"+moreInfo.id).innerHTML = "";
            document.getElementById("info"+moreInfo.id).remove();
            subInfoState = true;
        }
    })

    deleteLine.addEventListener("click", function(event) {
        deleteClient(tableData.ID);
    })

    editLine.addEventListener("click", function() {
        createOrEditClient(1, tableData);
    })

    tableCell.appendChild(deleteLine);
    tableCell.appendChild(editLine);
    tableCell.appendChild(moreInfo);
    tableLine.appendChild(tableCell); 
    subTable.appendChild(tableLine);

    return subTable;
}

function createClientList() {
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const namePanel = document.createElement("div");
    const createAndSearch = document.createElement("div");
    const createClientButton = document.createElement("div");
    const searchField = document.createElement("input");
    const tableView = document.createElement("table");
    const tableHead = document.createElement("tr");
    createTableHead(tableHead);

    createAndSearch.className = "flex flex-row";
    searchField.className = "ml-40 text-[25px] text-left w-[30rem] m-auto border-2  border-black rounded placeholder:italic placeholder:text-slate-400";
    namePanel.className = "text-left text-[40px] font-bold";
    createClientButton.className = "text-left text-[40px] bg-green-500 text-white border-2  border-black w-[40%] font-bold mt-5 mb-5 cursor-pointer";
    tableHead.className = "bg-teal-400 w-auto";
    tableView.className = "m-auto border-separate border-spacing-y-5 w-[100%]";
    mainDiv.className = " w-[90%] m-auto " + mainDiv.className.replace("mt-20", "mt-5");
    
    namePanel.innerText = "Kundenmanager";
    createClientButton.innerText = "+ Neuen Kunden erstellen";

    createClientButton.addEventListener("click", function() {
        createOrEditClient();
    })

    createAndSearch.appendChild(createClientButton);
    createAndSearch.appendChild(searchField);
    tableView.appendChild(tableHead);
    mainDiv.appendChild(namePanel);
    mainDiv.appendChild(createAndSearch);
    mainDiv.appendChild(tableView);

    generateList();
}

function generateList() {
    getAllClients();
}

setEvent();
document.getElementById('homePage').click();