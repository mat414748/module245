let typeOfHomePage = 0;
let activeList = 0;
//Label + input styles
const labelStyle = "text-[40px] text-left w-[30rem] m-auto mt-5 font-bold";
const inputStyle = "text-[30px] text-left w-[30rem] m-auto border-2 border-black rounded placeholder:italic placeholder:text-slate-400";
//Assigns a function to each button on the panel
function setEvent() {
    //Homepage function
    ["click","keypress"].forEach(function(event) {
        document.getElementById("homePage").addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                mainPage();
            }
        })
        //Room reservation function
        document.getElementById("roomSpace").addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                activeList = 0;
                reservation(0);
            }
        })
        //Parking reservation function
        document.getElementById("parkingSpace").addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                activeList = 0;
                reservation(1); 
            }
        })
    });
    //Show client list function
    /*
    document.getElementById("clientList").addEventListener("click", function() {
        createClientList();
    })
    */
}

//Show main page
function mainPage() {
    //Create all elements with DOM
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const welcome = document.createElement("div");
    const welcomeText = document.createElement("div");
    const subText = document.createElement("div");
    const loginHome = document.createElement("div");
    //Functions div
    const mainPageFunctions =  document.createElement("div");
    const roomSpaceList = document.createElement("div");
    const parkingSpaceList = document.createElement("div");
    const adminFunctions = document.createElement("div");
    //Design for all elements
    welcome.className = "text-[70px] font-bold text-[#A88F15]";
    welcomeText.className = "text-[40px] font-bold w-[55%] m-auto";
    subText.className = "text-[25px] italic w-[30%] m-auto mt-5 mb-5";
    mainPageFunctions.className = "flex flex-row";
    mainDiv.className = "text-center mt-5";
    adminFunctions.className = "text-[40px] bg-[#8C7B5A] text-white border-4 border-black mt-5 pb-2 m-auto cursor-pointer focus:bg-[#C4AD7E] hover:bg-[#C4AD7E]";
    const buttonDesign = "text-[50px] border-4 border-black rounded-lg mt-5 pb-2 m-auto w-[30rem] cursor-pointer text-white";
    //Index and ID's
    loginHome.tabIndex = 1;
    //Login or logout type text
    welcome.innerText = "Greetings dear user";
    subText.innerText = "After work, don't forget to log out for security reasons";
    roomSpaceList.innerText = "Room space list";
    parkingSpaceList.innerText = "Parking space list";
    adminFunctions.innerText = "Admin Functions";
    if (typeOfHomePage === 1) {  
        welcomeText.innerText = "Congratulations, you have successfully logged in as (User/Admin). Now you can reserve a parking space or a room.";
        loginHome.innerText = "Logout now";
        //Index
        roomSpaceList.tabIndex = 2;
        adminFunctions.tabIndex = 3;
        parkingSpaceList.tabIndex = 4;
        if (activeList === 1) {
            roomSpaceList.className = buttonDesign + " bg-[#8AB5AE]";
            parkingSpaceList.className = buttonDesign + " bg-[#698A85] focus:bg-[#8AB5AE] hover:bg-[#8AB5AE]";
        } else if (activeList === 2) {
            roomSpaceList.className = buttonDesign + " bg-[#698A85] focus:bg-[#8AB5AE] hover:bg-[#8AB5AE]";
            parkingSpaceList.className = buttonDesign + " bg-[#8AB5AE]";
        } else {
            roomSpaceList.className = buttonDesign + " bg-[#698A85] focus:bg-[#8AB5AE] hover:bg-[#8AB5AE]";
            parkingSpaceList.className = buttonDesign + " bg-[#698A85] focus:bg-[#8AB5AE] hover:bg-[#8AB5AE]";
        }
        loginHome.className = buttonDesign + " bg-[#590A10] focus:bg-[#A6131E] hover:bg-[#A6131E]";
        //Show
        document.getElementById("roomSpace").style.display = "block";
        document.getElementById("parkingSpace").style.display = "block";
    } else {
        welcomeText.innerText = "With the help of this website, you can reserve a room or a parking space. But before starting the reservation, please log in to the system.";
        loginHome.innerText = "Login now";
        loginHome.className = buttonDesign + " bg-[#025928] focus:bg-[#04A349] hover:bg-[#04A349]";
        //Hide
        document.getElementById("roomSpace").style.display = "none";
        document.getElementById("parkingSpace").style.display = "none";
    }
    //Functions
    ["click","keypress"].forEach(function(event) {
        //Additional login or logout button
        loginHome.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                switch (typeOfHomePage) {
                    case 0: 
                        loginWindow();
                        break;
                    case 1:
                        logout();
                        break;
                }
            }  
        });
        //Room and parking list buttons
        roomSpaceList.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                activeList = 1;
                createList(0);
            }  
        });
        parkingSpaceList.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                activeList = 2;
                createList(1);
            }  
        });
        //Admin button
        adminFunctions.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                activeList = 0;
                adminFunctionsPlace();
            }  
        });
    });
    
    //Connect all elements
    mainDiv.appendChild(welcome);
    mainDiv.appendChild(welcomeText);
    if (typeOfHomePage === 1) { mainDiv.appendChild(subText) };
    mainDiv.appendChild(loginHome);
    if (typeOfHomePage === 1) { 
        mainPageFunctions.appendChild(roomSpaceList);
        mainPageFunctions.appendChild(adminFunctions);
        mainPageFunctions.appendChild(parkingSpaceList);
        mainDiv.appendChild(mainPageFunctions) 
    };
}

