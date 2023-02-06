//BucketHatBob 1/6/2023 modified eriqjaffe 2/6/2023

var songs = Array.from(document.getElementsByClassName("rounded"));
var playlistInfo = [];

songs.slice(1).forEach(song => {
    var songInfo = {
        name: "",
        artist: "",
        album: "",
        submittedBy: "",
        votes: ""
    };
    var dats = Array.from(song.getElementsByClassName("d-block"));
    var i = 0;
    var name, artist, album, sumbittedBy, votes;
    dats.forEach(dat => {
       
        var datEls = Array.from(dat.children);
    		console.log(i)
        if (i == 0) {
            songInfo.name = '"' + datEls[0].innerHTML + '"';
        } else if (i == 1) {
            songInfo.artist = '"' + datEls[0].innerHTML + '"';
        } else if (i == 2) {
            songInfo.album = '"' + datEls[0].innerHTML + '"';
        } else if (i == 3) {
            songInfo.votes = dat.innerHTML.slice(1);
        } else if (i == 4) {
            songInfo.submittedBy = dat.innerHTML.slice(13);
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

console.log(csv)

// Once we are done looping, download the .csv by creating a link
let link = document.createElement('a');
link.id = 'download-csv';
link.setAttribute('href', 'data:text/csv;charset=utf-8,' + csv);
link.setAttribute('download', 'playlist.csv');
document.body.appendChild(link);
document.querySelector('#download-csv').click();
