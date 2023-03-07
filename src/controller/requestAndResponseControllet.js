//Result of each request
let requestResult = 0;
//PUT 
function updateClient(id, name, surname, sex, email, creditRaiting, street, postcode, city, billingAdress, privatePhonenumber, companyPhonenumber) {
    //Data block
    var data = {
        Name: name,
        Surname: surname,
        Sex: sex,
        email: email,
        CreditRaiting: creditRaiting,
        Street: street,
        Postcode: postcode,
        City: city,
        billingAddress: billingAdress,
        phonenumberCompany: privatePhonenumber,
        phonenumberPrivate: companyPhonenumber,
        joinDate: Date.now(),
        VIP: 1,
        highFrequency: 1,
        creditRating: 1,
        debt: 1,
        creditcard: 4444555566667777,
        bill: "5",
        prepayment: 0
    };
    request = new XMLHttpRequest();
    request.open("PUT", "/API/V1/Client/" + id);
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}

//POST
//Create room
function createRoom(room, floor) {
    //Data block
    const newFloor = parseInt(floor);
    var data = {
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
    const username = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
    //Data block
    var data = {
        room: room,
        date: date,
        timeFrom: timeFrom,
        timeTo: timeTo,
        user: username
    };
    request = new XMLHttpRequest();
    request.open("POST", "/API/V1/ReserveRoom");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//Create parking
function createParking(spot) {
    //Data block
    var data = {
        parking: spot
    };
    request = new XMLHttpRequest();
    request.open("POST", "/API/V1/CreateParking");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//Reserve parking
function reserveParking(spot, date, timeFrom, timeTo) {
    const username = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
    //Data block
    var data = {
        spot: spot,
        date: date,
        timeFrom: timeFrom,
        timeTo: timeTo,
        user: username
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
    const answer = JSON.parse(request.responseText);
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
function deleteReservedRoom(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedRoom/" + id);
    request.onreadystatechange = requestDelete; 
    request.send();
}
//Delete parking
function deleteParking(name) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/Parking/" + name);
    request.onreadystatechange = requestDelete; 
    request.send();
}
//Delete reserved parking
function deleteReservedParking(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedParking/" + id);
    request.onreadystatechange = requestDelete; 
    request.send();
}
//Answer for DELETE request
function requestDelete(event) { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
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
function getAllReservedRooms(allRoomsArray) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedRooms");
    request.onreadystatechange = function() {
        getForDeleteOrCreate(event, allRoomsArray); 
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
function altListOfReservedRooms(allRoomsArray) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/Rooms");
    request.onreadystatechange = function() {
        getForList(event, 1, allRoomsArray); 
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
function altListOfReservedParkings(allRoomsArray) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/Parkings");
    request.onreadystatechange = function() {
        getForList(event, 1, allRoomsArray); 
    };
    request.send();
}

//Answer for GET all request
//Get for delete and create
function getForDeleteOrCreate(event, allRoomsArray = 0) { 
    if (request.readyState < 4) {
        return;
    } 
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
            for (let i = 0; i < allRoomsArray.length; i++) {
                const option = document.createElement("option");
                option.className = optionStyle + " bg-[#025928]";
                option.innerText = allRoomsArray[i].room;
                selector.appendChild(option);
            }
        } else {
            selector.addEventListener("changeAccess", function() { 
                selector.innerHTML = "";
                for (let i = 0; i < allRoomsArray.length; i++) {
                    const option = document.createElement("option");
                    for (let j = 0; j < reservedPlaces.length; j++) {
                        if (allRoomsArray[i].room == reservedPlaces[j].room) {
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
                    option.innerText = allRoomsArray[i].room;
                    selector.appendChild(option);
                }
            });
            selector.dispatchEvent(new Event("changeAccess"));
        }
        document.getElementById("freeSpace").innerText = "Free rooms now " + roomOrParkingumber + "/" + String((parseInt(selector.length) - 1));
    //Parking reservation
    } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedParkings")) {
        if (answer.message.includes("No reserved")) {
            for (let i = 0; i < allRoomsArray.length; i++) {
                const option = document.createElement("option");
                option.className = optionStyle + " bg-[#025928]";
                option.innerText = allRoomsArray[i].spot;
                selector.appendChild(option);
            }
        } else {
            selector.addEventListener("changeAccess", function() { 
                selector.innerHTML = "";
                for (let i = 0; i < allRoomsArray.length; i++) {
                    const option = document.createElement("option");
                    for (let j = 0; j < reservedPlaces.length; j++) {
                        if (allRoomsArray[i].spot == reservedPlaces[j].spot) {
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
                    option.innerText = allRoomsArray[i].room;
                    selector.appendChild(option);
                }
            });
            selector.dispatchEvent(new Event("changeAccess"));
        }
        document.getElementById("freeSpace").innerText = "Free parkings now " + roomOrParkingumber + "/" + String((parseInt(selector.length) - 1));
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
                mainDiv.appendChild(createTableLine(answer.message[i], i));
            }
        }
    } else {
        if (event.currentTarget.responseURL.includes("/API/V1/ReservedRooms")) {
            altListOfReservedRooms(answer.message);
        } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedParkings")) {
            altListOfReservedParkings(answer.message);
        } else if (event.currentTarget.responseURL.includes("/API/V1/Rooms") || event.currentTarget.responseURL.includes("/API/V1/Parkings")) {
            for (let i = 0; i < answer.message.length; i++) {
                mainDiv.appendChild(createTableLine(listArray[i], i, answer.message[i], listArray));
            }
        }
    }
    //createTableLine();
}
//AUTHENTICATION
function authentication(name, password) {
    //Data block
    var data = {
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
        customAlert(3, "Succesfully login")
        typeOfHomePage = 1;
        mainPage();
        document.cookie = "username=" + name;
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
function clearRooms(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedRoom/" + id);
    request.onreadystatechange = console.log("Cleared room"); 
    request.send();
}
function clearParkings(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/ReservedParking/" + id);
    request.onreadystatechange = console.log("Cleared parking"); 
    request.send();
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
                clearRooms(answer.message[i].id);
            } else {
                clearParkings(answer.message[i].id);
            }
        }
    } 
    if (event.currentTarget.responseURL.includes("/API/V1/ReservedRooms")) {
        fullClearReservedParkings();
    } 
}