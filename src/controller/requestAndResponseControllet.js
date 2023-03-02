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
//Get response from server after PUT or POST requests
function requestCreateAndUpdate(event) {
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    document.getElementById('homePage').click();
    customAlert(3, answer);
}
//DELETE
function deleteClient(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/API/V1/Client/" + id);
    request.onreadystatechange = requestDelete; 
    request.send();
}
//Answer for DELETE request
function requestDelete(event) { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText);
    document.getElementById('clientList').click();
    customAlert(3, answer.information);
}
//GET ALL
function getAllClients() {
    request = new XMLHttpRequest();
    request.open("GET", "/API/V1/Clients");
    request.onreadystatechange = requestAnswer; 
    request.send();
}
//Answer for GET all request
function requestAnswer(event) { 
    if (request.readyState < 4) {
        return;
    } 
    if (JSON.parse(request.responseText).message == "Unauthorised") {
        customAlert(1, JSON.parse(request.responseText).message);
    } else {
        const mainDiv = document.getElementById("mainDiv");
        requestResult = JSON.parse(request.responseText);
        for (let i = 0; i < requestResult.length; i++) {
            mainDiv.appendChild(createTableLine(requestResult[i], i));
        }
        if (requestResult == "No clients found") {
            customAlert(2, requestResult);
        }
    }
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
    request.onreadystatechange = requestAuthentication; 
    request.send(JSON.stringify(data));
}
//Answer after POST authentication request
function requestAuthentication() { 
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
    } 
}