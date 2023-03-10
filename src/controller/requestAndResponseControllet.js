//Result of each request
let requestResult = 0;

//POST
//Create room
function createRoom(room, floor) {
    //Data block
    const newFloor = parseInt(floor);
    const data = {
        room: room,
        floor: newFloor
    };
    request = new XMLHttpRequest();
    request.open("POST", "/API/V1/CreateRoom");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//Reserve room
function reserveRoom(room, date, timeFrom, timeTo) {
    userLoginName = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
    //Data block
    const data = {
        room: room,
        date: date,
        timeFrom: timeFrom,
        timeTo: timeTo,
        user: userLoginName
    };
    request = new XMLHttpRequest();
    request.open("POST", "/API/V1/ReserveRoom");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//Create parking
function createParking(spot) {
    //Data block
    const data = {
        parking: spot
    };
    request = new XMLHttpRequest();
    request.open("POST", "/API/V1/CreateParking");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//Reserve parking
function reserveParking(spot, date, timeFrom, timeTo) {
    userLoginName = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
    //Data block
    const data = {
        spot: spot,
        date: date,
        timeFrom: timeFrom,
        timeTo: timeTo,
        user: userLoginName
    };
    request = new XMLHttpRequest();
    request.open("POST", "/API/V1/ReserveParking");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//Get response from server after PUT or POST requests
function requestCreateAndUpdate(event) {
    if (request.readyState < 4) {
        return;
    } 
    const requestAnswer = request.responseText.split(/\r?\n/);
    const answer = JSON.parse(requestAnswer[requestAnswer.length - 1]);
    document.getElementById('homePage').click();
    customAlert(3, answer.message);
}

//DELETE
//Delete room
function deleteRoom(name) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/Room/" + name);
    request.onreadystatechange = requestDelete; 
    request.send();
}
//Delete reserved room
function deleteReservedRoom(roomData) {
    const data = {
        room: roomData.room,
        date: roomData.date,
        timeFrom: roomData.res_from,
        timeTo: roomData.res_till,
        user: roomData.user
    };
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedRoom/" + roomData.id);
    request.onreadystatechange = requestDelete; 
    request.send(JSON.stringify(data));
}
//Delete parking
function deleteParking(name) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/Parking/" + name);
    request.onreadystatechange = requestDelete; 
    request.send();
}
//Delete reserved parking
function deleteReservedParking(spotData) {
    const data = {
        room: spotData.spot,
        date: spotData.date,
        timeFrom: spotData.res_from,
        timeTo: spotData.res_till,
        user: spotData.user
    };
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedParking/" + spotData.id);
    request.onreadystatechange = requestDelete; 
    request.send(JSON.stringify(data));
}
//Answer for DELETE request
function requestDelete(event) { 
    if (request.readyState < 4) {
        return;
    } 
    const requestAnswer = request.responseText.split(/\r?\n/);
    const answer = JSON.parse(requestAnswer[requestAnswer.length - 1]);
    if (event.currentTarget.responseURL.includes("/API/V1/Room") || event.currentTarget.responseURL.includes("/API/V1/Parking")) {
        document.getElementById('homePage').click();
    } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedRoom")) {
        document.getElementById('roomList').click();
    } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedParking")) {
        document.getElementById('parkingList').click();
    }
    customAlert(3, answer.message);
}

//GET ALL
//Get all rooms
function getAllRooms() {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/Rooms");

    request.onreadystatechange = getForDeleteOrCreate; 
    request.send();
}
//Get all reserved rooms
function getAllReservedRooms(allPlacesArray) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedRooms");
    request.onreadystatechange = function() {
        getForDeleteOrCreate(event, allPlacesArray); 
    };
    request.send();
}

//List of reserved rooms
function listOfReservedRooms(altTable = 0) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedRooms");
    request.onreadystatechange = function() {
        getForList(event, altTable);
    }
    request.send();
}
//Alt list of reserved rooms
function altListOfReservedRooms(allPlacesArray) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/Rooms");
    request.onreadystatechange = function() {
        getForList(event, 1, allPlacesArray); 
    };
    request.send();
}

//Get all parkings
function getAllParkings() {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/Parkings");
    request.onreadystatechange = getForDeleteOrCreate; 
    request.send();
}
//Get all reserved parkings
function getAllReservedParkings(allParkings) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedParkings");
    request.onreadystatechange = function() {
        getForDeleteOrCreate(event, allParkings); 
    };
    request.send();
}

