// Putting all songs info into variable (array)
const songs = {
    id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    title: [
        "Kowalski",
        "Castelo",
        "Three Views Of A Secret",
        "Give It Up Or Turnit a Loose",
        "Black Moon Rising",
        "Black Dynamite Main Theme",
        "Carter Takes A Train",
        "The Sicilian Clan",
        "Le Samourai Theme (Remix)",
        "Between the Lines",
        "Final Form",
        "Family and Loyalty"
    ],
    artist: [
        "Primal Scream",
        "Azymuth",
        "Jaco Pastorius",
        "James Brown",
        "Black Pumas",
        "Adrian Younge",
        "Roy Budd",
        "Ennio Morricone",
        "François De Roubaix",
        "Ashley Henry",
        "Sampa The Great",
        "Gang Starr"
    ],
    duration: ["04:18", "03:34", "06:36", "04:50", "03:42", "03:08", "02:58", "03:37", "04:10", "04:47", "03:36", "04:34"],
    album: [
        "Vanishing Point",
        "Demos (1973-75) Volumes 1&2",
        "Truth, Liberty & Soul",
        "Live at Home with His Bad Self",
        "Black Pumas",
        "Black Dynamite OST",
        "Get Carter OST",
        "Ennio Morricone - The Gangster Collection",
        "Le Samurai OST (Reissue)",
        "Beautiful Vinyl Hunter",
        "The Return",
        "One Of The Best Yet"
    ],
    year: [1997, 2019, 2017, 2019, 2019, 2009, 1971, 1999, 2018, 2019, 2019, 2019]

}

// Song asset paths
const songPath = 'assets/songs/',
    coverPath = 'assets/covers/';

// Minutes and seconds
let sec = new Number();
let min = new Number();


// DOM Variables
const currentSongDisplay = document.getElementById('currentSong'),
    albumCover = document.getElementById('albumCover'),
    albumTitle = document.getElementById('albumTitle'),
    albumYear = document.getElementById('albumYear'),
    source = document.getElementById('source'),
    progressBar = document.getElementById('progress'),
    trackTime = document.getElementById('tracktime');

// const li = document.querySelectorAll('.song');

// Creating playlist with songs from array
function createSongList() {
    // create ordered list
    const list = document.createElement('ol');

    // loop through songs array
    for (let i = 0; i < songs.id.length; i++) {
        // create li item for each song
        const item = document.createElement('li');
        item.setAttribute("class", "song");
        const itemTime = document.createElement('span');

        item.setAttribute("name", songs.title[i]);
        item.setAttribute("id", songs.id[i]);
        // inserting song name and artist
        item.appendChild(document.createTextNode(songs.artist[i] + " - " + songs.title[i]));
        // inserting song duration
        itemTime.appendChild(document.createTextNode(songs.duration[i]));
        //inserting span into li
        item.appendChild(itemTime);
        // inserting li item into ol
        list.appendChild(item);
    }

    return list;
}

// inserting ol into empty div
document.getElementById('songList').appendChild(createSongList());

// Init audio
const firstItem = document.querySelector('.song');
// console.log(firstItem);

// Init audio function
function initAudio() {
    firstItem.classList.add('active');

    const firstItemName = firstItem.getAttribute("name");
    // console.log(firstItemName); // vraca naziv pesme iz name atributa
    const firstItemId = firstItem.getAttribute("id");
    // console.log(firstItemId); // vraca id vrednost iz atributa
    source.src = songPath + firstItemName + ".mp3";
    // console.log(source.src); // put do fajla+naziv pesme+mp3

    // Display current song name
    currentSongDisplay.innerHTML = `${firstItem.innerText} <i class="fas fa-ellipsis-v" onclick="document.getElementById('songInfo').classList.toggle('showInfo');"></i>`;

    // Get extra song info and display in SongInfo panel
    albumCover.src = coverPath + songs.album[firstItemId - 1] + '.jpg';
    albumTitle.innerHTML = "Album: " + songs.album[firstItemId - 1];
    albumYear.innerHTML = "Year: " + songs.year[firstItemId - 1];

    player.load();
    playAudio();
}

initAudio();

// Click event; playing songs when clicked
songList.onclick = (e) => {
    const clickedItem = e.target;
    // console.log(clickedItem); // vraca li item na koji kliknemo (sa inner textom)
    const clickedItemName = clickedItem.getAttribute("name");
    // console.log(clickedItemName); // vraca naziv pesme iz name atributa
    const clickedItemId = clickedItem.getAttribute("id");
    // console.log(clickedItemId); // vraca id vrednost iz atributa
    source.src = songPath + clickedItemName + ".mp3";
    // console.log(source.src); // put do fajla+naziv pesme+mp3

    // Display current song name
    currentSongDisplay.innerHTML = `${clickedItem.innerText} <i class="fas fa-ellipsis-v" onclick="document.getElementById('songInfo').classList.toggle('showInfo');"></i>`;

    // Get extra song info and display in SongInfo panel
    albumCover.src = coverPath + songs.album[clickedItemId - 1] + '.jpg';
    albumTitle.innerHTML = "Album: " + songs.album[clickedItemId - 1];
    albumYear.innerHTML = "Year: " + songs.year[clickedItemId - 1];

    // loading selected song 
    player.load();
    // playing selected song
    player.play();

    const li = document.querySelectorAll('.song');
    // remove active class from all songs
    for (let i = 0; i < li.length; i++) {
        li[i].classList.remove('active');
    }

    // add active class to li item that is clicked
    clickedItem.classList.add("active");

}

