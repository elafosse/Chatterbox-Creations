
let correctScore = 0;
let questionsDOne = 0;
let totalQuestions = 25;
let category = "";
let amount = 0;
let musicQuestions = "";

async function getCategoryMusic100200(){
    //music
    const categoryURLMusic = 'https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple';
    const results = await fetch(`${categoryURLMusic}`);
    const dataCategoryMusic = await results.json();
    //console.log(dataCategoryMusic);

    return dataCategoryMusic;   
    
}

async function getCategoryMusic300400(){
    //music
    const categoryURLMusic = 'https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple';
    const results = await fetch(`${categoryURLMusic}`);
    const dataCategoryMusic = await results.json();
    //console.log(dataCategoryMusic);

    return dataCategoryMusic;   
    
}
async function getCategoryMusic500(){
    //music
    const categoryURLMusic = 'https://opentdb.com/api.php?amount=5&category=12&difficulty=hard&type=multiple';
    const results = await fetch(`${categoryURLMusic}`);
    const dataCategoryMusic = await results.json();
    //console.log(dataCategoryMusic);

    return dataCategoryMusic;   
    
}


async function getCategoryAnimals100200(){
     //animals
    
     const categoryURLAnimals = 'https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple';
     const results = await fetch(`${categoryURLAnimals}`);
     const dataCategoryAnimals = await results.json();
     //console.log(dataCategoryAnimals);
     return dataCategoryAnimals;
}
async function getCategoryAnimals300400(){
    //animals
   
    const categoryURLAnimals = 'https://opentdb.com/api.php?amount=5&category=27&difficulty=medium&type=multiple';
    const results = await fetch(`${categoryURLAnimals}`);
    const dataCategoryAnimals = await results.json();
    //console.log(dataCategoryAnimals);
    return dataCategoryAnimals;
}
async function getCategoryAnimals500(){
    //animals
   
    const categoryURLAnimals = 'https://opentdb.com/api.php?amount=5&category=27&difficulty=hard&type=multiple';
    const results = await fetch(`${categoryURLAnimals}`);
    const dataCategoryAnimals = await results.json();
    //console.log(dataCategoryAnimals);
    return dataCategoryAnimals;
}

async function getCategorySports100200(){
    //sports
    const categoryURLSports = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple';
    const results = await fetch(`${categoryURLSports}`);
    const dataCategorySports = await results.json();
    //console.log(dataCategorySports);
    return dataCategorySports;

}
async function getCategorySports100200(){
    //sports
    const categoryURLSports = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple';
    const results = await fetch(`${categoryURLSports}`);
    const dataCategorySports = await results.json();
    //console.log(dataCategorySports);
    return dataCategorySports;

}
async function getCategorySports300400(){
    //sports
    const categoryURLSports = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple';
    const results = await fetch(`${categoryURLSports}`);
    const dataCategorySports = await results.json();
    //console.log(dataCategorySports);
    return dataCategorySports;

}
async function getCategorySports500(){
    //sports
    const categoryURLSports = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=hard&type=multiple';
    const results = await fetch(`${categoryURLSports}`);
    const dataCategorySports = await results.json();
    //console.log(dataCategorySports);
    return dataCategorySports;

}

async function getCategoryHistory100200(){
    //history
    const categoryURLHistory = 'https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple';
    const results = await fetch(`${categoryURLHistory}`);
    const dataCategoryHistory = await results.json();
    //console.log(dataCategoryHistory);
    return dataCategoryHistory;

}
async function getCategoryHistory300400(){
    //history
    const categoryURLHistory = 'https://opentdb.com/api.php?amount=5&category=23&difficulty=medium&type=multiple';
    const results = await fetch(`${categoryURLHistory}`);
    const dataCategoryHistory = await results.json();
    //console.log(dataCategoryHistory);
    return dataCategoryHistory;

}
async function getCategoryHistory500(){
    //history
    const categoryURLHistory = 'https://opentdb.com/api.php?amount=5&category=23&difficulty=hard&type=multiple';
    const results = await fetch(`${categoryURLHistory}`);
    const dataCategoryHistory = await results.json();
    //console.log(dataCategoryHistory);
    return dataCategoryHistory;

}

