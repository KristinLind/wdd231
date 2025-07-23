const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=40.5622&lon=-111.9297&units=imperial&appid=bffc1268a841c65ca4d168a3ad81c4e5`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw Error(await response.text());
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    console.error("Weather fetch error:", err);
  }
}

function displayWeather(data) {
  const iconImg = document.querySelector("#weather-icon");
  const currentTemp = document.querySelector("#current-temp");
  const weatherDesc = document.querySelector("#weather-desc");
  const forecastDiv = document.querySelector("#forecast-content");

  if (iconImg && currentTemp && weatherDesc && forecastDiv) {
    const temp = Math.round(data.list[0].main.temp);
    const description = data.list[0].weather[0].description;
    const icon = data.list[0].weather[0].icon;

    iconImg.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
    iconImg.setAttribute("alt", description);
    iconImg.setAttribute("width", "40");
    iconImg.setAttribute("height", "40");

    currentTemp.innerHTML = `${temp}°F`;
    weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);

    forecastDiv.innerHTML = "<h4>3-Day Forecast</h4>";

    let count = 0;
    for (const item of data.list) {
      if (item.dt_txt.includes("12:00:00") && count < 3) {
        const day = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(item.main.temp);
        forecastDiv.innerHTML += `<p>${day}: ${temp}°F</p>`;
        count++;
      }
    }
  }
}

async function fetchSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw Error(await response.text());
    const members = await response.json();
    displaySpotlights(members);
  } catch (err) {
    console.error("Spotlights fetch error:", err);
  }
}

function displaySpotlights(members) {
  const container = document.querySelector("#spotlights");
  if (!container) return;

  const goldSilver = members.filter(m => m.membership === "gold" || m.membership === "silver");
  const shuffled = goldSilver.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  container.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="80" height="80">
      <h4>${member.name}</h4>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership: ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
    `;
    container.appendChild(card);
  });
}
if (document.querySelector("#weather-icon")) {
  fetchWeather();
}
if (document.querySelector("#spotlights")) {
  fetchSpotlights();
}
const refreshBtn = document.querySelector('#refresh-weather');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    console.log("Refreshing weather...");
    fetchWeather();
  });
}


