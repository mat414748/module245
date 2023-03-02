let requestResult = 0;
//PUT
function updateClient(id, name, surname, sex, email, creditRaiting, street, postcode, city, billingAdress, privatePhonenumber, companyPhonenumber) {
    var data = {
        name: name.value,
        surname: surname.value,
        sex: sex.value,
        email: email.value,
        creditRaiting: creditRaiting.value,
        street: street.value,
        postcode: postcode.value,
        city: city.value,
        billingAdress: billingAdress.value,
        privatePhonenumber: privatePhonenumber.value,
        companyPhonenumber: companyPhonenumber.value
    };
    request = new XMLHttpRequest();
    request.open("PUT", "/Client/" + id);
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
//POST
function createClient(name, surname, sex, email, creditRaiting, street, postcode, city, billingAdress, privatePhonenumber, companyPhonenumber) {
    var data = {
        name: name.value,
        surname: surname.value,
        sex: sex.value,
        email: email.value,
        creditRaiting: creditRaiting.value,
        street: street.value,
        postcode: postcode.value,
        city: city.value,
        billingAdress: billingAdress.value,
        privatePhonenumber: privatePhonenumber.value,
        companyPhonenumber: companyPhonenumber.value
    };
    request = new XMLHttpRequest();
    request.open("POST", "/Client");
    request.onreadystatechange = requestCreateAndUpdate; 
    request.send(JSON.stringify(data));
}
function requestCreateAndUpdate(event) {
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText).message;
    if (answer.includes("Please provide a") || answer.includes("Cannot add or update a child row") || answer.includes("The product is not found or an identical")) {
        if (answer.includes("Cannot add or update a child row")) {
            alert(answer + "\n Maybe there is no category with this id.");
        } else {
            alert(answer);
        }
    } else {
        document.getElementById('homePage').click();
        customAlert(3, answer);
    }   
}
//DELETE
function deleteClient(id) {
    request = new XMLHttpRequest();
    request.open("DELETE", "/Client/" + id);
    request.onreadystatechange = requestDelete; 
    request.send();
}
function requestDelete(event) { 
    if (request.readyState < 4) {
        return;
    } 
    document.getElementById('homePage').click();
    customAlert(3, JSON.parse(request.responseText).message);
}
//GET ALL
function getAllClients() {
    request = new XMLHttpRequest();
    request.open("GET", "/Clients");
    request.onreadystatechange = requestAnswer; 
    request.send();
}
function requestAnswer(event) { 
    if (request.readyState < 4) {
        return;
    } 

    if (JSON.parse(request.responseText).message == "Unauthorised") {
        customAlert(1, JSON.parse(request.responseText).message);
    } else {
        requestResult = JSON.parse(request.responseText).message;
        if (requestResult == "No clients found") {
            customAlert(2, requestResult);
        }
    }
}
//GET ONE
function getClient(id, forPermalink = 0) {
    request = new XMLHttpRequest();
    request.open("GET", "/Oneclient/" + id);
    request.onreadystatechange = function() {
        requestOne(event, id, forPermalink)
    }; 
    request.send();
}
function requestOne(event, id, forPermalink) {
    if (request.readyState < 4) {
        return;
    } 
    if (JSON.parse(request.responseText).message == "Unauthorised") {
        alert(JSON.parse(request.responseText).message);
        document.body.appendChild(helloWorld);
    } else {
        if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Category")) {
            if (forPermalink == 0) {
                requestResult = JSON.parse(request.responseText).message;
                createOrUpdateTableElement(0, 1, id);
                if (requestResult == "No category found") {
                    alert(requestResult);
                }
            } else {
                requestResult = JSON.parse(request.responseText).message;
                if (requestResult == "No category found") {
                    alert(requestResult);
                    document.body.appendChild(helloWorld);
                } else {
                    createList();
                }
            }      
        } else if (event.currentTarget.responseURL.includes("/levantsou-matvej/API/V1/Product")) {
            if (forPermalink == 0) {
                requestResult = JSON.parse(request.responseText).message;
                createOrUpdateTableElement(1, 1, id);
                if (requestResult == "No product found") {
                    alert(requestResult);
                }
            } else {
                requestResult = JSON.parse(request.responseText).message;
                if (requestResult == "No product found") {
                    alert(requestResult);
                    document.body.appendChild(helloWorld);
                } else {
                    createList(1);
                }     
            }
        }
    }
}
//AUTHENTICATION
function authentication(name, password) {
    var data = [
        {
            username: name.value
        },
        {
            password: password.value
        }
    ];
    request = new XMLHttpRequest();
    request.open("POST", "/Login");
    request.onreadystatechange = requestAuthentication; 
    request.send(JSON.stringify(data));
}
function requestAuthentication() { 
    if (request.readyState < 4) {
        return;
    } 
    const answer = JSON.parse(request.responseText).message.split(";");
    if (answer[0] == "Token created") {
        logout();
    }
    customAlert(2,answer[0]);  
}