//Create or edit a line
function createOrEditClient(operationType = 0, tableData) {
    //Create all DOM elements
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const window = document.createElement("div");
    const name = document.createElement("div");
    const nameInput = document.createElement("input");
    const surname = document.createElement("div");
    const surnameInput = document.createElement("input");
    const sex = document.createElement("div");
    const sexInput = document.createElement("input");
    const email = document.createElement("div");
    const emailInput = document.createElement("input");
    const creditRaiting = document.createElement("div");
    const creditRaitingInput = document.createElement("input");
    const street = document.createElement("div");
    const streetInput = document.createElement("input");
    const postcode = document.createElement("div");
    const postcodeInput = document.createElement("input");
    const city = document.createElement("div");
    const cityInput = document.createElement("input");
    const billingAdress = document.createElement("div");
    const billingAdressInput = document.createElement("input");
    const privatePhonenumber = document.createElement("div");
    const privatePhonenumberInput = document.createElement("input");
    const companyPhonenumber = document.createElement("div");
    const companyPhonenumberInput = document.createElement("input");
    //Create buttons
    const createNow = document.createElement("div");
    const cancel = document.createElement("div");
    //Grid divs
    const firstWindow = document.createElement("div");
    const secondWindow = document.createElement("div");
    const trithWindow = document.createElement("div");
    const fourthWindow = document.createElement("div");
    //Text for all labels
    cancel.innerText = "Cancel";
    name.innerText = "Name";
    surname.innerText = "Surname";
    sex.innerText = "Sex";
    email.innerText = "E-Mail";
    creditRaiting.innerText = "Credit raiting";
    street.innerText = "Street";
    postcode.innerText = "Postcode";
    city.innerText = "City";
    billingAdress.innerText = "Billing adress";
    privatePhonenumber.innerText = "Private phonenumber";
    companyPhonenumber.innerText = "Company phonenumber";
    //If edit then get und put all data in inputs fiels
    if (operationType == 1) {
        nameInput.value = tableData.Name;
        surnameInput.value = tableData.Surname;
        sexInput.value = tableData.Sex;
        emailInput.value = Object.values(tableData)[10];
        creditRaitingInput.value = Object.values(tableData)[14];
        streetInput.value = tableData.Street;
        postcodeInput.value = tableData.Postcode;
        cityInput.value = tableData.City;
        billingAdressInput.value = Object.values(tableData)[7];
        privatePhonenumberInput.value = Object.values(tableData)[12];
        companyPhonenumberInput.value = Object.values(tableData)[8]; 
    }
    //Create placeholder for all inputs
    nameInput.placeholder = "Enter client name";
    surnameInput.placeholder = "Enter client surname";
    sexInput.placeholder = "Enter client gender";
    emailInput.placeholder = "Enter client e-mail";
    creditRaitingInput.placeholder = "Enter client credit raiting";
    streetInput.placeholder = "Enter client street";
    postcodeInput.placeholder = "Enter client postcode";
    cityInput.placeholder = "Enter client city";
    billingAdressInput.placeholder = "Enter client billing adress";
    privatePhonenumberInput.placeholder = "Enter pivate number";
    companyPhonenumberInput.placeholder = "Enter company number";
    //Design for all elements
    const labelStyle = "text-[20px] text-left w-auto font-bold";
    const inputStyle = "text-[15px] text-left w-[15rem] float-left inline-block border-2  border-black rounded placeholder:italic placeholder:text-slate-400";
    window.className = "border-2  border-black bg-white rounded text-center w-[50rem] m-auto grid gap-0 grid-cols-3 grid-rows-2";
    firstWindow.className = "pl-2 pb-2 w-auto h-auto border-r-2 border-b-2 border-black";
    secondWindow.className = "pl-2 w-auto h-auto border-r-2 border-black";
    trithWindow.className = "pl-2 w-auto h-auto border-b-2 border-black";
    fourthWindow.className = "w-auto h-auto border-b-2 border-black";
    //If create or edit design
    if (operationType == 0) {
        createNow.className = "text-[20px] text-white bg-green-500 border-2 border-black rounded w-[10rem] mb-5 pb-2 m-auto cursor-pointer font-bold";
        createNow.innerText = "Create now";
    } else {
        createNow.className = "text-[20px] text-white bg-orange-500 border-2 border-black rounded w-[10rem] mb-5 pb-2 m-auto cursor-pointer font-bold";
        createNow.innerText = "Edit now";
    }
    cancel.className = "text-[20px] text-white bg-gray-500 border-2 border-black rounded w-[10rem] mb-5 pb-2 m-auto cursor-pointer font-bold";
    name.className = labelStyle;
    nameInput.className = inputStyle;
    surname.className = labelStyle;
    surnameInput.className = inputStyle;
    sex.className = labelStyle;
    sexInput.className = inputStyle;
    email.className = labelStyle;
    emailInput.className = inputStyle;    
    creditRaiting.className = labelStyle;
    creditRaitingInput.className = inputStyle;
    street.className = labelStyle;
    streetInput.className = inputStyle;
    postcode.className = labelStyle;
    postcodeInput.className = inputStyle;
    city.className = labelStyle;
    cityInput.className = inputStyle;
    billingAdress.className = labelStyle;
    billingAdressInput.className = inputStyle;
    privatePhonenumber.className = labelStyle;
    privatePhonenumberInput.className = inputStyle;
    companyPhonenumber.className = labelStyle;
    companyPhonenumberInput.className = inputStyle;
    //Cancel function
    cancel.addEventListener("click", function() {
        document.getElementById('clientList').click();
    })
    //Create or update function
    if (operationType == 0) {
        createNow.addEventListener("click", function() {
            createClient(nameInput.value, surnameInput.value, sexInput.value, emailInput.value, creditRaitingInput.value, streetInput.value, postcodeInput.value, cityInput.value, billingAdressInput.value, privatePhonenumberInput.value, companyPhonenumberInput.value);
        }) 
    } else {
        createNow.addEventListener("click", function() {
            updateClient(tableData.ID, nameInput.value, surnameInput.value, sexInput.value, emailInput.value, creditRaitingInput.value, streetInput.value, postcodeInput.value, cityInput.value, billingAdressInput.value, privatePhonenumberInput.value, companyPhonenumberInput.value);
        }) 
    }
    //Connect all elements
    firstWindow.appendChild(name);
    firstWindow.appendChild(nameInput);
    firstWindow.appendChild(surname);
    firstWindow.appendChild(surnameInput);
    firstWindow.appendChild(sex);
    firstWindow.appendChild(sexInput);
    secondWindow.appendChild(email);
    secondWindow.appendChild(emailInput);
    secondWindow.appendChild(creditRaiting);
    secondWindow.appendChild(creditRaitingInput);
    trithWindow.appendChild(street);
    trithWindow.appendChild(streetInput);
    trithWindow.appendChild(city);
    trithWindow.appendChild(cityInput);
    trithWindow.appendChild(privatePhonenumber);
    trithWindow.appendChild(privatePhonenumberInput);
    fourthWindow.appendChild(postcode);
    fourthWindow.appendChild(postcodeInput);
    fourthWindow.appendChild(billingAdress);
    fourthWindow.appendChild(billingAdressInput);
    fourthWindow.appendChild(companyPhonenumber);
    fourthWindow.appendChild(companyPhonenumberInput);
    window.appendChild(firstWindow);
    window.appendChild(trithWindow);
    window.appendChild(fourthWindow);
    window.appendChild(secondWindow);
    window.appendChild(createNow);
    window.appendChild(cancel);
    mainDiv.appendChild(window);
}
