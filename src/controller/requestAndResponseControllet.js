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
function deleteRoom(name) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/Room/" + name);
    request.onreadystatechange = requestDelete; 
    request.send();
}
function deleteParking(name) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/Parking/" + name);
    request.onreadystatechange = requestDelete; 
    request.send();
}
//Answer for DELETE request
function requestDelete(event) { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    document.getElementById('homePage').click();
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
function getAllReservedRooms(allRooms) {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedRooms");
    request.onreadystatechange = function() {
        getForDeleteOrCreate(event, allRooms); 
    };
    request.send();
}
//List of reserved rooms
function listOfReservedRooms() {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedRooms");
    request.onreadystatechange = getForList;
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
function listOfReservedParkings() {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/ReservedParkings");
    request.onreadystatechange = getForList;
    request.send();
}

//Answer for GET all request
//Get for delete and create
function getForDeleteOrCreate(event, allRooms = 0) { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    if (event.currentTarget.responseURL.includes("/API/V1/Rooms")) {
        getAllReservedRooms(answer.message);
    } else if (event.currentTarget.responseURL.includes("/API/V1/Parkings")) {
        getAllReservedParkings(answer.message);
    } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedRooms")) {
        if (answer.message.includes("No reserved")) {
            const selector = document.getElementById("selector");
            for (let i = 0; i < allRooms.length; i++) {
                const option = document.createElement("option");
                option.className = optionStyle + " bg-[#025928]";
                option.innerText = allRooms[i].room;
                selector.appendChild(option);
            }
        } else {
            const reservedPlaces = answer.message;
            const selector = document.getElementById("selector");
            for (let i = 0; i < allRooms.length; i++) {
                const option = document.createElement("option");
                for (let j = 0; j < reservedPlaces.length; j++) {
                    if (allRooms[i].room == reservedPlaces[j].room) {
                        option.className = optionStyle + " bg-[#590A10]";
                        option.disabled = true;
                        break;
                    } else {
                        option.className = optionStyle + " bg-[#025928]";
                    }
                }
                option.innerText = allRooms[i].room;
                selector.appendChild(option);
            }
        }
    } else if (event.currentTarget.responseURL.includes("/API/V1/ReservedParkings")) {
        if (answer.message.includes("No reserved")) {
            const selector = document.getElementById("selector");
            for (let i = 0; i < allRooms.length; i++) {
                const option = document.createElement("option");
                option.className = optionStyle + " bg-[#025928]";
                option.innerText = allRooms[i].spot;
                selector.appendChild(option);
            }
        } else {
            const reservedPlaces = answer.message;
            const selector = document.getElementById("selector");
            for (let i = 0; i < allRooms.length; i++) {
                const option = document.createElement("option");
                for (let j = 0; j < reservedPlaces.length; j++) {
                    if (allRooms[i].room == reservedPlaces[j].spot) {
                        option.className = optionStyle + " bg-[#590A10]";
                        option.disabled = true;
                        break;
                    } else {
                        option.className = optionStyle + " bg-[#025928]";
                    }
                }
                option.innerText = allRooms[i].room;
                selector.appendChild(option);
            }
        }
    }
}

//Get for list
function getForList(event) { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    const mainDiv = document.getElementById("mainDiv");
    if (answer.message.includes("No reserved")) {
        customAlert(2, answer.message);
    } else {
        for (let i = 0; i < answer.message.length; i++) {
            mainDiv.appendChild(createTableLine(answer.message[i], i));
        }
    }
    createTableLine();
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