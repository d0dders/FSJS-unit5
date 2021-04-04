const randomuserUrl = 'https://randomuser.me/api/?nat=us&inc=name,email,location,picture&results=';
const numberOfResults = 12;
const gallery = document.getElementById('gallery');
let data = null;



const xhr = new XMLHttpRequest();
xhr.open('GET', `${randomuserUrl}${numberOfResults}`);
xhr.onload = () => {
    if(xhr.status === 200) {
        data = JSON.parse(xhr.responseText).results;
        data.forEach(user => displayUser(user));
    }
}
xhr.send();

function displayUser(user) {
    console.log(user);
    html = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`
    gallery.insertAdjacentHTML("beforeend", html);
}


