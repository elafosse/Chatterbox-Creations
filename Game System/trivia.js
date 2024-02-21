
let correctScore = 0;
let questionsDOne = 0;
let totalQuestions = 25;
let category = "";
let amount = 0;
let musicQuestions = "";

async function getCategoryMusic(){
    //music
    const categoryURLMusic = 'https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=boolean';
    const results = await fetch(`${categoryURLMusic}`);
    const dataCategoryMusic = await results.json();
    //console.log(dataCategoryMusic);

    return dataCategoryMusic;   
    
}


async function getCategoryAnimals(){
     //animals
    
     const categoryURLAnimals = 'https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=boolean';
     const results = await fetch(`${categoryURLAnimals}`);
     const dataCategoryAnimals = await results.json();
     //console.log(dataCategoryAnimals);
     return dataCategoryAnimals;
}

async function getCategorySports(){
    //sports
    const categoryURLSports = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=boolean';
    const results = await fetch(`${categoryURLSports}`);
    const dataCategorySports = await results.json();
    //console.log(dataCategorySports);
    return dataCategorySports;

}

async function getCategoryHistory(){
    //history
    const categoryURLHistory = 'https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=boolean';
    const results = await fetch(`${categoryURLHistory}`);
    const dataCategoryHistory = await results.json();
    //console.log(dataCategoryHistory);
    return dataCategoryHistory;

}

async function getCategoryMovies(){
    //movies
    const categoryURLMovies = 'https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=boolean';
    const results = await fetch(`${categoryURLMovies}`);
    const dataCategoryMovies = await results.json();
    //console.log(dataCategoryMovies);
    return dataCategoryMovies;

}



//have a function once user selects category and difficulty then display question
//TODO: instead of having console.log(), display the question to the front-end 
function question(category, amount){
    switch(category){
        case "Entertainment: Music":
            getCategoryMusic().then((value)=>{console.log(value.results[0].question)});
            break;
        case "Animals":
            getCategoryAnimals().then((value)=>{console.log(value.results[0].question)});
            break;
        case "Sports":
            getCategorySports().then((value)=>{console.log(value.results[0].question)});
            break;
        case "History":
            getCategoryHistory().then((value)=>{console.log(value.results[0].question)});
            break;
        case "Movies":
            getCategoryMovies().then((value)=>{console.log(value.results[0].question)});  
            break;    

    }
}

//console.log(question("Entertainment: Music", 100));
//console.log(question("Animals", 200));
//console.log(question("Sports", 300));
//console.log(question("History", 400));
//console.log(question("Movies", 500));


    



