const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let category = "";
let value = "";
let question = "";
let answer = "";
let dataArray = [];
let amount ="";
let Category = "";

const music100Array = [];
const music200Array = [];
const music300Array = [];
const music400Array = [];
const music500Array = [];

const animals100Array = [];
const animals200Array = [];
const animals300Array = [];
const animals400Array = [];
const animals500Array = [];

const sports100Array = [];
const sports200Array = [];
const sports300Array = [];
const sports400Array = [];
const sports500Array = [];

const history100Array = [];
const history200Array = [];
const history300Array = [];
const history400Array = [];
const history500Array = [];

const movies100Array = [];
const movies200Array = [];
const movies300Array = [];
const movies400Array = [];
const movies500Array = [];



function getData(file,type){
    let results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            resolve(results);
 
        });
   
  });
 
}
async function getDataTest(Category, amount){
    const data = await getData("Jeopardy 2.0Edit.csv", {});
    //console.log("getDataTest:", data);
    for(let i = 0; i < data.length; i++){
        category = data[i].Category;
        value = data[i].Value;
        question = data[i].Question;
        answer = data[i].Answer;
        if(Category == category) {
            switch(category){
                case "MUSIC":
                    if(value == "$100.00" && amount == "$100.00"){
                        music100Array.push(data[i]);
                        break;
                    }
                    else if(value == "$200.00" && amount == "$200.00"){
                        music200Array.push(data[i]);
                        break;
                    }
                    else if(value == "$300.00" && amount == "$300.00"){
                        music300Array.push(data[i]);
                        break;
                    }
                    else if(value == "$400.00" && amount == "$400.00"){
                        music400Array.push(data[i]);
                        break;
                    }
                    else if(value == "$500.00" && amount == "$500.00"){
                        music500Array.push(data[i]);
                        break;
                    }   
                case "ANIMALS":
                    if(value == "$100.00" && amount == "$100.00"){
                        animals100Array.push(data[i]);
                        break;
                    }
                    else if(value == "$200.00" && amount == "$200.00"){
                        animals200Array.push(data[i]);
                        break;
                    }
                    else if(value == "$300.00" && amount == "$300.00"){
                        animals300Array.push(data[i]);
                        break;
                    }
                    else if(value == "$400.00" && amount == "$400.00"){
                        animals400Array.push(data[i]);
                        break;
                    }
                    else if(value == "$500.00" && amount == "$500.00"){
                        animals500Array.push(data[i]);
                        break;
                    }   
                case "SPORTS":
                    if(value == "$100.00" && amount == "$100.00"){
                        sports100Array.push(data[i]);
                        break;
                    }
                    else if(value == "$200.00" && amount == "$200.00"){
                        sports200Array.push(data[i]);
                        break;
                    }
                    else if(value == "$300.00" && amount == "$300.00"){
                        sports300Array.push(data[i]);
                        break;
                    }
                    else if(value == "$400.00" && amount == "$400.00"){
                        sports400Array.push(data[i]);
                        break;
                    }
                    else if(value == "$500.00" && amount == "$500.00"){
                        sports500Array.push(data[i]);
                        break;
                    }   
                    
                case "HISTORY":
                    if(value == "$100.00" && amount == "$100.00"){
                        history100Array.push(data[i]);
                        break;
                    }
                    else if(value == "$200.00" && amount == "$200.00"){
                        history200Array.push(data[i]);
                        break;
                    }
                    else if(value == "$300.00" && amount == "$300.00"){
                        history300Array.push(data[i]);
                        break;
                    }
                    else if(value == "$400.00" && amount == "$400.00"){
                        history400Array.push(data[i]);
                        break;
                    }
                    else if(value == "$500.00" && amount == "$500.00"){
                        history500Array.push(data[i]);
                        break;
                    }  
                case "MOVIES":
                    if(value == "$100.00" && amount == "$100.00"){
                        movies100Array.push(data[i]);
                        break;
                    }
                    else if(value == "$200.00" && amount == "$200.00" ){
                        movies200Array.push(data[i]);
                        break;
                    }
                    else if(value == "$300.00" && amount == "$300.00"){
                        movies300Array.push(data[i]);
                        break;
                    }
                    else if(value == "$400.00" && amount == "$400.00"){
                        movies400Array.push(data[i]);
                        break;
                    }
                    else if(value == "$500.00" && amount == "$500.00"){
                        movies500Array.push(data[i]);
                        break;
                    } 
    
            }
        }

    }

    map = new Map();
    map.set("MUSIC", new Map([["$100.00", music100Array],["$200.00", music200Array],["$300.00", music300Array],["$400.00", music400Array],["$500.00", music500Array]]));
    map.set("ANIMALS", new Map([["$100.00", animals100Array],["$200.00", animals200Array],["$300.00", animals300Array],["$400.00", animals400Array],["$500.00", animals500Array]]));
    map.set("SPORTS", new Map([["$100.00", sports100Array],["$200.00", sports200Array],["$300.00", sports300Array],["$400.00", sports400Array],["$500.00", sports500Array]]));
    map.set("HISTORY", new Map([["$100.00", history100Array],["$200.00", history200Array],["$300.00", history300Array],["$400.00", history400Array],["$500.00", history500Array]]));
    map.set("MOVIES", new Map([["$100.00", movies100Array],["$200.00", movies200Array],["$300.00", movies300Array],["$400.00", movies400Array],["$500.00", movies500Array]]));


    let arr = Array.from(map.get(Category).get(amount));
  
    return arr[Math.floor(Math.random() * arr.length)];


}

module.exports = {getDataTest};