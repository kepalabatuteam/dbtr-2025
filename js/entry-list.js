// Replace with your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbxLqi4qhv5tG7moecrG1oCALVYArgtxje4iW59sHVD2tQYS-dbkV9Nq1-1hHKUTsSkU/exec';

let allRecords = [];
let isFiltered = false;

document.addEventListener('DOMContentLoaded', function() {
    loadRecords();
    
    // Add event listener for Enter key in search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchTable();
            }
        });
    }
});

function loadRecords() {
    const refreshBtn = document.getElementById('refreshButton');
    const buttonText = document.getElementById('buttonText');
    const icon = refreshBtn ? refreshBtn.querySelector('.fas') : null;
    const tableBody = document.querySelector('#recordsTable tbody');
    
    if (!refreshBtn || !tableBody) return;
    
    // Change button text to "Loading..." and disable button
    buttonText.textContent = 'Loading...';
    refreshBtn.disabled = true;
    
    // Add refreshing animation
    if (icon) {
        icon.classList.add('refreshing');
    }
    
    tableBody.innerHTML = '<tr><td colspan="5" class="message loading">Memuat data peserta, silakan tunggu...</td></tr>';
    
    const params = new URLSearchParams();
    params.append('operation', 'read');
    
    // Add a small delay to show the loading state
    setTimeout(() => {
        fetch(scriptURL + '?' + params.toString())
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // Debug log
            allRecords = data;
            displayRecords(data);
            updateResultCount(data.length);
            isFiltered = false;
        })
        .catch(error => {
            console.error('Error:', error);
            tableBody.innerHTML = '<tr><td colspan="5" class="message error">Error loading records. Please try again.</td></tr>';
            updateResultCount(0);
        })
        .finally(() => {
            // Remove refreshing animation and reset button text
            if (icon) {
                icon.classList.remove('refreshing');
            }
            buttonText.textContent = 'Refresh';
            refreshBtn.disabled = false;
        });
    }, 500); // 500ms delay to show loading state
}

function displayRecords(records) {
    const tableBody = document.querySelector('#recordsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (!records || records.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="message">Tidak ada data yang ditemukan</td></tr>';
        return;
    }
    
    records.forEach(record => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${record.bib_no || 'N/A'}</td>
            <td>${record.full_name || 'N/A'}</td>
            <td>${record.gender || 'N/A'}</td>
            <td>${record.community_name || 'N/A'}</td>
            <td>${record.phone_no || 'N/A'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function searchTable() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput || !allRecords || allRecords.length === 0) return;
    
    const searchText = searchInput.value.toLowerCase();
    
    if (!searchText) {
        resetSearch();
        return;
    }
    
    const filteredRecords = allRecords.filter(record => {
        // Check each field individually with proper null checks
        const fieldsToCheck = [
            record.bib_no,
            record.full_name, 
            record.gender,
            record.community_name,
            record.phone_no
        ];
        
        return fieldsToCheck.some(field => 
            field && field.toString().toLowerCase().includes(searchText)
        );
    });
    
    displayRecords(filteredRecords);
    updateResultCount(filteredRecords.length);
    highlightSearchTerms(searchText);
    isFiltered = true;
}

function resetSearch() {
    document.getElementById('searchInput').value = '';
    displayRecords(allRecords);
    updateResultCount(allRecords.length);
    removeHighlights();
    isFiltered = false;
}

function highlightSearchTerms(searchText) {
    const cells = document.querySelectorAll('#recordsTable tbody td');
    
    cells.forEach(cell => {
        const originalText = cell.textContent;
        const lowerOriginalText = originalText.toLowerCase();
        const searchRegex = new RegExp(searchText, 'gi');
        
        if (lowerOriginalText.includes(searchText)) {
            const highlightedText = originalText.replace(
                searchRegex, 
                match => `<span class="highlight">${match}</span>`
            );
            cell.innerHTML = highlightedText;
        }
    });
}

function removeHighlights() {
    const cells = document.querySelectorAll('#recordsTable tbody td');
    
    cells.forEach(cell => {
        cell.innerHTML = cell.textContent;
    });
}

function updateResultCount(count) {
    const resultElement = document.getElementById('resultCount');
    if (resultElement) {
        if (isFiltered) {
            resultElement.textContent = `Showing ${count} data (filtered)`;
        } else {
            resultElement.textContent = `Showing ${count} data`;
        }
    }
}