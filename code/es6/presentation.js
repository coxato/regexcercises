
class TypeWriter{
    constructor(txtElement, words ,wait = 3000){
        this.txtElement = txtElement;
        this.words = words;
        this.wait = parseInt(wait,10);
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    type(){
     // current index of word
    let current = this.wordIndex % this.words.length;
    // get the full text of the array of words [this.words]
    const fullTxt = this.words[current];

    //check if deleting
    if(this.isDeleting){
        // remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }else{
        // add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // insert the text in htmlElement
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Type speed
    let typeSpeed = 300;
    if(this.isDeleting) typeSpeed /= 2;

    //check if the word is complete.
    if(!this.isDeleting && this.txt === fullTxt){
        //make pause at end typing
        typeSpeed = this.wait;
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex++; // move to the next word
        //pause before typing a new word
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)   
    }
}

// event listener for the DOM when is loaded
document.addEventListener('DOMContentLoaded',init);

// run the app 
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // init a TypeWriter instance
    new TypeWriter(txtElement, words, wait); 
}