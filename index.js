const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

let searchQuery = '';


function getDataFromApi(searchTerm, callback, page) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDDaRbvVVP-AkYsuc2m_88PXDk81aMJWdQ',
    q: `${searchTerm} in:name`,
    
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function watchForSubmit() {
  /* this function will wait for the user to click the submit button. one it is clicked the function will send the search data to the website */
  $('.js-search-button').on('click', event => {
    event.preventDefault();
    searchQuery = $('.js-query').val();
    $('.js-query').val('');
    getDataFromApi(searchQuery, returnResults)
  })
}

function watchPrevSubmit() {
  $('main').on('click', '.prevbutton', event => {
    event.preventDefault();
    getDataFromApi(searchQuery, returnResults, prevPage)
    
  })
}

function watchNextSubmit() {
  $('main').on('click', '.nextbutton', event => {
    event.preventDefault();
    getDataFromApi(searchQuery, returnResults, nextPage)
  })
}


function returnResults(data) {
  $('main').html('');
  $('main').append(`
  <p>Total results: ${data.pageInfo.totalResults}</p> <!-- This provides the same number no matter what you put in the search bar -->
  `)
  for (i=0; i<data.items.length; i++) {
    const titleResult = data.items[i];
    $('main').append(`
    <p class="videotitle">${titleResult.snippet.title}</p>
    <a href="https://www.youtube.com/watch?v=${titleResult.id.videoId}"><img src="${titleResult.snippet.thumbnails.medium.url}" alt="Thumbnail for ${titleResult.snippet.title}"></a>
    `)
  }
}

watchForSubmit()
