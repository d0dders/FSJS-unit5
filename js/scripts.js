const randomuserUrl = 'https://randomuser.me/api/?nat=us&inc=name,email,location,picture,cell,dob&results=';
const numberOfResults = 12;
const gallery = document.getElementById('gallery');
const modalContainer = document.querySelector('.modal-container');
const modalInfo = document.querySelector('.modal-info-container');
const modalClose = document.getElementById('modal-close-btn');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const searchContainer = document.querySelector('.search-container');
let data = null;
let currentIndex = null;
var dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};


searchContainer.innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', () => {
    filterUsers(searchInput.value);
});


const searchButton = document.getElementById('search-submit');
searchButton.addEventListener('click', () => filterUsers(searchInput.value));


function filterUsers(searchString) {
    const names = document.querySelectorAll('.card-name');
    names.forEach(name => { name.parentElement.parentElement.style.display = 'none' });
    names.forEach(name => {
        if(name.innerText.toLowerCase().includes(searchString.toLowerCase())){
            name.parentElement.parentElement.style.display = 'initial';
        }
    });
}


modalContainer.style.display = 'none';
modalClose.addEventListener('click', () => modalContainer.style.display = 'none');
modalPrev.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? currentIndex : currentIndex -= 1;
    displayModal(currentIndex);
});
modalNext.addEventListener('click', () => {
    currentIndex = currentIndex === numberOfResults - 1 ? currentIndex : currentIndex += 1;
    displayModal(currentIndex);
});

const xhr = new XMLHttpRequest();
xhr.open('GET', `${randomuserUrl}${numberOfResults}`);
xhr.onload = () => {
    if(xhr.status === 200) {
        data = JSON.parse(xhr.responseText).results;
        data.forEach((user, index) => displayUser(user, index));
    }
}
xhr.send();

function displayUser(user, index) {
    html = `<div class="card" data-index=${index}>
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

function displayModal(index) {

    const user = data[index];
    html = `<img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleString("en-US", dateOptions)}</p>`
    modalInfo.innerHTML = html;
    modalContainer.style.display = 'initial';
}

gallery.addEventListener('click', e => {
    if(e.target !== gallery){
        currentIndex = parseInt(e.target.closest('.card').dataset.index); 
        displayModal(currentIndex);
    }
});