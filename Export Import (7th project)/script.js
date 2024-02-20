// document.getElementById('fileInput').addEventListener('change', handleFileSelect);

// function handleFileSelect(event) {
//   const file = event.target.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = function(event) {
//       const csvData = event.target.result;
//       const dataArray = parseCSV(csvData);
//       displayData(dataArray);
//     };

//     reader.readAsText(file);
//   }
// }

// function parseCSV(csvData) {
//   const lines = csvData.split('\n');
//   const dataArray = [];

//   for (let i = 0; i < lines.length; i++) {
//     const row = lines[i].split(',');
//     dataArray.push(row);
//   }

//   return dataArray;
// }

// function displayData(dataArray) {
//   const tableContainer = document.getElementById('tableContainer');
//   const table = document.createElement('table');

//   for (let i = 0; i < dataArray.length; i++) {
//     const row = document.createElement('tr');

//     for (let j = 0; j < dataArray[i].length; j++) {
//       const cell = document.createElement('td');
//       cell.textContent = dataArray[i][j];
//       row.appendChild(cell);
//     }

//     table.appendChild(row);
//   }

//   tableContainer.innerHTML = '';
//   tableContainer.appendChild(table);
// }

// // code for importing displayed data to the empty csv file 
// function exportToNewCSV() {
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];
  
//     if (file) {
//       const reader = new FileReader();
  
//       reader.onload = function(event) {
//         const csvData = event.target.result;
//         const newFile = new File([csvData], 'new_data.csv', { type: 'text/csv' });
//         // Use newFile as needed (e.g., send it to a server or store it locally)
//         console.log('New CSV file:', newFile);
//       };
  
//       reader.readAsText(file);
//     } else {
//       alert('Please select a file.');
//     }
//   }
  
//   // Usage example
//   exportToNewCSV();
  


let sourceDataArray = []; // Store the data from the source CSV file

function importData() {
  const fileInput = document.getElementById('sourceFileInput');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const csvData = event.target.result;
      sourceDataArray = parseCSV(csvData);
      displayData(sourceDataArray);
    };

    reader.readAsText(file);
  } else {
    alert('Please select a file.');
  }
}

function transferData() {
  const destinationFileInput = document.getElementById('destinationFileInput');
  const destinationFile = destinationFileInput.files[0];

  if (destinationFile) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const csvData = event.target.result;
      const destinationDataArray = parseCSV(csvData);
      const combinedDataArray = combineData(sourceDataArray, destinationDataArray);
      const csvContent = combinedDataArray.map(row => row.join(',')).join('\n');
      downloadCSV(csvContent, destinationFile.name);
    };

    reader.readAsText(destinationFile);
  } else {
    alert('Please select a destination file.');
  }
}

function parseCSV(csvData) {
  const lines = csvData.split('\n');
  const dataArray = [];

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i].split(',');
    dataArray.push(row);
  }

  return dataArray;
}

function displayData(dataArray) {
  const tableContainer = document.getElementById('tableContainer');
  const table = document.createElement('table');

  for (let i = 0; i < dataArray.length; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < dataArray[i].length; j++) {
      const cell = document.createElement('td');
      cell.textContent = dataArray[i][j];
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}

function combineData(sourceDataArray, destinationDataArray) {
  // ... (combine sourceDataArray with destinationDataArray)
  // For demonstration, let's just append the source data to the destination data
  return destinationDataArray.concat(sourceDataArray);
}

function downloadCSV(csvContent, fileName) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}




















