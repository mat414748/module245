//Shows additional information for each line
function subInformation(tableData) {
    //Table with all subinformation
    const subTable = document.createElement("table");
    subTable.className = "m-auto w-[100%]";
    //First row
    let tableLine = document.createElement("tr");
    const tab = "w-[25%] text-[20px] text-left bg-white";
    //Private phonenumber
    let tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Private phonenumber";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[12];
    tableLine.appendChild(tableCell);  
    //Credit raiting
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Credit raiting";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[14];
    tableLine.appendChild(tableCell);
    subTable.appendChild(tableLine);
    //Second row
    tableLine = document.createElement("tr");
    //Company phonenumber
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Company phonenumber";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[8];
    tableLine.appendChild(tableCell);  
    //Debt
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Debt";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Debt;
    tableLine.appendChild(tableCell);
    subTable.appendChild(tableLine);
    //Trith row
    tableLine = document.createElement("tr");
    //Regular client
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Regular client";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = "Yes";
    tableLine.appendChild(tableCell);  
    //Creditcard
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Creditcard";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Creditcard;
    tableLine.appendChild(tableCell);
    subTable.appendChild(tableLine);
    //Fourth row
    tableLine = document.createElement("tr");
    //VIP
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "VIP";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.VIP;
    tableLine.appendChild(tableCell);  
    //Bill
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Bill";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Bill;
    tableLine.appendChild(tableCell);
    subTable.appendChild(tableLine);
    //Fifth row
    tableLine = document.createElement("tr");
    //Billing adress
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Billing adress";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[7];
    tableLine.appendChild(tableCell);  
    //Prepayment
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Prepayment";
    tableLine.appendChild(tableCell);  
    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Prepayment;
    tableLine.appendChild(tableCell); 
    subTable.appendChild(tableLine);
    //Return table with all subinformation
    return subTable;
}