/*
Include functions for saving and loading deck configurations
*/

/*
Deck class
*/
class Deck {
    constructor(name, cards) {
    this.name = name;
    this.cards = cards;
  }
}

/*
function saveDeckData(Deck myDeck)
    -takes in a Deck object, saves it to localStorage or alerts to error
*/
function saveDeckData(myDeck)
{

    let deckName = myDeck.name;
    //Attempt to store myDeck at deckName key
    try
    {
        var stringDeck = JSON.stringify(myDeck);
        localStorage.setItem(deckName, stringDeck);
    } 
    catch(err)
    {
        alert("Something went wrong and the deck did not save.\n" + err)
    }
}
    
/*
function compileDeckData()
    -this function should be attached to the "Save Deck" button on deckBuilder.html
    -it should compile all the cards and quantities from deckBuilder.html and return a Deck object for saving to JSON using saveDeckData()
*/
function compileDeckData()
{
    //To be saved as a Deck object->var myDeck = new Deck(deckName, cards);
    var deckName = document.getElementById("deckName").value;
    var cards = [];

    //Check for empty deck name, notify if so
    if(deckName != "")
    {
        //Ask for confirmation to save
        if(confirm("Are you sure you want to save this deck: " + deckName + "?"))
        {
            //Keep track of card total number of cards in deck
            var totalCards = 0;

            //Iterate through global var cardsList
            for(let i = 0; i < cardsList.length; i++)
            {
                let curCard = cardsList[i];
                let curCardID = curCard.id;
                let curCardName = curCard.name;
                //Check if the value of the number input with id curCardID has a value > 0
                let cardQuantity = parseInt(document.getElementById(curCardID).value);
                if(cardQuantity > 0)
                {
                    //Add it to the card list
                    cards.push([curCardID, cardQuantity]);
                    //console.log([curCardID, cardQuantity]);
                    //Update total cards
                    totalCards += cardQuantity;
                }
            } //All cards should be added to the cards array
            
            //Alert if totalCards != 60
            if(totalCards != 60)
            {
                alert("Your deck has " + totalCards + " cards instead of 60. Failed to save");
            }
            //The number of cards is 60, create the Deck object and save it to JSON
            else
            {
                //Create deck object with input parameters
                var myDeck = new Deck(deckName, cards);
                //call saveDeckData()
                saveDeckData(myDeck);
            }
        }
    }
    else
    {
        alert("No deck name provided");
    }

    
}

/*
function searchDecksAndPopulate(String deckName)
    -takes in deckName, calls loadDeck, and populates a list of cards in the table id="existing-deck"
*/
function searchDecksAndPopulate()
{
    //Find deck to search
    var deckName = document.getElementById("existing-deck").value;
    var myDeck = loadDeck(deckName);
    
    if(myDeck != undefined && myDeck != null)
    {
        //Get the table element to push to
        var table = document.getElementById("existing-deck-placeholder");
        table.innerHTML = "";

        //get the card array from the deck object
        let cards = myDeck.cards;
        for(let i = 0; i < cards.length; i++)
        {
            //Create new <tr> tag
            let tableRow = document.createElement('tr');

            //Set cardID
            let cardID = cards[i][0];
            //Convert ID to name
            let cardObj = cardsList.find( ({ id }) => id === cardID );
            let cardName = cardObj.name;
            //Set card quantity
            let cardQuantity = cards[i][1];

            //Concatenate table row text
            let rowText = cardName + ": " + cardID + ", qty " + cardQuantity;
            //Add text to tr and <tr> to <table>
            tableRow.appendChild(document.createTextNode(rowText));
            table.appendChild(tableRow);
            //console.log(cards[i]);
        }
    }
}

/*
function loadDeck(String deckName)
    -takes in a deckName as input and searches the localstorage for a deck with that name
    -return the deckObject if it exists, return undefined if no such file exists
*/
function loadDeck(deckName)
{
    try
    {
        var stringDeck = localStorage.getItem(deckName);
        var myDeck = JSON.parse(stringDeck);
        if(myDeck == undefined)
        {
            throw "Deck does not exist.";
        }

        return myDeck;
    }
    catch(err)
    {
        alert("An error occurred and the deck was not loaded.\n" + err);
        return undefined;
    }
}