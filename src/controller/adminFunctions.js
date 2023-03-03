function adminFunctionsPlace() {
    //Create all elements with DOM
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const createNewRoom = document.createElement("div");
    const deleteRoom = document.createElement("div");
    const createNewParking = document.createElement("div");
    const deleteParking = document.createElement("div");
    const cancel = document.createElement("div");
    const gridBody = document.createElement("div");
    //Design
    const buttonDesign = "text-[40px] border-4 border-black rounded-lg mt-5 m-auto w-[30rem] text-center cursor-pointer text-white";
    createNewRoom.className = buttonDesign + " bg-[#025928] focus:bg-[#04A349] hover:bg-[#04A349] leading-[150px]";
    deleteRoom.className = buttonDesign + " bg-[#590A10] focus:bg-[#A6131E] hover:bg-[#A6131E] leading-[150px]";
    createNewParking.className = buttonDesign + " bg-[#025928] focus:bg-[#04A349] hover:bg-[#04A349] leading-[150px]";
    deleteParking.className = buttonDesign + " bg-[#590A10] focus:bg-[#A6131E] hover:bg-[#A6131E] leading-[150px]";
    cancel.className = buttonDesign + " m-auto bg-[#698A85] focus:bg-[#8AB5AE] hover:bg-[#8AB5AE]";
    gridBody.className = "text-center w-[80rem] m-auto grid gap-0 grid-cols-2 grid-rows-2";
    //Spans
    //Create room
    let corrector = document.createElement("span");
    corrector.className = spanStyle;
    corrector.innerText = "Create new room space";
    createNewRoom.appendChild(corrector);
    //Create parking
    corrector = document.createElement("span");
    corrector.className = spanStyle;
    corrector.innerText = "Create new parking space";
    createNewParking.appendChild(corrector);
    //Delete room
    corrector = document.createElement("span");
    corrector.className = spanStyle;
    corrector.innerText = "Delete room space";
    deleteRoom.appendChild(corrector);
    //Delete parking
    corrector = document.createElement("span");
    corrector.className = spanStyle;
    corrector.innerText = "Delete parking space";
    deleteParking.appendChild(corrector);
    //Inner text
    cancel.innerText = "Cancel";
    //index
    createNewRoom.tabIndex = "1";
    createNewParking.tabIndex = "2";
    deleteRoom.tabIndex = "3";
    deleteParking.tabIndex = "4";
    cancel.tabIndex = "5";
    //Apply
    gridBody.appendChild(createNewRoom);
    gridBody.appendChild(createNewParking);
    gridBody.appendChild(deleteRoom);
    gridBody.appendChild(deleteParking);
    mainDiv.appendChild(gridBody);
    mainDiv.appendChild(cancel);
    //Functions
    ["click","keypress"].forEach(function(event) {
        cancel.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                document.getElementById('homePage').click();
            }  
        });
        createNewRoom.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                createPlace(1);
            }  
        });
        createNewParking.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                createPlace(2);
            }  
        });
        deleteRoom.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                deletePlace(1);
            }  
        });
        deleteParking.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                deletePlace(2);
            }  
        });
    });
}

function createPlace(typeOfPlace) {
    //Create all elements with DOM
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const title = document.createElement("div");
    const placeName = document.createElement("div");
    const inputPlaceName = document.createElement("input");
    const roomFloor = document.createElement("div");
    const inputRoomFloor = document.createElement("input");
    const createNow = document.createElement("div");
    //Text
    title.innerText = "Create a room place";
    if (typeOfPlace == 1) {
        placeName.innerText = "Room name";
        inputPlaceName.placeholder = "Enter a room name";
    } else {
        placeName.innerText = "Parking name";
        inputPlaceName.placeholder = "Enter a parking name";
    }
    roomFloor.innerText = "Floor";
    inputRoomFloor.placeholder = "Enter a room floor";
    createNow.innerText = "Create now";
    //Design
    title.className = "text-[70px] font-bold text-[#A88F15]";
    placeName.className = labelStyle;
    inputPlaceName.className = inputStyle;
    if (typeOfPlace == 1) {inputPlaceName.maxLength = "20"} else {inputPlaceName.maxLength = "3"};
    roomFloor.className = labelStyle;
    inputRoomFloor.className = inputStyle + " invalid:bg-[#590A10] invalid:text-white";
    inputRoomFloor.type = "number";
    inputRoomFloor.min = "-1";
    inputRoomFloor.max = "4";
    createNow.className = "text-[40px] text-white bg-[#025928] border-2 border-black rounded w-[30rem] mb-5 mt-5 pb-2 m-auto cursor-pointer focus:bg-[#04A349] hover:bg-[#04A349]";
    //Index
    inputPlaceName.tabIndex = "1";
    inputRoomFloor.tabIndex = "2";
    createNow.tabIndex = "3";
    //Change controller
    inputRoomFloor.addEventListener("change", function() {
        if (!inputRoomFloor.checkValidity()) {
            customAlert(2, "Floor mustn't be bigger than 4 or lower than -1");
            inputRoomFloor.value = 0;
        }
    });
    //Create
    ["click","keypress"].forEach(function(event) {
        if (typeOfPlace === 1) {
            createNow.addEventListener(event, function(keyEvent) {
                if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                    createRoom(inputPlaceName.value, inputRoomFloor.value);
                }  
            });
        } else {
            createNow.addEventListener(event, function(keyEvent) {
                if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                    createParking(inputPlaceName.value, inputRoomFloor.value);
                }  
            });
        }
    });
    //Apply
    mainDiv.appendChild(title);
    mainDiv.appendChild(placeName);
    mainDiv.appendChild(inputPlaceName);
    if (typeOfPlace == 1) {
        mainDiv.appendChild(roomFloor);
        mainDiv.appendChild(inputRoomFloor);
    }
    mainDiv.appendChild(createNow);
}