//List of reserved parking
function listOfReservedParkings(altTable = 0) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedParkings");
    request.onreadystatechange = function() {
        getForList(event, altTable);
    }
    request.send();
}
//Alt list of reserved parkings
function altListOfReservedParkings(allPlacesArray) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/Parkings");
    request.onreadystatechange = function() {
        getForList(event, 1, allPlacesArray); 
    };
    request.send();
}

//Answer for GET all request
//Get for delete and create
function getForDeleteOrCreate(event, allPlacesArray = 0) { 
    if (request.readyState < 4) {
        return;
    } 
    roomOrParkingumber = 0;
    const answer = JSON.parse(request.responseText);
    const selector = document.getElementById("selector");
    const dateChoose = document.getElementById("dateChoose");
    const fromTime = document.getElementById("fromTime");
    const toTime = document.getElementById("toTime");
    const reservedPlaces = answer.message;
    const actualTime = parseInt(new Date().toJSON().slice(11, 13)) * 3600 + parseInt(new Date().toJSON().slice(14, 16)) * 60 + 3600;
    const actualDate = new Date().toJSON().slice(0, 10);
    if (event.currentTarget.responseURL.includes("/API/V1/Rooms")) {
        getAllReservedRooms(answer.message);
    } else if (event.currentTarget.responseURL.includes("/API/V1/Parkings")) {
        getAllReservedParkings(answer.message);
    //Room reservation
    } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedRooms")) {
        //If reservation don't exist 
        if (answer.message.includes("No reserved")) {
            for (let i = 0; i < allPlacesArray.length; i++) {
                const option = document.createElement("option");
                option.className = optionStyle + " bg-[#025928]";
                option.innerText = allPlacesArray[i].room;
                selector.appendChild(option);
            }
        } else {
            selector.addEventListener("changeAccess", function() { 
                selector.innerHTML = "";
                for (let i = 0; i < allPlacesArray.length; i++) {
                    const option = document.createElement("option");
                    for (let j = 0; j < reservedPlaces.length; j++) {
                        if (allPlacesArray[i].room == reservedPlaces[j].room) {
                            if (dateChoose.value == reservedPlaces[j].date) {
                                if (fromTime.value < reservedPlaces[j].res_from.slice(0, 5) && toTime.value < reservedPlaces[j].res_from.slice(0, 5) || fromTime.value > reservedPlaces[j].res_till.slice(0, 5) && toTime.value > reservedPlaces[j].res_till.slice(0, 5)) {
                                    option.className = optionStyle + " bg-[#025928]"
                                    roomOrParkingumber ++;
                                } else {
                                    option.className = optionStyle + " bg-[#590A10]";
                                    option.disabled = true;
                                }
                            } else {
                                option.className = optionStyle + " bg-[#025928]"
                                roomOrParkingumber ++;
                            }
                        } 
                    }
                    if (option.className == "") {
                        option.className = optionStyle + " bg-[#025928]"
                        roomOrParkingumber ++;
                    }
                    option.innerText = allPlacesArray[i].room;
                    selector.appendChild(option);
                }
            });
            selector.dispatchEvent(new Event("changeAccess"));
        }
        document.getElementById("freeSpace").innerText = "Free rooms now " + roomOrParkingumber + "/" + String((parseInt(selector.length)));
    //Parking reservation
    } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedParkings")) {
        if (answer.message.includes("No reserved")) {
            for (let i = 0; i < allPlacesArray.length; i++) {
                const option = document.createElement("option");
                option.className = optionStyle + " bg-[#025928]";
                option.innerText = allPlacesArray[i].spot;
                selector.appendChild(option);
            }
        } else {
            selector.addEventListener("changeAccess", function() { 
                selector.innerHTML = "";
                for (let i = 0; i < allPlacesArray.length; i++) {
                    const option = document.createElement("option");
                    for (let j = 0; j < reservedPlaces.length; j++) {
                        if (allPlacesArray[i].spot == reservedPlaces[j].spot) {
                            if (dateChoose.value == reservedPlaces[j].date) {
                                if (fromTime.value < reservedPlaces[j].res_from.slice(0, 5) && toTime.value < reservedPlaces[j].res_from.slice(0, 5) || fromTime.value > reservedPlaces[j].res_till.slice(0, 5) && toTime.value > reservedPlaces[j].res_till.slice(0, 5)) {
                                    option.className = optionStyle + " bg-[#025928]"
                                    roomOrParkingumber ++;
                                } else {
                                    option.className = optionStyle + " bg-[#590A10]";
                                    option.disabled = true;
                                }
                            } else {
                                option.className = optionStyle + " bg-[#025928]"
                                roomOrParkingumber ++;
                            }
                        } 
                    }
                    if (option.className == "") {
                        option.className = optionStyle + " bg-[#025928]"
                        roomOrParkingumber ++;
                    }
                    option.innerText = allPlacesArray[i].spot;
                    selector.appendChild(option);
                }
            });
            selector.dispatchEvent(new Event("changeAccess"));
        }
        document.getElementById("freeSpace").innerText = "Free parkings now " + roomOrParkingumber + "/" + String((parseInt(selector.length)));
    }
}

