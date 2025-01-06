async function fetchCartes() {
    try {
      console.log('Début de la récupération des cartes...');
      
      const response = await fetch('https://api.pokemontcg.io/v2/cards?set.name=Evolutions&pageSize=50', {
        headers: {
          'X-Api-Key': '148ceffe-de41-44f6-a1df-8be5b087d5ff' // Remplacez par votre clé
        }
      });
  
      console.log('Réponse reçue:', response);
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Données JSON:', data);
  
      const cards = data.data;
      console.log(`Nombre de cartes reçues: ${cards.length}`);
  
      const container = document.querySelector('#grid-container');
      if (!container) {
        throw new Error('Conteneur #grid-container non trouvé dans le DOM');
      }
  
      cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('carte');
  
        // Structure HTML d'une carte
        cardElement.innerHTML = `
          <img src="${card.images.small}" alt="${card.name}" class="image-carte">
          <h2 class="carte_nom">${card.name}</h2>
          <p class="type">Type : ${card.types ? card.types.join(', ') : 'Inconnu'}</p>
        `;
  
        container.appendChild(cardElement);
      });
  
      console.log('Toutes les cartes ont été ajoutées au conteneur.');
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  }
  
  // Lancer la récupération des cartes au chargement de la page
  document.addEventListener('DOMContentLoaded', fetchCartes);
  