function deletePlace(typeOfPlace) {
    if (typeOfPlace === 1) {
        getAllRooms();
    } else {
        getAllParkings();
    }
    //Create all elements with DOM
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const title = document.createElement("div");
    const gridBody = document.createElement("div");
    //Left window
    const leftWindow = document.createElement("div");
    const listLabel = document.createElement("div");
    const selector = document.createElement("select");
    selector.id = "selector";
    //first select option
    const dummyOption = document.createElement("option");
    dummyOption.innerText = "List of places";
    dummyOption.className = optionStyle;
    dummyOption.selected = true;
    dummyOption.disabled = true;
    dummyOption.hidden = true;
    dummyOption.id = "dummyOption";
    selector.appendChild(dummyOption);
    //Right window
    const rightWindow = document.createElement("div");
    //Red status
    const reservedDiv = document.createElement("div");
    const reservedStatus = document.createElement("div");
    const redSquare = document.createElement("span");
    //Free status
    const freeDiv = document.createElement("div");
    const freeStatus = document.createElement("div");
    const greenSquare = document.createElement("span");
    //Reserve button
    const deleteNow = document.createElement("div");
    //Text
    listLabel.innerText = "Choose a place";
    reservedStatus.innerText = " - Can't be deleted now";
    freeStatus.innerText = " - Can be deleted now";
    deleteNow.innerText = "Delete now";
    //title type
    if (typeOfPlace === 1) {
        title.innerText = "Delete a room space";
    } else {
        title.innerText = "Delete a parking space";
    }
    //Classen
    title.className = "text-[70px] font-bold text-[#A88F15]";
    listLabel.className = "text-[50px]"
    selector.className = selectorStyle + " bg-[#698A85]";
    reservedDiv.className = "flex flex-row mt-20";
    freeDiv.className = "flex flex-row";
    reservedStatus.className = "text-[40px] text-left";
    freeStatus.className = "text-[40px] text-left";
    redSquare.className = "bg-[#590A10] w-[50px] h-[50px] border-4 border-black mt-2";
    greenSquare.className = "bg-[#025928] w-[50px] h-[50px] border-4 border-black mt-2";
    gridBody.className = "text-center w-[80rem] m-auto grid gap-0 grid-cols-2 grid-rows-1";
    deleteNow.className = "text-[40px] text-white border-2 border-black rounded w-[25rem] mb-5 mt-5 pb-2 m-auto cursor-pointer bg-[#590A10] focus:bg-[#A6131E] hover:bg-[#A6131E]";
    //Reserve now + index
    selector.tabIndex = 1;
    deleteNow.tabIndex = 2;
    ["click","keypress"].forEach(function(event) {
        if (typeOfPlace === 1) {
            deleteNow.addEventListener(event, function(keyEvent) {
                if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                    deleteRoom(selector.value);
                }
            });
        } else {
            deleteNow.addEventListener(event, function(keyEvent) {
                if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                    deleteParking(selector.value);
                }
            });
        }
    });
    //Apends
    //Reservation status append
    reservedDiv.appendChild(redSquare);
    reservedDiv.appendChild(reservedStatus);
    freeDiv.appendChild(greenSquare);
    freeDiv.appendChild(freeStatus);
    //Left
    leftWindow.appendChild(listLabel);
    leftWindow.appendChild(selector);
    //Right
    rightWindow.appendChild(reservedDiv);
    rightWindow.appendChild(freeDiv);
    //Body
    gridBody.appendChild(leftWindow);
    gridBody.appendChild(rightWindow);
    mainDiv.appendChild(title);
    mainDiv.appendChild(gridBody);
    mainDiv.appendChild(deleteNow);
}