//BucketHatBob 1/6/2023

var songs = Array.from(document.getElementsByClassName("rounded"));
var playlistInfo = [];

songs.forEach(song => {
    var songInfo = {
        name: "",
        artist: "",
        album: "",
        notes: ""
    };
    var dats = Array.from(song.getElementsByClassName("d-block"));
    var i = 0;
    var name, artist, album;
    dats.forEach(dat => {
        var datEls = Array.from(dat.children);
        if (i == 0) {
            songInfo.name = '"' + datEls[0].innerHTML + '"';
        } else if (i == 1) {
            songInfo.artist = '"' + datEls[0].innerHTML + '"';
        } else if (i == 2) {
            songInfo.album = '"' + datEls[0].innerHTML + '"';
        }
        i++;
    });
    if (songInfo.name.length > 0) {
        playlistInfo.push(songInfo);
    }
});

console.table(playlistInfo);

let csv
    // Loop the array of objects
for (let row = 0; row < playlistInfo.length; row++) {
    let keysAmount = Object.keys(playlistInfo[row]).length
    let keysCounter = 0
        // If this is the first row, generate the headings
    if (row === 0) {
        // Loop each property of the object
        for (let key in playlistInfo[row]) {
            // This is to not add a comma at the last cell
            // The '\r\n' adds a new line
            csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
            keysCounter++
        }
    } else {
        for (let key in playlistInfo[row]) {
            csv += playlistInfo[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
            keysCounter++
        }
    }
    keysCounter = 0
}

// Once we are done looping, download the .csv by creating a link
let link = document.createElement('a');
link.id = 'download-csv';
link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURI(csv));
link.setAttribute('download', 'playlist.csv');
document.body.appendChild(link);
document.querySelector('#download-csv').click();
