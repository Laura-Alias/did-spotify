import SpotifyAPI from "../api/spotify.js";
import {getHashParams} from "../helpers/url.js";
import {STATE_KEY} from "../helpers/constants.js";

const USER_PROFILE = document.getElementById('user-profile');
const {access_token, state} = getHashParams();
const storedState = localStorage.getItem(STATE_KEY);


const outputTemplate = ({display_name, id, email, uri, external_urls, images, country}) =>`<h1>Logged in as </h1>
  <div class="media">
    <div class="pull-left">
      <img class="media-object" width="150" src="">
    </div>
    <div class="media-body">
      <dl class="dl-horizontal">
        <dt>Display name</dt><dd class="clearfix">${display_name}</dd>
        <dt>Id</dt><dd>${id}</dd>
        <dt>Email</dt><dd>${email}</dd>
        <dt>Spotify URI</dt><dd><a href="${uri}">${uri}</a></dd>
        <dt>Link</dt><dd><a href="${external_urls.spotify}">${external_urls.spotify}</a></dd>
        <dt>Profile Image</dt><dd class="clearfix"><a href=""></a></dd>
        <dt>Country</dt><dd>${country}</dd>
      </dl>
    </div>
  </div>`


if (!access_token || (state == null || state !== storedState)) {
  window.location = "/";
} else {
}

//Buttons

$(document).ready(function(){
	$("button.buttonFollowers").click(function(){
	$("#followerssection").fadeToggle("fast");
   	 	});
	});
	
$(document).ready(function(){
	$("button.buttonPopularity").click(function(){
	$("#popularitysection").fadeToggle("fast");
   	 	});
	});



//Followers 

const results = document.getElementById('results');
const firstArtist = document.getElementById('firstartist');
const secondArtist = document.getElementById('secondartist');
const playAgain = document.getElementById('playagain');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');


async function getArtists() {
try {
const userInput1 = document.getElementById('artist1').value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput1}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data = await response.json();
   for (let i = 0; i < data.artists.items.length; i++) {
     firstArtist.innerHTML = `<img src="${data.artists.items[i].images[i].url}"> <br> <span>${data.artists.items[i].name}</span>: ${data.artists.items[i].followers.total} followers`;
   }

                                                   
} catch (err){ 
    console.log(err);
 }
 
}

 button1.addEventListener('click', getArtists); 


                            
async function getArtists2() {
try {
const userInput2 = document.getElementById('artist2').value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput2}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data = await response.json();
     secondArtist.innerHTML = `<img src="${data.artists.items[0].images[0].url}"> <br> <span>${data.artists.items[0].name}</span>: ${data.artists.items[0].followers.total} followers`;


} catch (err){ 
    console.log(err);
 }
 
}

button2.addEventListener('click', getArtists2);



async function artistsFollowers() {
try {
const userInput1 = document.getElementById('artist1').value;
const response1 = await fetch(`https://api.spotify.com/v1/search?q=${userInput1}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data1 = await response1.json();
let followers1 = `${data1.artists.items[0].followers.total}`
let musicianName1 = `${data1.artists.items[0].name}`
let musicianPicture1 = `${data1.artists.items[0].images[0].url}`
function displayInfo1() {
     return followers1, musicianName1;
}
   displayInfo1();
      
const userInput2 = document.getElementById('artist2').value;
const response2 = await fetch(`https://api.spotify.com/v1/search?q=${userInput2}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data2 = await response2.json();
let followers2 = `${data2.artists.items[0].followers.total}`
let musicianName2 = `${data2.artists.items[0].name}`
let musicianPicture2 = `${data2.artists.items[0].images[0].url}`
function displayInfo2() {
     return followers2, musicianName2;
}
   displayInfo2();
   
    if (followers1 - followers2 > 0) {
    modalBox.innerHTML = `<img src="${musicianPicture1}"> <br> <span>${musicianName1}</span> is the WINNER !`
}   else if (followers1 - followers2 < 0) {
    modalBox.innerHTML = `<img src="${musicianPicture2}"> <br> <span>${musicianName2}</span> is the WINNER !`
} 	else if (followers2 === followers1) {
    modalBox.innerHTML = `Incredible ! They are equal with exactly ${followers1} followers!`;
}

}

 catch (err){ 
    console.log(err);
 }
}


//Play again Followers

document.getElementById('fight').addEventListener('click', artistsFollowers);


playAgain.addEventListener('click', () => location.reload())


//Popularity 

const resultsb = document.getElementById('resultsb');
const firstArtistb = document.getElementById('firstartistb');
const secondArtistb = document.getElementById('secondartistb');
const playAgainb = document.getElementById('playagainb');
const button1b = document.getElementById('button1b');
const button2b = document.getElementById('button2b');


async function getArtistsb() {
try {
const userInput1b = document.getElementById('artist1b').value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput1b}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const datab = await response.json();
   for (let i = 0; i < datab.artists.items.length; i++) {
     firstArtistb.innerHTML = `<img src="${datab.artists.items[i].images[i].url}"> <br> <span>${datab.artists.items[i].name}</span>: ${datab.artists.items[i].popularity}/100 of popularity`;
   }

                                                   
} catch (err){ 
    console.log(err);
 }
 
}

 button1b.addEventListener('click', getArtistsb); 

                            
async function getArtists2b() {
try {
const userInput2b = document.getElementById('artist2b').value;
const response = await fetch(`https://api.spotify.com/v1/search?q=${userInput2b}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const datab = await response.json();
     secondArtistb.innerHTML = `<img src="${datab.artists.items[0].images[0].url}"> <br> <span>${datab.artists.items[0].name}</span>: ${datab.artists.items[0].popularity}/100 of popularity`;


} catch (err){ 
    console.log(err);
 }
 
}

button2b.addEventListener('click', getArtists2b);



async function artistsPopularity() {
try {
const userInput1b = document.getElementById('artist1b').value;
const response1b = await fetch(`https://api.spotify.com/v1/search?q=${userInput1b}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data1b = await response1b.json();
let popularity1 = `${data1b.artists.items[0].popularity}`
let musicianName1b = `${data1b.artists.items[0].name}`
let musicianPicture1b = `${data1b.artists.items[0].images[0].url}`
function displayInfo1b() {
     return popularity1, musicianName1b;
}
   displayInfo1b();
      
const userInput2b = document.getElementById('artist2b').value;
const response2b = await fetch(`https://api.spotify.com/v1/search?q=${userInput2b}/&type=artist&limit=1`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
const data2b = await response2b.json();
let popularity2 = `${data2b.artists.items[0].popularity}`
let musicianName2b = `${data2b.artists.items[0].name}`
let musicianPicture2b = `${data2b.artists.items[0].images[0].url}`
function displayInfo2b() {
     return popularity2, musicianName2b;
}
   displayInfo2b();
   
    if (popularity1 - popularity2 > 0) {
    modalBoxb.innerHTML = `<img src="${musicianPicture1b}"> <br> <span>${musicianName1b}</span> is the WINNER !`
}   else if (popularity1 - popularity2 < 0) {
    modalBoxb.innerHTML = `<img src="${musicianPicture2b}"> <br> <span>${musicianName2b}</span> is the WINNER !`
} 	else if (popularity2 === popularity1) {
    modalBoxb.innerHTML = `Incredible ! They are equal with exactly ${popularity1}/100 of popularity!`;
}

}

 catch (err){ 
    console.log(err);
 }
}

//Play again Popularity

document.getElementById('fightb').addEventListener('click', artistsPopularity);


playAgainb.addEventListener('click', () => location.reload()) 



