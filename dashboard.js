
let username=document.getElementById('username');
let search=document.getElementById('search')
let searchtitle=document.getElementById('searchtitle')
username.textContent=`Hello `+`${JSON.parse(localStorage.getItem('displayName'))}`+` !`

let moviesList=document.querySelector('.movie-card');
let ids={'28':'Action','80':'Crime','53':'Thriller','18':'Drama','10751':'Family','35':'Comedy','12':'Adventure','14':'Fantasy','36':'History','10749':'Romance'},genreslist=""

let xhr=new XMLHttpRequest();

function getValues(){
    xhr.open('Get','https://mimic-server-api.vercel.app/movies')
    xhr.onload=()=>{
        JSON.parse(xhr.response).forEach(x=>{
            displayValues(x)
        })
    }
    xhr.send()
}

getValues()

function displayValues(n){
    n.genre_ids.forEach(i=>{genreslist+=ids[i]+','})
    let section=document.createElement('section');
    section.innerHTML=`   
    <img id="poster" src="${n.poster_path}" alt="Movie Poster">
        <div class="movie-info">
            <h6 id="title">${n.title}</h6>
            <p>Original Lang: <span id="original_lang">${n.original_language}</span></p>
            <p>Release Date: <span id="release_date">${n.release_date}</span></p>
            <p>Genres: <span id="genres">${genreslist}</span></p>
            <p>Rating: <span id="vote_average">${n.vote_average}</span>/10</p>
        </div>`
         genreslist=''
         moviesList.append(section)
}

search.addEventListener('click',()=>{
searching(searchtitle.value)
})

function searching(i){
    searchDiv.style.display="block";
    let zhr=new XMLHttpRequest();
    zhr.open('Get',`https://mimic-server-api.vercel.app/movies?title=${i}`)
    zhr.onload=()=>{
        JSON.parse(zhr.response).forEach(n=>{
            searchValues(n)
            check=false;
        })
    }
    zhr.send()
}

let searchDiv=document.getElementById('search-div')

function searchValues(n){
    n.genre_ids.forEach(i=>{genreslist+=ids[i]+','})
    searchDiv.innerHTML=`  <img id="poster" src="${n.poster_path}" alt="Movie Poster">
        <div class="movie-info">
            <h6 id="title">${n.title}</h6>
            <p>Original Lang: <span id="original_lang">${n.original_language}</span></p>
            <p>Release Date: <span id="release_date">${n.release_date}</span></p>
            <p>Genres: <span id="genres">${genreslist}</span></p>
            <p>Rating: <span id="vote_average">${n.vote_average}</span>/10</p>
        </div>`
        genreslist=''
}

function closingSearch(){
    document.getElementById('search-div').style.display='none'
}


