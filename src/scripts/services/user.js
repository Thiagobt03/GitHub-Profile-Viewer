import { beseUrl } from "../../scripts/variables.js";    

async function getUser(userName) {
    const response = await fetch(`${beseUrl}/${userName}`);
    return await response.json()
}

export { getUser }