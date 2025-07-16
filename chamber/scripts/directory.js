const directoryContainer = document.querySelector("#directory");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

function setActive(activeBtn, inactiveBtn) {
    activeBtn.classList.add("active");
    inactiveBtn.classList.remove("active");
}

function renderMembers(members, view) {
    
    directoryContainer.innerHTML = ""; // clear content

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="150" height="150">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership">${member.membership.toUpperCase()} Member</p>
        `;

        directoryContainer.appendChild(card);
    });

    directoryContainer.className = `directory ${view}`;
}

async function getMembers(view = "grid") {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        renderMembers(members, view);
    } catch (err) {
        console.error("Failed to fetch members.json:", err);
    }
}

gridBtn.addEventListener("click", () => {
    setActive(gridBtn, listBtn);
    getMembers("grid");
});

listBtn.addEventListener("click", () => {
    setActive(listBtn, gridBtn);
    getMembers("list");
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

getMembers("grid");
setActive(gridBtn, listBtn);
const someElement = document.querySelector('#element-you-use');
if (someElement) {
  someElement.addEventListener('click', () => {
    // …
  });
}
