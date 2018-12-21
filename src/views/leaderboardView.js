import * as _ from '@/utils'

const promptHTML = `<div class='header'>HIGH SCORE!</div>
<div class='subheader'>Enter your name to be on the leaderboard:</div>
<div class='input'>
    <input type='text' class='text-input' maxlength='6'></input>
</div>
<div class='buttons'>
    <div class='cancel'>Nahh</div>
    <div class='submit'>Submit</div>
</div>`

const row = entry => (`
  <div class='row ${entry.newEntry ? 'new-score' : ''}'>
    <div class='name'>${entry.name}</div>
    <div class='time'>${_.mmss(entry.elapsed)}</div>
    <div class='score'>${_.numberCommas(entry.score)}</div>
  </div>
`)

export const renderLeaderboard = leaderboard => {
  let leaderboardHTML = `<div class='leaderboard local'><div class='title'>${leaderboard.title}</div>`
  leaderboardHTML += leaderboard.entries.map(row).join("")
  leaderboardHTML += `</div>`

  document.querySelector('.leaderboard-container').innerHTML += leaderboardHTML
}

export const promptName = () => {
  return new Promise( (resolve, reject) => {
    const prompt = document.querySelector('.prompt')
    prompt.classList.remove('hide')
    prompt.innerHTML = promptHTML

    const input = prompt.querySelector('input')
    input.value = localStorage.getItem('name-pref')
    input.focus()

    prompt.querySelector('.cancel').onclick = () => resolve(null)
    prompt.querySelector('.submit').onclick = () => {
      if (input.value) {
        prompt.classList.add('hide')
        prompt.innerHTML = ""
        localStorage.setItem('name-pref', input.value)
        resolve(input.value)
      }
    }
  })
}