// automatically play next song
player.addEventListener('ended', function () {
    nextItem();

    player.pause();
    player.load();
    player.play();

    // for chrome bug
    const playPromise = player.play();
    if (playPromise !== null) {
        playPromise.catch(() => {
            player.play();
        });
    }

});

function next() {
    nextItem();

    player.load();
    player.play();
}

function prev() {
    let active = document.querySelector('li.active');
    let prevItem = active.previousElementSibling;
    // console.log(prevItem);
    let prevItemName = prevItem.getAttribute("name");
    // console.log(prevItemName);
    let prevItemId = prevItem.getAttribute("id");
    // console.log(prevItemId);
    source.src = songPath + prevItemName + ".mp3";
    // console.log(source.src);
    active.classList.remove('active');
    prevItem.classList.add('active');

    // Display current song name
    currentSongDisplay.innerHTML = `${prevItem.innerText} <i class="fas fa-ellipsis-v" onclick="document.getElementById('songInfo').classList.toggle('showInfo');"></i>`;

    // Get extra song info and display in SongInfo panel
    albumCover.src = coverPath + songs.album[prevItemId - 1] + '.jpg';
    albumTitle.innerHTML = "Album: " + songs.album[prevItemId - 1];
    albumYear.innerHTML = "Year: " + songs.year[prevItemId - 1];

    player.load();
    player.play();
}

function nextItem() {
    let active = document.querySelector('li.active');
    let nextItem = active.nextElementSibling;
    // console.log(nextItem);
    let nextItemName = nextItem.getAttribute("name");
    // console.log(nextItemName);
    let nextItemId = nextItem.getAttribute("id");
    // console.log(nextItemId);
    source.src = songPath + nextItemName + ".mp3";
    // console.log(source.src);
    active.classList.remove('active');
    nextItem.classList.add('active');

    // Display current song name
    currentSongDisplay.innerHTML = `${nextItem.innerText} <i class="fas fa-ellipsis-v" onclick="document.getElementById('songInfo').classList.toggle('showInfo');"></i>`;

    // Get extra song info and display in SongInfo panel
    albumCover.src = coverPath + songs.album[nextItemId - 1] + '.jpg';
    albumTitle.innerHTML = "Album: " + songs.album[nextItemId - 1];
    albumYear.innerHTML = "Year: " + songs.year[nextItemId - 1];
}


// Controls functions
function playAudio() {
    // checking if audio is loaded
    if (player.readyState) {
        player.play();
    }
}

function pauseAudio() {
    player.pause();

}

function stopAudio() {
    player.pause();
    player.currentTime = 0;
    // document.getElementById('tracktime').style.display = "none";
    trackTime.innerHTML = "00:00";
    progressBar.value = 0;
}

// Volume control
const volSlider = document.getElementById('volumeSlider');
// console.log(volSlider.value);
// input event (reaguje na pomeranje range dugmeta)
volSlider.oninput = (e) => {
    const volume = e.target.value;
    // console.log(volume); // vraca vrednost izmedju 0 i 1 kada pomeramo range dugme

    player.volume = volume;

    document.getElementById('volume').innerHTML = "Volume: " + Math.round(volume * 100) + "%";
}

// Mute control
const volMute = document.querySelector('.fa-volume-up');
volMute.addEventListener('click', (e) => {
    player.muted = !player.muted;
    // console.log(player.muted); // vraca true/false

    if (player.muted) {
        volMute.className = "fas fa-volume-mute";
    } else {
        volMute.className = "fas fa-volume-up";
    }
}, false);

// Ontimeupdate event; updating progress bar and current time
player.ontimeupdate = () => {
    // without this IF, we have an error since it can't calculate the progressBar.value if it doesn't know the duration of the song; it will start doing the math only once the song has started.
    if (player.currentTime > 0) {
        progressBar.value = (player.currentTime / player.duration) * 100; // so we can have a %
        // console.log("Progress bar value: " + progressBar.value); // vraca vrednost od 0 do 100
        // console.log("Player current time: " + Math.floor(player.currentTime)); // vraca koliko je vremena proslo od pocetka pesme u celim sekundama

        // Getting current time
        getCurrentTime();
    }
}

// Get song's current time
function getCurrentTime() {
    sec = Math.floor(player.currentTime);
    min = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec;
    trackTime.innerHTML = (min + ":" + sec);
}