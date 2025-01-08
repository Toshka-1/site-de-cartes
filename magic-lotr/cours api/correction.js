function ecricrecarte() {
    fetch("https://api.scryfall.com/cards/search?q=e:ltr%20lang:fr&format=json&order=set&unique=prints")
    .then(reponse => reponse.json())
    .then(donnees => {
        for (carte of donnees.data) { 
            myP = document.createElement("p")
            myP.innerText = carte.printed_name
            document.body.appendChild(myP)
        }

    })
}

async function ecricrecarte2() {

    reponse = await fetch("https://api.scryfall.com/cards/search?q=e:ltr%20lang:fr&format=json&order=set&unique=prints")
    donnees = await reponse.json()
    
    for (carte of donnees.data) { 
        myP = document.createElement("p")
        myP.innerText = carte.printed_name
        document.body.appendChild(myP)
    }
        
    encoreDesPages = donnees.has_more
    while(encoreDesPages) {
        reponse = await fetch("https://api.scryfall.com/cards/search?q=e:ltr%20lang:fr&format=json&order=set&unique=prints")
        donnees = await reponse.json()
        for (carte of donnees.data) { 
            myP = document.createElement("p")
            myP.innerText = carte.printed_name
            document.body.appendChild(myP)
        }
        encoreDesPages = donnees.has_more


    }
}

async function updateData() {
    const bodyObj = {
      id: 123,
      name: 'Jane Smith'
    };
  
    try {
      const response = await fetch('https://api.example.com/endpoint/123', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });
  
      if (!response.ok) {
        throw new Error('Problème lors de la requête PUT : ' + response.statusText);
      }
  
      const data = await response.json();
      console.log('Données mises à jour :', data);
    } catch (error) {
      console.error(error);
    }
  }

  // Méthode GET avec async/await
async function getDataAsync() {
    try {
      const response = await fetch('https://api.example.com/endpoint');
      if (!response.ok) {
        throw new Error('Problème lors du fetch : ' + response.statusText);
      }
      const data = await response.json();
      console.log('Données reçues (async/await) :', data);
      // Traiter les données...
    } catch (error) {
      console.error('Erreur lors de la requête GET async/await :', error);
    }
  }

