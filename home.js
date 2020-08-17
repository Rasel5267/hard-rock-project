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
    <ul class = 'songs'>
    ${data.data.map(song => `
    <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button style="color:white;background:green;" class ="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
    </li>`)
    .join('')
}
    </ul>
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
