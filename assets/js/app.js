
const caruosel = document.querySelector('.caruosel');

const audio = document.querySelector('.audio');
const prev = document.querySelector('.prev');
const prevP = document.querySelector('.prev.page');
const play = document.querySelector('.play');
const playP = document.querySelector('.play.page');
const next = document.querySelector('.next');
const nextP = document.querySelector('.next.page');
const player = document.querySelector('.player')
const player_sec = document.querySelector('.player-btn')
const backToHome = document.querySelector('.backToHome')
const PageMain = document.querySelector('.PageMain')
const MusicArtist = document.querySelector('.MusicArtist')
const MusicName = document.querySelector('.MusicName')
const MusicCurrent = document.querySelector('.MusicCurrent')
const MusicDuration = document.querySelector('.MusicDuration')
const seek = document.getElementById('muz-seek')
const returnMusic = document.querySelector('.return-muz')
const MapItem = document.querySelector('.mapList')
const muzImg = document.querySelector('.muz-img')
const likeBtn = document.querySelector('.like')
const FavBtn = document.querySelector('.ext-fav-muz')
const FavBackBtn = document.querySelector('.likeGoback')
const LikeList = document.querySelector('.Like-list')
const Likes = document.querySelector('.likes')
const ErrorPa = document.querySelector('.error')


if(window.screen.availWidth > '450px'){
    ErrorPa.style.display = 'block'
}
else{
    ErrorPa.style.display = 'none'
}

let caruosel_count = 1;
setInterval(()=>{
    if (caruosel_count >= data.length-1){
        caruosel_count = 0
    }
    caruosel.src = data[caruosel_count].imagePath;
    caruosel_count++;
},3000)
let muzc = 0;

play.addEventListener('click',()=>{
    muzc++
    if(muzc%2==1){
        audio.play()
        play.src = `../assets/icons/dark/pause.png`
        playP.src = `../assets/icons/dark/pause.png`
    }
    else{
        audio.pause()
        play.src = `../assets/icons/dark/play.png`
        playP.src = `../assets/icons/dark/play.png`
    }
})
playP.addEventListener('click',()=>{
    muzc++
    if(muzc%2==1){
        audio.play()
        play.src = `../assets/icons/dark/pause.png`
        playP.src = `../assets/icons/dark/pause.png`
    }
    else{
        audio.pause()
        play.src = `../assets/icons/dark/play.png`
        playP.src = `../assets/icons/dark/play.png`
    }
})

function formatTime(time){
    let min = Math.floor(time / 60)
    if(min<10) min = '0' + min
    let sec = Math.floor(time % 60)
    if(sec<10) sec = '0' + sec

    return `${min}:${sec}`

}
function likly(){
    if(!data[music_count].fav){
        likeBtn.src = '../assets/icons/dark/like.png'
    }
    else{
        likeBtn.src = '../assets/icons/dark/likeFull.png'
    }
}


let music_count = 0;
MusicArtist.textContent = `${data[music_count].artist}`;
MusicName.textContent = `${data[music_count].songName}`;
setInterval(()=>{
    MusicDuration.textContent = ''
    MusicDuration.textContent = formatTime(audio.duration)
},100)
next.addEventListener('click',()=>{
    music_count++;  
    if(music_count>=data.length) music_count = 0;
    audio.src = data[music_count].songPath;
    muzc = 2 * muzc;
    MusicArtist.textContent = `${data[music_count].artist}`;
    MusicName.textContent = `${data[music_count].songName}`;
    muzImg.src = data[music_count].imagePath;
    likly()
    play.click()    
})
nextP.addEventListener('click',()=>{
    music_count++;
    if(music_count>=data.length) music_count = 0;
    audio.src = data[music_count].songPath;
    muzc = 2 * muzc;
    MusicArtist.textContent = `${data[music_count].artist}`;
    MusicName.textContent = `${data[music_count].songName}`;
    muzImg.src = data[music_count].imagePath;
    likly()
    play.click()    
})
prev.addEventListener('click',()=>{
    music_count--;
    if(music_count<=-1) music_count = data.length-1;
    audio.src = data[music_count].songPath;
    muzc = 2 * muzc;
    MusicArtist.textContent = `${data[music_count].artist}`;
    MusicName.textContent = `${data[music_count].songName}`;
    muzImg.src = data[music_count].imagePath;
    likly()
    play.click()
})
prevP.addEventListener('click',()=>{
    music_count--;
    if(music_count<=-1) music_count = data.length-1;
    audio.src = data[music_count].songPath;
    muzc = 2 * muzc;
    MusicArtist.textContent = `${data[music_count].artist}`;
    MusicName.textContent = `${data[music_count].songName}`;
    muzImg.src = data[music_count].imagePath;
    likly()
    play.click()
})

