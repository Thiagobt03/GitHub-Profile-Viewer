import { beseUrl, repositoriesQuantity } from "/src/scripts/variables.js";    


async function getRepositories(userName) {
    const response = await fetch(`${beseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);
    const repositories = await response.json();

    for (const repo of repositories) {
        const languageResponse = await fetch(repo.languages_url);
        const languageData = await languageResponse.json();
        repo.languages = Object.keys(languageData).join(', ');
    }

    return repositories;
    
}

export { getRepositories }