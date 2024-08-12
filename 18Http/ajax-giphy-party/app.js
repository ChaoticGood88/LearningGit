console.log("Let's get this party started!");

document.querySelector('#searchForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // Prevents the form from submitting the traditional way

  const searchTerm = document.querySelector('#searchTerm').value;

  try {
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        q: searchTerm,
        api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym',
        limit: 1 // Limit the number of GIFs to 1 for now
      }
    });

    if (response.data.data.length > 0) {
      const gifUrl = response.data.data[0].images.original.url; // Get the URL of the first GIF
      appendGif(gifUrl);
    } else {
      alert('No GIF found for that search term!');
    }

  } catch (error) {
    console.error('Error fetching data from Giphy:', error);
  }
});

function appendGif(url) {
  const gifContainer = document.querySelector('#gifContainer');
  const img = document.createElement('img');
  img.src = url;
  gifContainer.appendChild(img);
}

// Event listener for the "Remove All GIFs" button
document.querySelector('#removeGifs').addEventListener('click', function() {
  const gifContainer = document.querySelector('#gifContainer');
  gifContainer.innerHTML = ''; // Remove all GIFs by clearing the innerHTML
});

