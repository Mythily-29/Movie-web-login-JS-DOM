let username=document.getElementById('username');
let search=document.getElementById('search')
let searchtitle=document.getElementById('searchtitle')
let addmovie=document.getElementById('addmovie');
let addmoviesubmitbtn=document.getElementById('addmovie-submit-btn');
username.textContent=`Hello `+`${JSON.parse(localStorage.getItem('displayName'))}`+` !`

let moviesList=document.querySelector('.movie-card');
let ids={'28':'action','80':'crime','53':'thriller','18':'drama','10751':'family','35':'comedy','12':'adventure','14':'fantasy','36':'history','10749':'romance'},genreslist=""
let postids={'action':'28','crime':'80','thriller':'53','drama':'18','family':'10751','comedy':'35','adventure':'12','fantasy':'14','history':'36','romance':'10749'},postgenrelist=''

function getValues(){
    let xhr=new XMLHttpRequest();
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

    n.genre_ids=n.genre_ids!=[] ? n.genre_ids.forEach(i=>{genreslist+=ids[i]+','}): ""
    n.adult=n.adult==false? '16+' :'18+' 
    let section=document.createElement('section');
    section.innerHTML=`   
    <img id="poster" src="${n.poster_path}" alt="Movie Poster">
        <div class="movie-info">
            <h6 id="title">${n.title}</h6>
            <p>Original Lang: <span id="original_lang">${n.original_language}</span></p>
            <p>Release Date: <span id="release_date">${n.release_date}</span></p>
            <p>Genres: <span id="genres">${genreslist}</span></p>
            <p>Adult: <span id="genres">${n.adult}</span></p>
            <p>Rating:<i class="fa-solid fa-star" style="color: #FFD43B;"></i><span id="vote_average">${n.vote_average}</span>/10</p>
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
        })
    }
    zhr.send()
}

let searchDiv=document.getElementById('search-div')

function searchValues(n){
    n.genre_ids.forEach(i=>{genreslist+=ids[i]+','})
    n.adult=n.adult==false? '16+' :'18+' 
    searchDiv.innerHTML=`  <img id="poster" src="${n.poster_path}" alt="Movie Poster">
        <div class="movie-info">
            <h6 id="title">${n.title}</h6>
            <p>Original Lang: <span id="original_lang">${n.original_language}</span></p>
            <p>Release Date: <span id="release_date">${n.release_date}</span></p>
            <p>Genres: <span id="genres">${genreslist}</span></p>
            <p>Adult: <span id="genres">${n.adult}</span></p>
            <p>Rating:<i class="fa-solid fa-star" style="color: #FFD43B;"></i> <span id="vote_average">${n.vote_average}</span>/10</p>
        </div>`
        genreslist=''
}

addmoviesubmitbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let poster_path = document.getElementById('poster_url').value,
    title = document.getElementById('title-name').value,
    original_language=document.getElementById('original_lang_name').value,
    release_date=document.getElementById('release_date_name').value,
    genre_ids=document.getElementById('genre-name').value,
    adult=document.getElementById('adult').value,
    vote_average=document.getElementById('vote_average_val').value;    
    genre_ids=genre_ids.split(',').map(x=>x.toLowerCase())

    postgenrelist=''
    genre_ids.forEach(i=>{postgenrelist+=postids[i]+','})

    let vhr=new XMLHttpRequest();
    vhr.open('POST','https://mimic-server-api.vercel.app/movies')
    vhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    let obj={'poster_path':poster_path,'title':title,
        'original_language':original_language,'release_date':release_date,
        'genre_ids':postgenrelist,'adult':adult,
        'vote_average':vote_average
    };
    vhr.send(JSON.stringify(obj));
    vhr.onload=()=>{getValues()}
   
})
function openmovieDiv(){
 document.getElementById('addmovies').style.display='block'
}
function closingaddmovie(){
    document.getElementById('addmovies').style.display='none'
}
function closingSearch(){
    document.getElementById('search-div').style.display='none'
}


