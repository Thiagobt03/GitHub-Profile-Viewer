import { getUser } from "../src/scripts/services/user.js";    
import { getRepositories } from "../src/scripts/services/repositories.js"; 

import { user } from "../src/scripts/objects/user.js";
import { screen } from "../src/scripts/objects/screen.js";

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.key
    const isEnterKeyPressed = key === 'Enter'

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return;
        getUserData(userName);
    }
});

function validateEmptyInput(userName) {
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName){

    try {
        
        const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return
    }


    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getUserEvents(userName);
        user.setInfo(userResponse)
        user.setRepositories(repositoriesResponse)
        user.setEvents(eventsResponse)

        screen.renderUser(user, eventsResponse)

    } catch (error) {
        
        console.error('Erro ao obter os dados do usuário:', error);

    }
}

async function getUserEvents(userName){
    const eventsUrl = `https://api.github.com/users/${userName}/events`;
    const response = await fetch(eventsUrl);
    const events = await response.json();

    return events.filter(event => event.type === 'CreateEvent' || event.type === 'PushEvent').slice(0, 10);
}