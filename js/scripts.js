const randomuserUrl = 'https://randomuser.me/api/?results=';
const numberOfResults = 12;

const xhr = new XMLHttpRequest();
xhr.open('GET', `${randomuserUrl}${numberOfResults}`);
xhr.onload = () => {
    if(xhr.status === 200) {
        const data = xhr.responseText;
        console.log(data);
    }    
};
xhr.send();