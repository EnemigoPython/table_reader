function filterTable() {
    const searchText = document.getElementById('searchBar').value.toLowerCase();
    const rows = document.querySelectorAll('#tableContainer table tbody tr');

    // Iterate through the rows and hide those that don't match the search text
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowData = row.textContent.toLowerCase();

        if (rowData.includes(searchText) || row.id.startsWith('header-')) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

function importTableFromFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const tableData = e.target.result;
        displayTable(tableData);
        
        // Cache the table data
        localStorage.setItem('cachedTable', tableData);
    };
    
    reader.readAsText(file);
}

function addIdsToSingleItemRows() {
    const table = document.getElementById('tableContainer').querySelector('table');
    const rows = table.getElementsByTagName('tr');
    const indexItems = document.getElementById('indexItems');
    indexItems.innerHTML = ''; // Clear previous index items

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');

        if (cells.length === 1) {
            const cellText = cells[0].textContent.trim();
            const uniqueId = 'header-' + i;

            // Add unique ID to the row
            row.setAttribute('id', uniqueId);

            // Create anchor tag in the index
            const indexItem = document.createElement('a');
            indexItem.setAttribute('href', '#' + uniqueId);
            indexItem.textContent = cellText;

            // Add anchor tag to the index container
            indexItems.appendChild(indexItem);
            indexItems.appendChild(document.createElement('br'));
        }
    }
}

function displayTable(tableData) {
    tableContainer.innerHTML = "<span id='top'></span>" + tableData;

    // Retrieve the last selected file name and update the <h2>
    const lastSelectedFile = document.getElementById('filePicker').value;
    if (lastSelectedFile) {
        const fileName = lastSelectedFile.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, ''); // Extract the file name without path and extension
        const fileTitle = document.getElementById('fileTitle');
        fileTitle.textContent = fileName;
    }

    addIdsToSingleItemRows();
}

// Load the cached table on page load
window.onload = () => {
    const cachedTable = localStorage.getItem('cachedTable');
    if (cachedTable) {
        displayTable(cachedTable);
    }
};
