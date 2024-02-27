//https://opentdb.com/api.php?amount=10

//NOTE: jacob needs to add elements to connect question and answer options to front end elements

let rightAnswer = "";
let correctScore = 0;
let questionsDOne = 0;
let totalQuestions = 25;


async function getCategoryMusic(){
    //music
    const categoryURLMusic = 'https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=boolean';
    const categoryMusic = await fetch(`${categoryURLMusic}`);
    const dataCategoryMusic = await categoryMusic.json();
    console.log(dataCategoryMusic);
    
}

async function getCategoryAnimals(){
     //animals
    
     const categoryURLAnimals = 'https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=boolean';
     const categoryAnimals = await fetch(`${categoryURLAnimals}`);
     const dataCategoryAnimals = await categoryAnimals.json();
     console.log(dataCategoryAnimals);
}

async function getCategorySports(){
    //sports
    //https://opentdb.com/api.php?amount=5&category=21
    const categoryURLSports = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=boolean';
    const categorySports = await fetch(`${categoryURLSports}`);
    const dataCategorySports = await categorySports.json();
    console.log(dataCategorySports);

}

async function getCategoryHistory(){
    //history
    //https://opentdb.com/api.php?amount=5&category=23 
    const categoryURLHistory = 'https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=boolean';
    const categoryHistory = await fetch(`${categoryURLHistory}`);
    const dataCategoryHistory = await categoryHistory.json();
    console.log(dataCategoryHistory);

}

async function getCategoryMovies(){
    //movies
    //https://opentdb.com/api.php?amount=5&category=11
    const categoryURLMovies = 'https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=boolean';
    const categoryMovies = await fetch(`${categoryURLMovies}`);
    const dataCategoryMovies = await categoryMovies.json();
    console.log(dataCategoryMovies);

}



getCategoryMusic();
setTimeout(getCategoryAnimals, 5000);
setTimeout(getCategorySports, 10000);
setTimeout(getCategoryHistory, 15000);
setTimeout(getCategoryMovies, 20000);