async function getCategoryMovies100200(){
    //movies
    const categoryURLMovies = 'https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple';
    const results = await fetch(`${categoryURLMovies}`);
    const dataCategoryMovies = await results.json();
    //console.log(dataCategoryMovies);
    return dataCategoryMovies;

}
async function getCategoryMovies300400(){
    //movies
    const categoryURLMovies = 'https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple';
    const results = await fetch(`${categoryURLMovies}`);
    const dataCategoryMovies = await results.json();
    //console.log(dataCategoryMovies);
    return dataCategoryMovies;

}
async function getCategoryMovies500(){
    //movies
    const categoryURLMovies = 'https://opentdb.com/api.php?amount=5&category=11&difficulty=hard&type=multiple';
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
            if (amount == 100 || amount == 200){
              getCategoryMusic100200().then((value)=>{console.log(value.results[0])});
                break;  
            }
            
            else if (amount == 300 || amount == 400){
                getCategoryMusic300400().then((value)=>{console.log(value.results[0])});
                break;
            }
            else{
                getCategoryMusic500().then((value)=>{console.log(value.results[0])});
                break;
            }
        case "Animals":
            if (amount == 100 || amount == 200){
                getCategoryAnimals100200().then((value)=>{console.log(value.results[0])});
                  break;  
              }
              else if (amount == 300 || amount == 400){
                  getCategoryAnimals300400().then((value)=>{console.log(value.results[0])});
                  break;
              }

              else{
                  getCategoryAnimals500().then((value)=>{console.log(value.results[0])});
                  break;
              }
            
        case "Sports":
            if (amount == 100 || amount == 200){
                getCategorySports100200().then((value)=>{console.log(value.results[0])});
                  break;  
              }
              else if (amount == 300 || amount == 400){
                  getCategorySports300400().then((value)=>{console.log(value.results[0])});
                  break;
              }
              else{
                  getCategorySports500().then((value)=>{console.log(value.results[0])});
                  break;
              }
            
        case "History":
            if (amount == 100|| amount == 200){
                getCategoryHistory100200().then((value)=>{console.log(value.results[0])});
                  break;  
              }
              else if (amount == 300 || amount == 400){
                  getCategoryHistory300400().then((value)=>{console.log(value.results[0])});
                  break;
              }
              else{
                  getCategoryHistory500().then((value)=>{console.log(value.results[0])});
                  break;
              }
        case "Movies":
            if (amount == 100 || amount == 200){
                getCategoryMovies100200().then((value)=>{console.log(value.results[0])});
                  break;  
              }
              else if (amount == 300 || amount == 400){
                  getCategoryMovies300400().then((value)=>{console.log(value.results[0])});
                  break;
              }
              else{
                  getCategoryMovies500().then((value)=>{console.log(value.results[0])});
                  break;
              }   

    }
}

//console.log(question("Entertainment: Music", 100));
//console.log(question("Entertainment: Music", 200));
//console.log(question("Entertainment: Music", 300));
//console.log(question("Entertainment: Music", 400));
//console.log(question("Entertainment: Music", 500));

//console.log(question("Animals", 100));
//console.log(question("Animals", 200));
//console.log(question("Animals", 300));
//console.log(question("Animals", 400));
//console.log(question("Animals", 500));

//console.log(question("Sports", 100));
//console.log(question("Sports", 200));
//console.log(question("Sports", 300));
//console.log(question("Sports", 400));
//console.log(question("Sports", 500));

//console.log(question("History", 100));
//console.log(question("History", 200));
//console.log(question("History", 300));
//console.log(question("History", 400));
//console.log(question("History", 500));

//console.log(question("Movies", 100));
//console.log(question("Movies", 200));
//console.log(question("Movies", 300));
//console.log(question("Movies", 400));
//console.log(question("Movies", 500));






    



