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