//Show window on login
function loginWindow() {
    //Create all elements with DOM
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const title = document.createElement("div");
    const loginWindow = document.createElement("div");
    const username = document.createElement("div");
    const usernameInput = document.createElement("input");
    const password = document.createElement("div");
    const passwordInput = document.createElement("input");
    const signIn = document.createElement("div");
    //Set text for the elements
    title.innerText = "Sign in to Gruppe Rot";
    username.innerText = "Username";
    password.innerText = "Password";
    signIn.innerText = "Sign in";
    //Id for user and password inputs
    usernameInput.id = "username";
    passwordInput.id = "password";
    passwordInput.type = "password";
    //Plaseholders for inputs
    usernameInput.placeholder = "Enter your username";
    passwordInput.placeholder = "Enter your password";
    //Design for all elements
    title.className = "text-[70px] font-bold text-[#A88F15]";
    username.className = labelStyle;
    usernameInput.className = inputStyle;
    password.className = labelStyle + " mt-10";
    passwordInput.className = inputStyle + " mb-10";
    signIn.className = "text-[40px] text-white bg-[#025928] border-2 border-black rounded w-[30rem] mb-5 mt-5 pb-2 m-auto cursor-pointer focus:bg-[#04A349] hover:bg-[#04A349]";
    loginWindow.className = "border-2 border-black bg-white rounded text-center w-[40rem] m-auto";
    mainDiv.className = mainDiv.className.replace("mt-20", "mt-0"); 
    //Tab index
    usernameInput.tabIndex = 1;
    passwordInput.tabIndex = 2;
    signIn.tabIndex = 3;
    //Add function on click to "Sign in" button
    ["click","keypress"].forEach(function(event) {
        signIn.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                if (document.getElementById("username").value == "") {
                    customAlert(1, "Please enter the user name");
                } else if (document.getElementById("password").value == "") {
                    customAlert(1, "Please enter the password");
                } else {
                    authentication(usernameInput.value, passwordInput.value);
                }
            }  
        })
    });
    //Connect all elements
    loginWindow.appendChild(username);
    loginWindow.appendChild(usernameInput);
    loginWindow.appendChild(password);
    loginWindow.appendChild(passwordInput);
    loginWindow.appendChild(signIn);
    mainDiv.appendChild(title);
    mainDiv.appendChild(loginWindow);
}

//After logging in, it changes the functionality and appearance of the Login button
function logout() {
    typeOfHomePage = 0;
    mainPage();
    customAlert(3,"Successful logout");
    //Logout onclick
    /*login.onclick = function() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        login.innerText = "Login";
        customAlert(3,"Successfully logout");
        document.getElementById("clientList").style.display = "none";
        typeOfHomePage = 0;
        mainPage();
        //And again login
        login.onclick = function() {
            loginWindow();
        };
    }*/
}

