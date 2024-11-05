//BucketHatBob 1/6/2023 modified eriqjaffe 5/7/2024

var songs = Array.from(document.getElementsByClassName("sticky-top"));
var texts = Array.from(document.getElementsByClassName("text-body-tertiary"))
var headers = Array.from(document.getElementsByClassName("card-title"))
var playlistInfo = [];

var round = texts[0].innerHTML.slice(6)

var roundNameHeader = songs[0].getElementsByTagName("h5")
var roundName = headers[3].innerHTML

songs.slice(0).forEach(song => {
    var songInfo = {
        round: round,
      	roundName: '"'+roundName+'"',
        trackName: "",
        trackUrl: "",
        artist: "",
        album: "",
        submittedBy: "",
        votes: ""
    };
    var dats = Array.from(song.getElementsByClassName("text-truncate"));
    var i = 0;
    var name, trackUrl, artist, album, sumbittedBy, votes;
    
    dats.forEach(dat => {
        var datEls = Array.from(dat.children);
        var trackURI = dat.closest(".mb-4").id.split(":")
        songInfo.trackUrl = '"https://open.spotify.com/track/'+trackURI[2]+'"'
        if (i == 0) {
          var bar = Array.from(dat.parentElement.getElementsByClassName("text-end"))
          songInfo.trackName = '"' + datEls[0].innerHTML.match(/>([^<]+)<\/a>/)[1] + '"';
          songInfo.artist = '"' + datEls[1].innerHTML + '"';
          songInfo.album = '"' + datEls[2].innerHTML + '"';
          songInfo.votes = bar[0].getElementsByClassName("m-0")[0].innerText
        } else if (i == 4) {
          songInfo.submittedBy = '"' + datEls[0].innerHTML + '"';
        }
        i++;
    });
    if (songInfo.trackName.length > 0) {
        playlistInfo.push(songInfo);
    }
});

playlistInfo.sort((a, b) => {
    // First compare by artist
    if (a.artist < b.artist) return -1;
    if (a.artist > b.artist) return 1;
    // If artist is the same, compare by trackName
    if (a.trackName < b.trackName) return -1;
    if (a.trackName > b.trackName) return 1;
    return 0;
});

console.table(playlistInfo);

var csvContent = "\ufeff";
csvContent += "round,roundName,trackName,trackURL,artist,album,submittedBy,votes\r";
for (var row = 0; row < playlistInfo.length; row++) {
    csvContent += playlistInfo[row].round + ",";
    csvContent += playlistInfo[row].roundName + ",";
    csvContent += playlistInfo[row].trackName + ",";
    csvContent += playlistInfo[row].trackUrl + ",";
    csvContent += playlistInfo[row].artist + ",";
    csvContent += playlistInfo[row].album + ",";
    csvContent += playlistInfo[row].submittedBy + ",";
    csvContent += playlistInfo[row].votes + "\r";
}

var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
var url = URL.createObjectURL(blob);
var link = document.createElement('a');
link.href = url;
link.setAttribute('download', roundName+'.csv');
document.body.appendChild(link);
link.click();
URL.revokeObjectURL(url);
