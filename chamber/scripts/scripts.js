fetch('./data/discover.json')
  .then(res => res.json())
  .then(data => {
    const container = document.createElement('div');
    container.classList.add('discover-card-grid');
    document.querySelector('main').appendChild(container);

    data.discover.forEach((item, index) => {
      const card = document.createElement('section');
      card.classList.add('discover-card', 'delay1');

      card.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}" class="card-img" ${index === 0 ? '' : 'loading="lazy"'}>
        <div class="discover-card-content">
          <p class="description">${item.description}</p>
          <p class="cost"><strong>Cost:</strong> ${item.cost}</p>
          <p class="location"><strong>Address:</strong> ${item.address}</p>
          <a href="${item.website}" target="_blank" class="learn-more">Learn More about ${item.name}</a>
        </div>
      `;

      container.appendChild(card);
    });
})
.catch(err => console.error('Error loading discover data:', err));



  
  
  
  
  
  
  