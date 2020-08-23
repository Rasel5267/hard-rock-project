const searchBtn = document.getElementById('searchBtn');
const search = document.getElementById('search');
const result = document.getElementById('result');

const apiURL = "https://api.lyrics.ovh/";

// Search by song or artist\
async function searchSongs(searchTerm){
    const res = await fetch(`${apiURL}/suggest/${searchTerm}`)
    const data = await res.json()
    showData(data);
}

//Show Song and Artist
function showData(data){
    result.innerHTML =`  
    ${data.data.map(song => `
    <div class = 'single-result row align-items-center my-3 p-3'>
        <div class="col-md-8 text-md-left ">
            <h3 class="lyrics-name">${song.artist.name}</h3>
            <p class="author lead">Title: ${song.title}</p>
        </div>
        <div class="col-md-4 text-md-right text-center">
        <button class ="btn btn-success" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
        </div>
    </div>
    `)
    .slice(0,10)
    .join('')
}
    `;
}
//get lyrics for song
async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<span><strong>${artist}</strong><br> - ${lyrics}</span>`;
    more.innerHTML = '';
}
//Get Lyrics Button Click
result.addEventListener('click', e =>{
    const clickedElement = e.target;
    if(clickedElement.tagName === 'BUTTON'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');
        getLyrics(artist, songTitle);
    }
})
//Event Listeners
searchBtn.addEventListener('click', e =>{
    e.preventDefault();
    const searchTerm = search.value;
    if(!searchTerm){
        alert('Please type in a search term');
    }else{
        searchSongs(searchTerm);
    }
    
})



