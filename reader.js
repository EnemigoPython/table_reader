// HTML elements
const tableContainer = document.getElementById('tableContainer');
const indexItems = document.getElementById('indexItems');
const searchBar = document.getElementById('searchBar');
const clearButton = document.getElementById('clearButton');
const fileTitle = document.getElementById('fileTitle');
const lookupUrl = document.getElementById('lookupUrl');

function filterTable() {
    const searchText = searchBar.value.toLowerCase();
    const filterRows = document.querySelectorAll('#tableContainer table tbody tr');

    // Iterate through the rows and hide those that don't match the search text
    for (let i = 0; i < filterRows.length; i++) {
        const row = filterRows[i];
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

const createSlug = (s) => s
    .toLowerCase()  // Convert to lowercase
    .replace(/[^a-z0-9-]/g, '-')  // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, '-')  // Replace consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, '');  // Remove leading and trailing hyphens

const isValidUrl = (url) => {
    const pattern = new RegExp('^((https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?)(\\?.*)?$');
    return pattern.test(url);
}
      
/**
 * Process the table & perform tasks relating to contents
 */
function postTableDisplay() {
    const table = tableContainer.querySelector('table');
    const rows = table.getElementsByTagName('tr');
    indexItems.innerHTML = ''; // Clear previous index items

    let headerNum = 0;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = Array.from(row.getElementsByTagName('td'));

        const cellText = cells.map(cell => cell.textContent.trim());
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (isValidUrl(lookupUrl.value)) {
                    const slug = createSlug(cell.textContent.trim());
                    const url = `${lookupUrl.value}${slug}`;
                    window.open(url, '_blank');
                }
            });
        });

        if (cells.length === 1) {
            headerNum++;
            const uniqueId = 'header-' + headerNum;

            // Add unique ID to the row
            row.setAttribute('id', uniqueId);

            // Create anchor tag in the index
            const indexItem = document.createElement('a');
            indexItem.setAttribute('href', '#' + uniqueId);
            indexItem.textContent = cellText[0];

            // Add anchor tag to the index container
            indexItems.appendChild(indexItem);
            indexItems.appendChild(document.createElement('br'));
        }
    }
}

/**
 * @param {string} tableData 
 */
function displayTable(tableData) {
    tableContainer.innerHTML = "<span id='top'></span>" + tableData;

    // Retrieve the last selected file name and update the <h2>
    const lastSelectedFile = document.getElementById('filePicker').value;
    if (lastSelectedFile) {
        const fileName = lastSelectedFile.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, ''); // Extract the file name without path and extension
        const fileTitle = document.getElementById('fileTitle');
        fileTitle.textContent = fileName;
        localStorage.setItem('cachedFileName', fileName);
    }

    postTableDisplay();
}

lookupUrl.addEventListener('input', () => {
    localStorage.setItem('cachedLookup', lookupUrl.value)
});

clearButton.addEventListener('click', () => {
    searchBar.value = '';
    filterTable();
});

// Load cached values on page load
window.onload = () => {
    const cachedFileName = localStorage.getItem('cachedFileName');
    if (cachedFileName) {
        fileTitle.textContent = cachedFileName;
    }
    const cachedTable = localStorage.getItem('cachedTable');
    if (cachedTable) {
        displayTable(cachedTable);
    }
    const cachedLookupUrl = localStorage.getItem('cachedLookup');
    if (cachedLookupUrl) {
        lookupUrl.value = cachedLookupUrl;
    }
};
