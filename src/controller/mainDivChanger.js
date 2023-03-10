let typeOfHomePage = 0;
let activeList = 0;
//Admin or User
let userType = 0;
let userLoginName = 0;
//Assigns a function to each button on the panel
function setEvent() {
    //Homepage function
    ["click","keypress"].forEach(function(event) {
        document.getElementById("homePage").addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                if (document.cookie.indexOf('token=') !== -1) {
                    userType = "admin";
                    typeOfHomePage = 1;
                } 
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
    welcome.className = "text-[70px] max-[768px]:text-[40px] max-[400px]:text-[30px] font-bold text-[#A88F15]";
    welcomeText.className = "text-[40px] max-[768px]:text-[20px] max-[400px]:text-[15px] font-bold w-[55%] max-[400px]:w-[60%] m-auto";
    subText.className = "text-[25px] max-[768px]:text-[20px] max-[400px]:text-[15px] italic w-[30%] max-[400px]:w-[50%] m-auto mt-5 mb-5";
    mainPageFunctions.className = "flex flex-row";
    mainDiv.className = "text-center mt-5";
    adminFunctions.className = "text-[40px] max-[768px]:text-[20px] max-[400px]:text-[15px] bg-[#8C7B5A] text-white border-4 border-black mt-5 pb-2 m-auto cursor-pointer focus:bg-[#C4AD7E] hover:bg-[#C4AD7E]";
    const buttonDesign = "text-[50px] max-[768px]:text-[20px] max-[400px]:text-[15px] border-4 border-black rounded-lg mt-5 pb-2 m-auto w-[30rem] max-[768px]:w-[10rem] cursor-pointer text-white";
    //Index and ID's
    loginHome.tabIndex = 1;
    roomSpaceList.id = "roomList";
    parkingSpaceList.id = "parkingList";
    //Login or logout type text
    welcome.innerText = "Greetings dear user";
    subText.innerText = "After work, don't forget to log out for security reasons";
    roomSpaceList.innerText = "Room space list";
    parkingSpaceList.innerText = "Parking space list";
    adminFunctions.innerText = "Admin Functions";
    if (typeOfHomePage === 1) {  
        if (document.cookie.indexOf('token=') === -1) {
            window.location.reload();
        } 
        expirationController();
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
        if (userType === "admin") {
            mainPageFunctions.appendChild(adminFunctions);
        }
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
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/src;";
    mainPage();
    customAlert(3,"Successful logout");
}

//Create head for the table
function createTableHead(tableHead, tableType, headType) {
    if (userType == "admin") {
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
        tableCell.className = tab + " w-[25%] ";
        tableCell.innerText = "Person";
        tableHead.appendChild(tableCell);
        //Time tab
        tableCell = document.createElement("td");
        tableCell.className = tab + " w-[15%]";
        tableCell.innerText = "Time";
        tableHead.appendChild(tableCell);
        if (headType === 0) {
            //Date tab
            tableCell = document.createElement("td");
            tableCell.className = tab + " w-[15%]";
            tableCell.innerText = "Date";
            tableHead.appendChild(tableCell);
        } else {
            //Next tab
            tableCell = document.createElement("td");
            tableCell.className = tab + " w-[15%]";
            tableCell.innerText = "Next";
            tableHead.appendChild(tableCell);
        }
        //Alt table
        const altTable = document.createElement("div");
        //Dummy tab
        tableCell = document.createElement("td");
        tableCell.className = tab + " w-[15%]";
        tableCell.innerText = "";
        tableCell.appendChild(altTable);
        tableHead.appendChild(tableCell);
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
        //If not a admin
    } else {
        //Place tab
        let tableCell = document.createElement("td");
        tableCell.className = tab + " w-[10%] mr-5";
        if (tableType === 0) {
            tableCell.innerText = "Room";
        } else {
            tableCell.innerText = "Place";
        }
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
        //Delete tab
        tableCell = document.createElement("td");
        tableCell.className = tab + " w-[15%]";
        tableCell.innerText = "Delete reservation";
        tableHead.appendChild(tableCell);

    }
}
//Create new line for the table
function createTableLine(tableData, rowId, altTableArray = 0, allReservationArray = 0) {
    //Create main elements
    const subTable = document.createElement("table");
    const tableLine = document.createElement("tr");
    const informationTable = document.createElement("div");
    //Set id for each line
    informationTable.id = "info" + rowId;
    //Time format 
    let altTabTimeCheck = 0;
    let fromTime = 0;
    let toTime = 0;
    if (tableData !== undefined) {
    fromTime = tableData.res_from;
    toTime = tableData.res_till;
    fromTime = fromTime.slice(0, -3);
    toTime = toTime.slice(0, -3);
    }
    if (userType == "admin") {
        if (tableData !== undefined) {
            if (altTableArray === 0) {
                //Place tab
                let tableCell = document.createElement("td");
                tableCell.className = tab + " w-[10%] mr-5";
                if (tableData.room === undefined) {
                    tableCell.innerText = tableData.spot;
                } else {
                    tableCell.innerText = tableData.room;
                }   
                tableLine.appendChild(tableCell);
                //Person tab
                tableCell = document.createElement("td");
                tableCell.className = tab + " w-[25%]";
                tableCell.innerText = tableData.user;
                tableLine.appendChild(tableCell);
                //Time tab
                tableCell = document.createElement("td");
                tableCell.className = tab + " w-[15%]";
                tableCell.innerText = fromTime + "-\n" + toTime;
                tableLine.appendChild(tableCell);
                //Date tab
                tableCell = document.createElement("td");
                tableCell.className = tab + " w-[15%]";
                tableCell.innerText = tableData.date;
                tableLine.appendChild(tableCell);
            } else {
                //Place tab
                let tableCell = document.createElement("td");
                tableCell.className = tab + " w-[10%] mr-5";
                if (tableData.room === undefined) {
                    tableCell.innerText = altTableArray.spot;
                } else {
                    tableCell.innerText = altTableArray.room;
                }   
                tableLine.appendChild(tableCell);
                //Status tab
                tableCell = document.createElement("td");
                tableCell.className = tab + " w-[15%]";
                tableCell.innerText = "Reserved";
                tableLine.appendChild(tableCell);
                //Person tab
                tableCell = document.createElement("td");
                tableCell.className = tab + " w-[25%]";
                tableCell.innerText = tableData.user;
                tableLine.appendChild(tableCell);
                //Time tab
                tableCell = document.createElement("td");
                tableCell.className = tab + " w-[15%]";
                tableCell.innerText = fromTime + "-\n" + toTime;
                tableLine.appendChild(tableCell);
                //Next tab
                tableCell = document.createElement("td");
                tableCell.className = tab + " w-[15%]";
                if (tableData.room === undefined) {
                    for (let i = 0; i < allReservationArray.length; i++) {
                        if (tableData.spot == allReservationArray[i].spot) {
                            if (altTabTimeCheck >= 1) {
                                tableCell.innerText = allReservationArray[i].date + "\n" + allReservationArray[i].res_from.slice(0, -3) + "-" + allReservationArray[i].res_till.slice(0, -3);
                                tableLine.appendChild(tableCell);
                            }
                            altTabTimeCheck++;
                        }
                    }
                } else {
                    for (let i = 0; i < allReservationArray.length; i++) {
                        if (tableData.room == allReservationArray[i].room) {
                            if (altTabTimeCheck >= 1) {
                                tableCell.innerText = allReservationArray[i].date + "\n" + allReservationArray[i].res_from.slice(0, -3) + "-" + allReservationArray[i].res_till.slice(0, -3); 
                                tableLine.appendChild(tableCell);
                            }
                            altTabTimeCheck++;
                        } 
                    } 
                    if (altTabTimeCheck === 1) {
                        tableCell.innerText = "---";
                        tableLine.appendChild(tableCell);
                    }
                }
            }
        } else {
            //Place tab
            let tableCell = document.createElement("td");
            tableCell.className = tab + " w-[10%] mr-5";
            if (altTableArray.room === undefined) {
                tableCell.innerText = altTableArray.spot;
            } else {
                tableCell.innerText = altTableArray.room;
            }   
            tableLine.appendChild(tableCell);
            //Status tab
            tableCell = document.createElement("td");
            tableCell.className = tab + " w-[15%]";
            tableCell.innerText = "Free";
            tableLine.appendChild(tableCell);
            //Person tab
            tableCell = document.createElement("td");
            tableCell.className = tab + " w-[25%]";
            tableCell.innerText = "---";
            tableLine.appendChild(tableCell);
            //Time tab
            tableCell = document.createElement("td");
            tableCell.className = tab + " w-[15%]";
            tableCell.innerText = "---";
            tableLine.appendChild(tableCell);
            //Next tab
            tableCell = document.createElement("td");
            tableCell.className = tab + " w-[15%]";
            tableCell.innerText = "---";
            tableLine.appendChild(tableCell);
        }
        //Normal user
    } else {
        console.log(altTableArray);
        //Place tab
        let tableCell = document.createElement("td");
        tableCell.className = tab + " w-[10%] mr-5";
        if (tableData.room === undefined) {
            tableCell.innerText = tableData.spot;
        } else {
            tableCell.innerText = tableData.room;
        }   
        tableLine.appendChild(tableCell);
        //Time tab
        tableCell = document.createElement("td");
        tableCell.className = tab + " w-[15%]";
        tableCell.innerText = fromTime + "-\n" + toTime;
        tableLine.appendChild(tableCell);
        //Date tab
        tableCell = document.createElement("td");
        tableCell.className = tab + " w-[15%]";
        tableCell.innerText = tableData.date;
        tableLine.appendChild(tableCell);
    }
    //Create functions for each line
    const deleteLine = document.createElement("div");
    //Text for function buttons
    deleteLine.innerText="???? Delete";
    //Design for elements
    deleteLine.className = "text-[25px] border-2  border-black rounded pt-2 pr-1 text-red-500 cursor-pointer float-left";
    tableLine.className = "bg-white w-auto";
    subTable.className = "m-auto border-separate border-spacing-y-5 w-[90%]";
    //Dummy tab
    tableCell = document.createElement("td");
    tableCell.className = "w-[15%]";
    tableCell.innerText = "";
    if (altTableArray === 0) {
        tableCell.appendChild(deleteLine);
    }
    tableLine.appendChild(tableCell);

    //Delete line
    deleteLine.addEventListener("click", function(event) {
        if (tableData.room === undefined) {
            deleteReservedParking(tableData);
        } else {
            deleteReservedRoom(tableData);
        }
    })
    //Connect all elements
    tableLine.appendChild(tableCell); 
    subTable.appendChild(tableLine);
    //return line
    if (userType == "admin") {
        return subTable;
    } else if (userType != "admin" && tableData.user == userLoginName) {
        return subTable;
    } else {
        return "skip";
    }
}
//Show list with all clients
function createList(tableType, headType = 0) {
    document.getElementById('homePage').click();
    //Create DOM elements
    const mainDiv = document.getElementById("mainDiv");
    const tableView = document.createElement("table");
    const tableHead = document.createElement("tr");
    //Create table head
    createTableHead(tableHead, tableType, headType);
    //Design for all elements
    tableHead.className = " bg-[#8AB5AE] w-auto";
    tableView.className = "m-auto border-separate border-spacing-y-5 w-[90%]";
    //Connect all elements
    tableView.appendChild(tableHead);
    mainDiv.appendChild(tableView);
    if (userType == "admin") {
        document.getElementById("altTable").scrollIntoView();
        document.getElementById("altTable").focus();
    }
    //Start generate lines
    if (tableType === 0 && headType === 0) {
        listOfReservedRooms();
    } else if (tableType === 1 && headType === 0){
        listOfReservedParkings();
    } else if (tableType === 0 && headType === 1) {
        listOfReservedRooms(1);
    } else if (tableType === 1 && headType === 1) {
        listOfReservedParkings(1);
    }
    
}
//On start click on mainpage
setEvent();
document.getElementById('homePage').click();