setInterval(()=>{
    MusicCurrent.innerHTML = formatTime(audio.currentTime)
    seek.value = (100 * audio.currentTime) / audio.duration
},300)
seek.addEventListener('change',()=>{
    audio.currentTime = (seek.value * audio.duration) / 100;
    muzc = 2*muzc
    play.click()
})
PageMain.addEventListener('click',()=>{
    player.style.right = 0;
    PageMain.style.opacity = 0
})


// 
// PageMain.click()
// 

backToHome.addEventListener('click',()=>{
    player.style.right = '-500px' 
    PageMain.style.opacity = 1
})
let isReturn = false;
returnMusic.addEventListener('click',()=>{
    if(!isReturn){
        returnMusic.src = '../assets/icons/light/return.png'
        returnMusic.style.background = '#ffffff'
        returnMusic.style.padding = '5px'
        returnMusic.style.borderRadius = '50%'
        isReturn = true
    }
    else {
        returnMusic.src = '../assets/icons/dark/return.png'
        returnMusic.style.background = 'transparent'
        returnMusic.style.padding = 0
        isReturn = false
    }

})
setInterval(()=>{
    if(audio.currentTime == audio.duration){
        nextP.click()
        if(isReturn){
            prevP.click()
        }
        console.clear();
    }
},500)

MapItem.style.color = 'transparent'
setInterval(()=>{

    MapItem.innerHTML = data.map((item)=>{
        if(data[music_count].songPath == item.songPath && audio.currentTime>0){
        return `
        <div id = 'mapList'>
            <img src = '${item.imagePath}' class = 'maplist-image'/>
            <div class = 'mapList-about'>
                <h3>${item.songName}</h3>
                <h3>${item.artist}</h3>
            </div>
            <img src = '../assets/icons/dark/pause.png'/ class = 'mapBtn'>
        </div>
        `
    }
    else{
        return `
        <div id = 'mapList'>
            <img src = '${item.imagePath}' class = 'maplist-image'/>
            <div class = 'mapList-about'>
                <h3>${item.songName}</h3>
                <h3>${item.artist}</h3>
                </div>
                <img src = '../assets/icons/dark/play.png'/ class = 'mapBtn'>
                </div>
                `
            }
        })
},1000)
        // const MapBtn = document.getElementsByClassName('.mapBtn')
// MapBtn.map((btn)=>{
//     btn.addEventListener('click',()=>{
//         MapBtn.src = '../assets/icons/dark/pause.png'

// })
// }) 
const playlistBtn = document.querySelector('.playlist-btn')
const playlistBack = document.querySelector('.playlistBack')
const playlist = document.querySelector('.playlist')
playlistBtn.addEventListener('click',()=>{
    playlist.style.right = 0
    playlist.style.left = 0

})
playlistBack.addEventListener('click',()=>{
    playlist.style.right = '-1000px'
    playlist.style.left = 'auto'

})

likeBtn.addEventListener('click',()=>{
    if(!data[music_count].fav){
        likeBtn.src = '../assets/icons/dark/likeFull.png'
        data[music_count].fav = true
    }
    else{
        likeBtn.src = '../assets/icons/dark/like.png'
        data[music_count].fav = false
    }
})

FavBtn.addEventListener('click',()=>{
    LikeList.style.left = 0
    LikeList.style.right = 0
    Likes.innerHTML = data.map((item)=>{
        if(item.fav){
            return `
            <div class = 'likes-list'>
                <img src ='${item.imagePath}' class='likes-list-img'>
                <div class = 'like-music-about'>
                    <h4>${item.songName}</h4>
                    <h3>${item.artist}</h3>
                </div>
                <img src = '../assets/icons/dark/likeFull.png' class = 'like-music-h'>
            </div>
            `
        }
    })
})

FavBackBtn.addEventListener('click',()=>{
    LikeList.style.left = '-500px'
    LikeList.style.right = auto
})
