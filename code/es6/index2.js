/*  hello, in the comments the english grammar it might not be perfect, because
*   I'm not a english native speaker, and I'm learning english, whatever,
*   here are some small rules that I have made.
*
*   in the comments, all the important variables are enclosed
*   within square brackets [].
*
*   and in comments external files are mentioned with single quotes ''.
*   
*   I have others 2 important javascript files:
*   
*   1) 'words.js' have a class 'Level' that make a new level with
*   positives and negatives words
*
*   2) 'presentation.js' that make a TypeWriter effect to the 
*   principal 'index.html' page
*/

// contains the htmlElements that will be filled with the words to be evaluated 
let htmlWordsContainers = {
    positives : gID('positives'),
    negatives : gID('negatives')
}
let actualLevel = 0;   // very IMPORTANT!! variable for the app; 

// variable [LEVELS] by 'words.js'
//fill the container words with the corresponding words
const fillIn = (arrayWord,htmlContainer) => {
    gID('numberLevel').textContent = `level ${actualLevel + 1}`// show the [actualLevel] plus one
    // change the description about the actual level.
    if(actualLevel == 1){
        gID('description1').classList.remove('active')
        gID('description2').classList.add('active')
    }else{
        gID('description1').classList.add('active')
        gID('description2').classList.remove('active')
    }

    let container = htmlWordsContainers[htmlContainer];
    container.innerHTML = '';

    let spans = [];

    for(let i of LEVELS[actualLevel][arrayWord] ){
        let aux = ''; // save the separate letters in the span's
        for(let j = 0; j < i.length; j++){
            aux += `<span>${i[j]}</span>`
        }
        spans.push(aux);
    }

    for(let word of spans){
        container.innerHTML += `
        <p class="pWord">${word}</p>
        `
    }
    
}
fillIn('positiveWords','positives')
fillIn('negativeWords','negatives')

//  event Listener for input element
gID('re').addEventListener('keyup', run);

function run(ev){
    if(ev.key === 'Enter'){
        look(this.value)
    }
}

// look the user entry and compare his regular expression to match patterns
// in the words of [LEVELS]
function look(regExp = gID('re').value){
    regExp = new RegExp(regExp);
    clean();

    const positiveWords = LEVELS[actualLevel].positiveWords;
    const negativeWords = LEVELS[actualLevel].negativeWords;
    let count1 = 0, count2 = 0;

    // look positives words match
    for(let word of positiveWords){
        let matched = word.match(regExp); 
        if(matched){
            paint(matched.index, matched[0].length, count1, 'positives')
        }
        count1++;
    }
    //look negatives words match
    for(let word of negativeWords){
        let matched = word.match(regExp); 
        if(matched){
            paint(matched.index, matched[0].length, count2, 'negatives')
        }
        count2++;
    }
    
}

//to paint a letter when is matched
function paint(indexMatch, matchLenght, htmlIndex,htmlContainer){
    let pContainer = [...htmlWordsContainers[htmlContainer].querySelectorAll('p')];// paragraph container
    let spanLetters = [...pContainer[htmlIndex].querySelectorAll('span')];

    for(let i = 0; i < matchLenght; i++ ){
        spanLetters[indexMatch].style.color = 'red';
        indexMatch++;
    }
}

//to clean all the words matched color
function clean(){
    [...gID('positives').querySelectorAll('span')].forEach(
        el => el.style.color = '#000000'
        );

    [...gID('negatives').querySelectorAll('span')].forEach(
        el => el.style.color = '#000000'
        );
}

//functions to change the level
function next(){
    let length = LEVELS.length - 1;
    actualLevel >= length ? actualLevel = 0 : actualLevel++;
    fillIn('positiveWords','positives')
    fillIn('negativeWords','negatives')
}

function previous(){
    let length = LEVELS.length - 1;
    actualLevel <= 0 ? actualLevel = length : actualLevel--;
    fillIn('positiveWords','positives')
    fillIn('negativeWords','negatives')
}

// functions to show modals windows by onclick in 'index2.html'
const modals = [gID('modalContainer1'),gID('modalContainer2')];

function addCssClass(index){
    if(index == 1) solutions();// show the solution window modal
    modals[0].classList.remove('activeModal');
    modals[1].classList.remove('activeModal');
    modals[index].classList.add('activeModal');
}
// quit the cssClass and hide the modal
function quit(){
    modals.forEach( el => el.classList.remove('activeModal'));
}


// ==================    show the solution depend the level    ================
function solutions(){
    // levels solutions in order
    const solves = [
        ['ferr(et|y|ari)' , 'ferr.*(t|y|i)$'],      // level 1
        ['\\b[^eE]+\\b'],                           // level 2
        ['\\w*p(\\wte?|\\s)(two)?','.*p.t(wo|e)?'], // level 3
        ['\\w*ap[^p].*(h|y|m)$'],                   // level 4
        ['(r|b)?aff?g.?k\\w*'],                     // level 5
    ];

    let solutionContainer = gID('solutions');
    solutionContainer.innerHTML = ''; // clean
    // solution with the global [actualLevel] variable
    solves[actualLevel].forEach( solution => {
        solutionContainer.innerHTML += `
        <p class="solutionExample" >${solution}</p>
        `
    });  

}