//Get for list
function getForList(event, altTable, listArray = 0) { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    const mainDiv = document.getElementById("mainDiv");
    if (altTable === 0) {
        if (answer.message.includes("No reserved")) {
            customAlert(2, answer.message);
        } else {
            for (let i = 0; i < answer.message.length; i++) {
                if (createTableLine(answer.message[i], i) !== "skip") {
                    mainDiv.appendChild(createTableLine(answer.message[i], i));
                }
            }
        }
    } else {
        if (event.currentTarget.responseURL.includes("/API/V1/ReservedRooms")) {
            altListOfReservedRooms(answer.message);
        } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedParkings")) {
            altListOfReservedParkings(answer.message);
        } else if (event.currentTarget.responseURL.includes("/API/V1/Rooms") || event.currentTarget.responseURL.includes("/API/V1/Parkings")) {
            for (let i = 0; i < answer.message.length; i++) {
                if (createTableLine(listArray[i], i, answer.message[i], listArray) !== "skip") {
                    mainDiv.appendChild(createTableLine(listArray[i], i, answer.message[i], listArray));
                } 
            }
        }
    }
}
//AUTHENTICATION
function authentication(name, password) {
    //Data block
    const data = {
            username: name,
            password: password
    };
    request = new XMLHttpRequest();
    request.open("POST", "/API/V1/Authentication");
    request.onreadystatechange = function() {
        requestAuthentication(name); 
    };
    request.send(JSON.stringify(data));
}
//Answer after POST authentication request
function requestAuthentication(name) { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    if (answer.message.includes("Invalid")) {
        customAlert(2, "Wrong password or username");   
    } else if (answer.message.includes("created")) {
        customAlert(3, "Succesfully login");
        typeOfHomePage = 1;
        userType = "admin";
        document.cookie = "username=" + name;
        userLoginName = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
        mainPage();
    } 
}

//Annihilator
//Get all
function fullClearReservedRooms() {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedRooms");
    request.onreadystatechange = deleteExpiredData;
    request.send();
}
function fullClearReservedParkings() {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedParkings");
    request.onreadystatechange = deleteExpiredData;
    request.send();
}
//Delete all
function clearRooms(roomData) {
    const data = {
        room: roomData.room,
        date: roomData.date,
        timeFrom: roomData.res_from,
        timeTo: roomData.res_till,
        user: roomData.user
    };
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedRoom/" + roomData.id);
    request.onreadystatechange = console.log("Cleared room"); 
    request.send(JSON.stringify(data));
}
function clearParkings(spotData) {
    const data = {
        room: spotData.spot,
        date: spotData.date,
        timeFrom: spotData.res_from,
        timeTo: spotData.res_till,
        user: spotData.user
    };
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedParking/" + spotData.id);
    request.onreadystatechange = console.log("Cleared parking"); 
    request.send(JSON.stringify(data));
}

function deleteExpiredData(event) {
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    //Actual time
    const actualTime = parseInt(new Date().toJSON().slice(11, 13)) * 3600 + parseInt(new Date().toJSON().slice(14, 16)) * 60 + 3600;
    for (let i = 0; i < answer.message.length; i++) {
        let deadLine = 1000000000000000;
        try {
            deadLine = parseInt(answer.message[i].res_till.slice(0, 2)) * 3600 + parseInt(answer.message[i].res_till.slice(3, 5)) * 60;
        } catch (pizdec) {
        }
        if (answer.message[i].date < new Date().toJSON().slice(0, 10) || deadLine < actualTime && answer.message[i].date == new Date().toJSON().slice(0, 10)) {
            if (event.currentTarget.responseURL.includes("/API/V1/ReservedRooms")) {
                clearRooms(answer.message[i]);
            } else {
                clearParkings(answer.message[i]);
            }
        }
    } 
    if (event.currentTarget.responseURL.includes("/API/V1/ReservedRooms")) {
        fullClearReservedParkings();
    } 
}