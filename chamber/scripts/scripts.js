fetch('./data/discover.json')
  .then(res => res.json())
  .then(data => {
    const container = document.createElement('div');
    container.classList.add('card-grid');
    document.querySelector('main').appendChild(container);

    data.discover.forEach(item => {
      const card = document.createElement('section');
      card.classList.add('card');

      card.innerHTML = `
        <h2>${item.name || item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name || item.title}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <p><strong>Cost:</strong> ${item.cost}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
})
.catch(err => console.error('Error loading discover data:', err));


  
  
  
  
  
  
  