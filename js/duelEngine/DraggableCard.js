class DraggableCard
{
    constructor(cardImg)
    {
        //Set image link
        this.cardImg = cardImg
        //Create image object for this object
        this.img = new Image(75,105);
        this.img.src = this.cardImg;
    }
}