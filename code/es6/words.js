//global functions to import DOM elements
const gID = (el) => document.getElementById(el);


//class for create every level words
class Level{
    constructor(numberLevel,positiveWords,negativeWords){
        this.numberLevel = numberLevel;
        this.positiveWords = positiveWords;
        this.negativeWords = negativeWords;
    }
}

//words for each level
const LEVELS = [
    new Level(
    0,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]
    ),
    new Level(
    1,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]
    ),
    new Level(
    2,
    ['pit','spot','spate','slap two','respite'],
    ['pt','Pot','peat','part']
    ),
new Level(
    3,
    ['rap them','tapeth','apth','wrap/try','sap tray','87ap9th','apothecary',] ,
    ['aleht','happy them','tarpth','Apt','peth','tarreth','ddapdg','apples','shape the']
    ),
new Level(
    4,
    ['affgfking','rafgkahe','bafghk','baffgkit','affgfking','rafgkahe','bafghk','baffg kit'],
    ['fgok','a fgk','affgm','afffhk','fgok','afg.K','aff gm','afffhgk',]
    ),
];

// level0 solution: ferr(et|y|ari)//corta   ferr.*(t|y|i)$//larga
// level1 solution: \b[^eE]+\b
// level2 solution: \w*p(\wte?|\s)(two)?
// level3 solution: \w*ap[^p].*(h|y|m)$
// level4 solution: (r|b)?aff?g.?k\w* 