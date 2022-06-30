/*
Functions concerned with gathering deck data and setting up the play field.
*/

/*
function initiateDuelMat()
    -creates the spaces for deck, discard, active/benched pokemon, and coin flip
*/
function initiateDuelMat()
{
    //Create placeholder image for dragging and dropping
    var c = document.getElementById("duelCanvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = "https://images.pokemontcg.io/base1/1.png";
    ctx.drawImage(img, 10, 10, 75, 105);
}


/*
function startDuel()
    -Reads the two decks selected and calls loadDeck() for both
    -Loads all necessary card image links

*/