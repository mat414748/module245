function subInformation(tableData) {
    const subTable = document.createElement("table");
    subTable.className = "m-auto w-[100%]";
    //First row
    let tableLine = document.createElement("tr");
    const tab = "w-[25%] text-[20px] text-left bg-white";

    let tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Private Telefonnummer";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[12];
    tableLine.appendChild(tableCell);  
    
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Bonität";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[14];
    tableLine.appendChild(tableCell);
      
    subTable.appendChild(tableLine);
    //Second row
    tableLine = document.createElement("tr");

    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Firmen Telefonnummer";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[8];
    tableLine.appendChild(tableCell);  
    
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Schulden";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Debt;
    tableLine.appendChild(tableCell);
      
    subTable.appendChild(tableLine);
    //Trith row
    tableLine = document.createElement("tr");

    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Stammkunde";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = "Yes";
    tableLine.appendChild(tableCell);  
    
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Kreditkarte";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Creditcard;
    tableLine.appendChild(tableCell);
      
    subTable.appendChild(tableLine);
    //Fourth row
    tableLine = document.createElement("tr");

    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "VIP";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.VIP;
    tableLine.appendChild(tableCell);  
    
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Rechnung";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Bill;
    tableLine.appendChild(tableCell);
      
    subTable.appendChild(tableLine);
    //Fifth row
    tableLine = document.createElement("tr");

    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Rechnungsadresse";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = Object.values(tableData)[7];
    tableLine.appendChild(tableCell);  
    
    tableCell = document.createElement("td");
    tableCell.className = tab + " bg-teal-400";
    tableCell.innerText = "Vorauszahlung";
    tableLine.appendChild(tableCell);  

    tableCell = document.createElement("td");
    tableCell.className = tab + " ";
    tableCell.innerText = tableData.Prepayment;
    tableLine.appendChild(tableCell);
      
    subTable.appendChild(tableLine);

    return subTable;
}