//Create head for the table
function createTableHead(tableHead, tableType, headType) {
    //Style for all tabs
    const tab = "text-[40px] text-center";
    //Place tab
    let tableCell = document.createElement("td");
    tableCell.className = tab + " w-[10%] mr-5";
    if (tableType === 0) {
        tableCell.innerText = "Room";
    } else {
        tableCell.innerText = "Place";
    }
    tableHead.appendChild(tableCell);
    //Status tab
    if (headType === 1) {
        tableCell = document.createElement("td");
        tableCell.className = tab + " w-[15%]";
        tableCell.innerText = "Status";
        tableHead.appendChild(tableCell);
    }
    //Person tab
    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[25%]";
    tableCell.innerText = "Person";
    tableHead.appendChild(tableCell);
    //Time tab
    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[15%]";
    tableCell.innerText = "Time";
    tableHead.appendChild(tableCell);
    //Date tab
    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[15%]";
    tableCell.innerText = "Date";
    tableHead.appendChild(tableCell);
    //Alt table
    const altTable = document.createElement("div");
    //Dummy tab
    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[15%]";
    tableCell.innerText = "";
    tableCell.appendChild(altTable);
    tableHead.appendChild(tableCell);
    const tableHeadStyle = "text-[30px] border-4 border-black rounded-lg pb-2 m-auto cursor-pointer text-white";
    altTable.tabIndex = 5;
    altTable.id = "altTable";
    //Alt table 
    if (headType === 0) {
        altTable.innerText = "Live status";
        altTable.className = tableHeadStyle + " bg-[#590A10] focus:bg-[#A6131E] hover:bg-[#A6131E]";
        ["click","keypress"].forEach(function(event) {
            altTable.addEventListener(event, function(keyEvent) {
                if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                    createList(tableType, 1)
                }
            })
        });
    } else {
        altTable.innerText = "All reservation";
        altTable.className = tableHeadStyle + " bg-[#025928] focus:bg-[#04A349] hover:bg-[#04A349]";
        ["click","keypress"].forEach(function(event) {
            altTable.addEventListener(event, function(keyEvent) {
                if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                    createList(tableType, 0)
                }
            })
        });
    }
}
//Create new line for the table
function createTableLine(tableData, rowId) {
    //Create main elements
    const subTable = document.createElement("table");
    const tableLine = document.createElement("tr");
    const informationTable = document.createElement("div");
    //Set id for each line
    informationTable.id = "info"+rowId;
    //Subinformation statement
    let subInfoState = true;
    //Style for all tabs
    const tab = "text-[20px] text-left bg-white";
    //Full name tab
    let tableCell = document.createElement("td");
    tableCell.className = tab + " w-[20%]";
    tableCell.innerText = tableData.Name + " " + tableData.Surname;
    if (tableCell.innerText.length > 20) {
        tableCell.innerText = tableCell.innerText.slice(0, 20);
    }
    tableLine.appendChild(tableCell);   
    //Sex tab
    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[10%]";
    tableCell.innerText = tableData.Sex;
    tableLine.appendChild(tableCell);  
    //Adress tab
    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[25%]";
    tableCell.innerText = tableData.Street + tableData.Postcode + tableData.City;
    tableLine.appendChild(tableCell);  
    //E-Mail tab
    tableCell = document.createElement("td");
    tableCell.className = tab + " w-[25%]";
    tableCell.innerText = Object.values(tableData)[10];
    tableLine.appendChild(tableCell); 
    //Create functions for each line
    const deleteLine = document.createElement("div");
    const editLine = document.createElement("div");
    const moreInfo = document.createElement("div");
    //Set id for each subline
    moreInfo.id = rowId;
    //Text for function buttons
    deleteLine.innerText="🗑Delete";
    editLine.innerText="✏Edit";
    moreInfo.innerText="V";
    //Design for elements
    deleteLine.className = "border-2  border-black rounded pt-2 pr-1 text-red-500 cursor-pointer";
    editLine.className = "ml-5 border-2  border-black rounded pt-2 pr-1 text-orange-500 cursor-pointer";
    moreInfo.className = "ml-5 font-bold text-[30px] cursor-pointer rotate-0";
    tableLine.className = "w-auto";
    subTable.className = "m-auto w-[100%] mt-10";
    //Cell for all functions
    tableCell = document.createElement("td");
    tableCell.className = "w-auto text-[20px] text-left bg-white flex flex-row w-auto";
    //Show more information button
    moreInfo.addEventListener("click", function() {
        //If not open
        if (subInfoState) {
            moreInfo.className = moreInfo.className.replace("rotate-0", "rotate-90");;
            informationTable.appendChild(subInformation(tableData));
            subTable.after(informationTable);
            subInfoState = false;
        } 
        //If open
        else {
            moreInfo.className = moreInfo.className.replace("rotate-90", "rotate-0");
            document.getElementById("info"+moreInfo.id).innerHTML = "";
            document.getElementById("info"+moreInfo.id).remove();
            subInfoState = true;
        }
    })
    //Delete line
    deleteLine.addEventListener("click", function(event) {
        deleteClient(tableData.ID);
    })
    //Edit line
    editLine.addEventListener("click", function() {
        createOrEditClient(1, tableData);
    })
    //Connect all elements
    tableCell.appendChild(deleteLine);
    tableCell.appendChild(editLine);
    tableCell.appendChild(moreInfo);
    tableLine.appendChild(tableCell); 
    subTable.appendChild(tableLine);
    //return line
    return subTable;
}
//Show list with all clients
function createList(tableType, headType=0) {
    document.getElementById('homePage').click();
    //Create DOM elements
    const mainDiv = document.getElementById("mainDiv");
    const tableView = document.createElement("table");
    const tableHead = document.createElement("tr");
    //Create table head
    createTableHead(tableHead, tableType, headType);
    //Design for all elements
    tableHead.className = "bg-[#8AB5AE] w-auto";
    tableView.className = "m-auto border-separate border-spacing-y-5 w-[90%]";
    //Connect all elements
    tableView.appendChild(tableHead);
    mainDiv.appendChild(tableView);
    document.getElementById("altTable").scrollIntoView();
    document.getElementById("altTable").focus();
    //Start generate lines
    //generateList();
}
//Generate lines
function generateList() {
    getAllClients();
}
//On start click on mainpage
setEvent();
document.getElementById('homePage').click();