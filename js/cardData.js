/*
Include functions for loading the data of pokemon cards from the JSON files
*/
//Trying out having cardsList be a global variable in a pro coder move
let cardsList = [];

//Trigger the loading of cards into the menu
window.onload = function() {
    populateCardsList();
}

/*
function loadCardData()
    returns an array of card objects that includes all the card data
*/
async function loadCardData() {
    var setList = ["cardData/base.json", "cardData/fossil.json", "cardData/jungle.json"];

    //Array for holding all card data
    var data = [];

    //Iterate through set list
    for(let i = 0; i < setList.length; i++)
    {
        //Open the json file
        var fileName = setList[i];
        //Fetch json text and wait for JSON response to load
        var response = await fetch(fileName);
        const json = await response.json();
        //console.log(json);

        //Parse JSON data into JS objects
        var jsonData = json;//JSON.parse(json);

        //Save each set list json data to data array
        data[i] = jsonData;
    }

    console.log("Done loading JSON files");

    //Convert data from 2D array [set][card] to all cards in a single 1D array
    //var cardsList = [];
    //Cycle through set objects
    for(let i = 0; i < data.length; i++)
    {
        //Cycle through card objects in each set
        for(let j = 0; j < data[i].length; j++)
        {
            cardsList.push(data[i][j]);
        }
    }

    console.log("Done making card list");
    
    return cardsList;
} //End loadCardData()

/*
function loadCardDataLite()
    -returns an array of arrays in the form of [cardName, cardID]
    -allows faster loading of card list when all the card data is not needed
*/

/*
function loadCard(String cardID)
    -takes in a card ID string and returns the card object that corresponds
*/



/*
function populateCardsList()
    -pushes all the card data into the table id="deck-build-menu"
    -calls loadCardData()
*/
async function populateCardsList(){
    var cardList = await loadCardData();
    
    console.log("Card data obtained");
    
    //Get the <ol> tag to display all cards
    var listOfCards = document.getElementById("deck-build-menu");
    //Make a <li> tag for each card
    for(let i = 0; i < cardList.length; i++)
    {
        //Local variable for current card
        var curCard = cardList[i];

        //Create new <tr> tag object and number input
        var tableRow = document.createElement('tr');
        var rowNumInput = document.createElement("INPUT");
        rowNumInput.setAttribute("type", "number");
        //IMPORTANT: this ID is used to record the unique ID of the cards wanted in the deck
        rowNumInput.setAttribute("id", curCard.id);
        rowNumInput.setAttribute("class", "deckNumInput");
        rowNumInput.setAttribute("value", 0);
        rowNumInput.setAttribute("min", 0);
        if(curCard.supertype != "Energy")
        {
            rowNumInput.setAttribute("max", 4);
        } 
        else
        {
            rowNumInput.setAttribute("max", 60);
        } 
        

        
        //Adjust output text for tag
        //Don't put a level for trainer or energy cards
        if(curCard.level == undefined)
        {
            var levelText = "";
        }
        else
        {
            var levelText = " lvl " + curCard.level;
        }
        //Translate to correct set name
        if(curCard.id.includes("base1")){ var setName = "Base "; }
        else if(curCard.id.includes("base2")){ var setName = "Jungle "; }
        else if(curCard.id.includes("base3")){ var setName = "Fossil "; }
        else { var setName = "Set Not Found"; }
        
        //Set value of tag 
        tableRow.appendChild(document.createTextNode(curCard.name + levelText + ": " + setName));
        //Add in the number input
        tableRow.appendChild(rowNumInput);
        //Add it to the list:
        listOfCards.appendChild(tableRow);
    }
} //End populateCardsList()