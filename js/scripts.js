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
const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};


/**
 * Creates a employee card
 * @param {Object} employee - An object represnting the employee 
 * @param {Integer} index - An index to assign the employee 
 */
function displayemployee(employee, index) {
    html = `<div class="card" data-index=${index}>
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    </div>`
    gallery.insertAdjacentHTML("beforeend", html);
}


/**
 * Display a employee in a modal
 * @param {Integer} index - The index of the employee to display 
 */
function displayModal(index) {
    const employee = data[index];
    html = `<img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell.replace('-', ' ')}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${new Date(employee.dob.date).toLocaleString("en-US", dateOptions)}</p>`
    modalInfo.innerHTML = html;
    modalContainer.style.display = 'initial';
    modalPrev.style.display = index <= 0 ? 'none' : 'initial';
    modalNext.style.display = index >= numberOfResults - 1 ? 'none' : 'initial';
}


/**
 * Filter employees by name
 * @param {String} searchString - String to filter employees against
 */
function filteremployees(searchString) {
    const names = document.querySelectorAll('.card-name');
    names.forEach(name => { name.parentElement.parentElement.style.display = 'none' });
    names.forEach(name => {
        if(name.innerText.toLowerCase().includes(searchString.toLowerCase())){
            name.parentElement.parentElement.style.display = 'initial';
        }
    });
}


/**
 * Setup search
 */
searchContainer.innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', () => {
    filteremployees(searchInput.value);
});
const searchButton = document.getElementById('search-submit');
searchButton.addEventListener('click', () => filteremployees(searchInput.value));


/**
 * Set up modal
 */
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


/**
 * Setup click event on cards
 */
gallery.addEventListener('click', e => {
    if(e.target !== gallery){
        currentIndex = parseInt(e.target.closest('.card').dataset.index); 
        displayModal(currentIndex);
    }
});


/**
 * Get employee data
 */
const xhr = new XMLHttpRequest();
xhr.open('GET', `${randomuserUrl}${numberOfResults}`);
xhr.onload = () => {
    if(xhr.status === 200) {
        data = JSON.parse(xhr.responseText).results;
        data.forEach((employee, index) => displayemployee(employee, index));
    }
}
xhr.send();