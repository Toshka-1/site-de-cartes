/**
 * Fonction pour analyser le coût de mana.
 * @param {string} str - Chaîne représentant le coût de mana (ex: "{G}{U}{B}")
 * @returns {Array} - Tableau des symboles de mana
 */
function parseMana(str) {
    return str.split(/\s*({[^}]+})\s*/g).filter(Boolean);
}

/**
 * Fonction asynchrone pour récupérer les symboles de mana et les associer à leurs images.
 * @returns {Object} - Dictionnaire associant chaque symbole à son URL d'image
 */
async function getSymbols() {
    const symbolsDict = {};
    const url = "https://api.scryfall.com/symbology";

    
        const response = await fetch(url);
        const data = await response.json();

        data.data.forEach(symbol => {
            symbolsDict[symbol.symbol] = symbol.svg_uri;
        });

        return symbolsDict;
    

}

/**
 * Fonction asynchrone pour récupérer et afficher les cartes de l'édition Lord of the Rings en français.
 */
async function afficherCartes() {
    const urlInitial = "https://api.scryfall.com/cards/search?q=e:ltr%20lang:fr&format=json&order=set&unique=prints";
    let url = urlInitial;
    let hasMore = true;
    const gridContainer = document.getElementById('grid-container'); // Sélectionne le conteneur où les cartes seront affichées

    // Récupérer les symboles de mana
    const symbols = await getSymbols();

    // Tableau pour stocker les noms des cartes (pour vérification)
    const nomsCartes = [];

    
        while (hasMore) {
            const reponse = await fetch(url);
            const donnees = await reponse.json();

            for (const carte of donnees.data) { 
                // Ajouter le nom de la carte au tableau (pour vérification)
                nomsCartes.push(carte.printed_name);

                // Créer une copie du template
                const template = document.getElementById('card-template').content.cloneNode(true);
                
                // Remplir les informations de la carte
                const img = template.querySelector('.card-img');
                img.src = carte.image_uris && carte.image_uris.normal ? carte.image_uris.normal : 'images/placeholder.jpg'; // Utiliser une image de remplacement si image_uris est undefined
                img.alt = carte.printed_name;

                const nomCarte = template.querySelector('.card-name');
                nomCarte.innerText = carte.printed_name;

                const manaCostDiv = template.querySelector('.mana-cost');
                const manaSymbols = parseMana(carte.mana_cost || '');

                manaSymbols.forEach(symbol => {
                    const manaImg = document.createElement('img');
                    manaImg.classList.add('mana');
                    manaImg.src = symbols[symbol] || 'images/placeholder-mana.png'; // Utiliser une image de remplacement si symbole non trouvé
                    manaImg.alt = symbol;
                    manaCostDiv.appendChild(manaImg);
                });

                // Ajouter la carte au conteneur
                gridContainer.appendChild(template);
            }

            hasMore = donnees.has_more;

            if (hasMore) {
                url = donnees.next_page; // Utiliser l'URL de la page suivante
            }
        }
}

// Appeler la fonction afficherCartes au chargement de la page
window.addEventListener('DOMContentLoaded', afficherCartes);

