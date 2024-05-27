const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user, events, repositories){
        this.userProfile.innerHTML = `<div class="info"> 
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                <div class="data">
                                    <h1>${user.name ?? 'Não Possui Nome Cadrastado 😥'}</h1>
                                     <p>${user.bio ?? 'Não Possui Bio Cadrastada 😢'}</p>
                                     <p>Seguidores: ${user.followers}</p>
                                     <p>Seguindo: ${user.following}</p>
                            </div>
                         </div>`

          // Informaões adcionais do repositorio
        let repositoriesItns = ''
          user.repositories.forEach(repo => {
                    repositoriesItns +=`<li class="repo-info-item">
                                            <a href="${repo.html_url}" target="_blank">${repo.html_url}</a> 
                                            <span class="botao-icone">🍴: ${repo.forks_count}</span> 
                                            <span class="botao-icone">⭐: ${repo.stargazers_count}</span>
                                            <span class="botao-icone">👀: ${repo.watchers_count}</span>
                                            <span class="botao-icone">👨🏾‍💻: ${repo.languages}</span>
                                        </li>`;
        });

        // Repositorios Maiores
        if(user.repositories.length > 0 ) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItns}</ul>
                                        </div>`
        }   

                // Eventos do Usuario
            if (user.events.length > 0){
                let eventsItems = '';
                user.events.forEach(events =>{
                eventsItems += `<li><strong>${user.name}/${events.repo.name}</strong> - ${events.payload && events.payload.commits ? events.payload.commits[0].message : events.type}</li>`;
            });
                this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>
                                            </div>`
            } else {
                this.userProfile.innerHTML += "<div class='no-events'>Este usuário não tem eventos recentes.</div>";
            }
                
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }