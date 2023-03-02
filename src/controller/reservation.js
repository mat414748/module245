function reservation(reservationType) {
    let roomOrParkingumber = 0;
    //Create all elements with DOM
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = '';
    const welcome = document.createElement("div");
    const gridBody = document.createElement("div");
    //Left window
    const leftWindow = document.createElement("div");
    const listLabel = document.createElement("div");
    const selector = document.createElement("select");
    //Styles
    const optionStyle = "text-[40px]";
    const selectorStyle = "text-[50px] text-left";
    //first select option
    const dummyOption = document.createElement("option");
    dummyOption.innerText = "List of places";
    dummyOption.className = optionStyle;
    dummyOption.selected = true;
    dummyOption.disabled = true;
    dummyOption.hidden = true;
    selector.appendChild(dummyOption);
    //Another select
    const selectorOptions = [
        {Name:"A1",Status:0},
        {Name:"A2",Status:0},
        {Name:"A3",Status:1}
    ];
    selectorOptions.forEach((element) => {
        const option = document.createElement("option");
        if (element.Status == 0) {
            option.className = optionStyle + " bg-[#025928]";
            roomOrParkingumber++;
        } else {
            option.className = optionStyle + " bg-[#590A10]";
        }
        option.innerText = element.Name;
        selector.appendChild(option);
    });
    //On dropdown change
    selector.addEventListener("change", function() {
        selectorOptions.forEach((element) => {
            if (selector.value == element.Name && element.Status != 1) {
                selector.className = selectorStyle + " bg-[#025928]";
            } else if (selector.value == element.Name && element.Status == 1) {
                selector.className = selectorStyle + " bg-[#698A85]";
                dummyOption.selected = true;
                customAlert(2, "This place is reserved for this time");
            }
        })
    });
    //Right window
    const rightWindow = document.createElement("div");
    const freeSpace = document.createElement("div");
    //Date
    const dateLabel = document.createElement("div");
    const dateLabelChoose = document.createElement("input");
    dateLabelChoose.type = "date";
    dateLabelChoose.value = new Date().toJSON().slice(0, 10);
    dateLabelChoose.min = new Date().toJSON().slice(0, 10);
    //Time
    const timeLabel = document.createElement("div");
    const timeLabelFrom = document.createElement("div");
    const timeLabelFromTime = document.createElement("input");
    timeLabelFromTime.type = "time";
    timeLabelFromTime.min = "08:00";
    timeLabelFromTime.max = "17:00";
    timeLabelFromTime.value = "08:00";
    const timeLabelTo = document.createElement("div");
    const timeLabelToTime = document.createElement("input");
    timeLabelToTime.type = "time";
    timeLabelToTime.min = "09:00";
    timeLabelToTime.max = "18:00";
    timeLabelToTime.value = "18:00";
    //Red status
    const reservedDiv = document.createElement("div");
    const reservedStatus = document.createElement("div");
    const redSquare = document.createElement("span");
    //Free status
    const freeDiv = document.createElement("div");
    const freeStatus = document.createElement("div");
    const greenSquare = document.createElement("span");
    //Reserve button
    const reserveNow = document.createElement("div");
    //On change and Time
    timeLabelFromTime.addEventListener("change", function() {
        if (!timeLabelFromTime.checkValidity()) {
            customAlert(2, "Start reserving time can't be earlier than 8:00 or later than 17:00");
            timeLabelFromTime.value = "08:00";
        }
    });
    timeLabelToTime.addEventListener("change", function() {
        if (!timeLabelToTime.checkValidity()) {
            customAlert(2, "End reserving time can't be earlier than 9:00 or later than 18:00");
            timeLabelToTime.value = "18:00";
        }
    });
    //Text
    listLabel.innerText = "Reservation a place";
    if (reservationType === 0) {
        welcome.innerText = "Reservation a room place";
        freeSpace.innerText = "Free rooms now " + roomOrParkingumber + "/" + selectorOptions.length;
    } else {
        welcome.innerText = "Reservation a parking place";
        freeSpace.innerText = "Free parking now " + roomOrParkingumber + "/" + selectorOptions.length;
    }
    reservedStatus.innerText = " - reserved space";
    freeStatus.innerText = " - free space";
    dateLabel.innerText = "Choose a data and time";
    timeLabelFrom.innerText = "From:";
    timeLabelTo.innerText = "To:";
    reserveNow.innerText = "Reserve now";
    //Classen
    welcome.className = "text-[70px] font-bold text-[#A88F15]";
    listLabel.className = "text-[50px]"
    selector.className = selectorStyle + " bg-[#698A85]";
    freeSpace.className = "text-[40px] text-left";
    reservedDiv.className = "flex flex-row";
    freeDiv.className = "flex flex-row";
    reservedStatus.className = "text-[40px] text-left";
    freeStatus.className = "text-[40px] text-left";
    redSquare.className = "bg-[#590A10] w-[50px] h-[50px] border-4 border-black mt-2";
    greenSquare.className = "bg-[#025928] w-[50px] h-[50px] border-4 border-black mt-2";
    gridBody.className = "text-center w-[80rem] m-auto grid gap-0 grid-cols-2 grid-rows-1";
    dateLabel.className = "text-[40px] text-left mt-10";
    dateLabelChoose.className = "text-[30px] border-4 border-black rounded";
    timeLabel.className = "flex flex-row mt-10";
    timeLabelFrom.className = "text-[40px]";
    timeLabelTo.className = "text-[40px]";
    timeLabelFromTime.className = "text-[30px] ml-5 mr-5 border-4 border-black rounded invalid:bg-[#590A10] invalid:text-white";
    timeLabelToTime.className = "text-[30px] ml-5 mr-5 border-4 border-black rounded invalid:bg-[#590A10] invalid:text-white";
    reserveNow.className = "text-[40px] text-white bg-[#025928] border-2 border-black rounded w-[25rem] mb-5 mt-5 pb-2 m-auto cursor-pointer focus:bg-[#04A349] hover:bg-[#04A349]";
    //Reserve now + index
    reserveNow.tabIndex = 5;
    ["click","keypress"].forEach(function(event) {
        reserveNow.addEventListener(event, function(keyEvent) {
            if (keyEvent.key === "Enter" || keyEvent instanceof PointerEvent) {
                document.getElementById('homePage').click();
                customAlert(3, "Successful reserved");
            }
        })
    });
    //Apends
    //Reservation status append
    reservedDiv.appendChild(redSquare);
    reservedDiv.appendChild(reservedStatus);
    freeDiv.appendChild(greenSquare);
    freeDiv.appendChild(freeStatus);
    //Date and time
    timeLabel.appendChild(timeLabelFrom); 
    timeLabel.appendChild(timeLabelFromTime);
    timeLabel.appendChild(timeLabelTo);
    timeLabel.appendChild(timeLabelToTime);  
    dateLabel.appendChild(dateLabelChoose); 
    //Left
    leftWindow.appendChild(listLabel);
    leftWindow.appendChild(selector);
    //Right
    rightWindow.appendChild(freeSpace);
    rightWindow.appendChild(reservedDiv);
    rightWindow.appendChild(freeDiv);
    rightWindow.appendChild(dateLabel);
    rightWindow.appendChild(timeLabel);
    //Body
    gridBody.appendChild(leftWindow);
    gridBody.appendChild(rightWindow);
    mainDiv.appendChild(welcome);
    mainDiv.appendChild(gridBody);
    mainDiv.appendChild(reserveNow);
}
