var APP_ID = `924ace86`
var API_KEY = `d80c8e4bd2bf180d1864931cc2ee86da`

//obtain elements from the html page
var units = document.querySelector("select[name='unit-type']")
var quantity = document.querySelector("#food-quantity")
var ingredient = document.querySelector("#food-ingredient")



var calculatebtn = document.querySelector("#calculate")

function getData(meal) {
    var apiURL = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}&nutrition-type=logging&ingr=${meal}`
    console.log(meal)

    fetch(apiURL).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                populateData(data);
                fillCard(meal)
            })
        } else {
            console.log("error");
        }
    })
}


//get data from the customers's form input
async function formInput(selectedUnit, quantityValue, ingredientValue){
var selectedUnit = units.value;
var quantityValue = quantity.value;
var ingredientValue = ingredient.value;
var meal = quantityValue + " " + selectedUnit + " of " + ingredientValue
getData(meal)
}

//populate the page with the nutrition info
function populateData(data){
    var calories = data.calories
    var grams = data.totalWeight
    var fats = Math.round(data.totalNutrients.FAT.quantity);
    var cholesterol = Math.round(data.totalNutrients.CHOLE.quantity);
    var protein = Math.round(data.totalNutrients.PROCNT.quantity);
    var carbs = Math.round(data.totalNutrients.CHOCDF.quantity);
    var salt = Math.round(data.totalNutrients.NA.quantity);
    var calcium  = Math.round(data.totalNutrients.CA.quantity);
    
    var totalCalories = document.querySelector(".calories-consumed");
    totalCalories.innerText = calories + " " + data.totalNutrientsKCal.ENERC_KCAL.unit;

    var totalCarbs = document.querySelector(".carbs");
    totalCarbs.innerText = carbs + " " + data.totalNutrients.CHOCDF.unit;

    var totalFat = document.querySelector(".fats");
    totalFat.innerText = fats + " " + data.totalNutrients.FAT.unit;

    var totalProtein = document.querySelector(".protein");
    totalProtein.innerText = protein + " " + data.totalNutrients.PROCNT.unit;

    var totalCholes = document.querySelector(".cholesterol")
    totalCholes.textContent = cholesterol + " " + data.totalNutrients.CHOLE.unit

    var totalCalcium = document.querySelector(".calcium")
    totalCalcium.textContent = calcium + " " + data.totalNutrients.CA.unit

    var totalSodium = document.querySelector(".sodium")
    totalSodium.innerText = salt + " " + data.totalNutrients.NA.unit

    
}

//get today's date
function getDate(){
    var today = new Date();
    var date  = (today.getMonth()+1) + "/" + today.getDate()+ "/" + today.getFullYear();
    var presentDay = document.querySelector("#date")
    presentDay.innerText = date
}

function fillCard(meal){
    var mealCard = document.querySelector (".meal-card")
    mealCard.classList.remove("hidden")
    var info = document.createElement("div");
    var mealNumber = document.querySelector(".meal-number");
    mealNumber.innerText = "Meal One";

    var cardBody = document.querySelector(".card-text");
    cardBody.innerText = meal;

    var nutrientInfo = document.querySelector(".nutrient-info");

    var totalCalories = document.querySelector(".calories-consumed").innerText;
    var totalCarbs = document.querySelector(".carbs").innerText;
    var totalFat = document.querySelector(".fats").innerText;
    var totalProtein = document.querySelector(".protein").innerText; 
    
    var HTML = `<div> Calories: ${totalCalories} </div>
                <div> Carbs: ${totalCarbs} </div>
                <div> Fats: ${totalFat} </div>
                <div> Protein: ${totalProtein} </div>`

    info.innerHTML = HTML
    
    nutrientInfo.appendChild(info)
}


calculatebtn.addEventListener("click", formInput)
getDate()