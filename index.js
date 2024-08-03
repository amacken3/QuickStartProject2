document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById(serachInput).ariaValueMax;
    search(query);
});

async function search(query) {
    const APIKey = "ai1aFh62ZQULAsoef0tNW6KrPbLCbwx3";
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=10`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching the data:', error);
        document.getElementById('results').innerText = 'An error occurred while fetching the data.';
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data.data && data.data.length > 0) {
        data.data.forEach(item => {
            const img = document.createElement('img');
            img.src = item.images.fixed_height.url; 
            img.alt = item.title;
            resultsContainer.appendChild(img);
        });
    } else {
        resultsContainer.innerText = 'No results found.';
    }
}

