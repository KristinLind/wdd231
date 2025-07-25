import {temples} from '../data/temples.js'
//console.log(temples)

import { url } from '../data/temples.js'
//console.log(temples)

const showHere = document.querySelector("#showHere")
const mydialog = document.querySelector("#mydialog")
const mytitle = document.querySelector("#mydialog h2")
const myclose = document.querySelector("#mydialog button")
const myinfo = document.querySelector("#mydialog p")
myclose.addEventListener("click", () => mydialog.close())

function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src = `${url}${x.path}`
        photo.alt = x.name
        photo.addEventListener('click', () => showStuff(x));
            showHere.appendChild(photo)
    })
}
displayItems(temples)
function showStuff(temple) {
    mytitle.textContent = temple.name;
    myinfo.innerHTML = `
      <strong>Dedicated:</strong> ${temple.dedicated}<br>
      <strong>President:</strong> ${temple.person}<br>
      <strong>Image Path:</strong> ${temple.path}
    `;
    mydialog.showModal();
}
  