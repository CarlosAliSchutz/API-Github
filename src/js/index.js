import { getRepositories } from './services/repositories.js'
import { getUser } from './services/user.js'

import { screen } from './objects/screen.js'
import { user } from './objects/user.js'

document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value

  if (validadeEmptyInput(userName)) return
  getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (event) => {
  const userName = event.target.value
  const key = event.which || event.keyCode
  const isEnterKeyPressed = key === 13

  if (isEnterKeyPressed) {
    if (validadeEmptyInput(userName)) return
    getUserProfile(userName)
  }
})

function validadeEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub")
    return true
  }
}

async function getUserProfile(userName){
  const userResponse = await getUser(userName)

  if (userResponse.message === "Not Found") {
    screen.renderNotFound()
    return
  }

  const repositories = await getRepositories(userName)

  user.setInfo(userResponse)
  user.setRepositories(repositories)

  screen.renderUser(user)
}

