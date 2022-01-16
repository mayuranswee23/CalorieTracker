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
                calculateData(data);
            })
        } else {
            console.log("error");
        }
    })
}


//get data from the customers's form input
function formInput(selectedUnit, quantityValue, ingredientValue){
var selectedUnit = units.value;
var quantityValue = quantity.value;
var ingredientValue = ingredient.value;
var meal = quantityValue + " " + selectedUnit + " " + ingredientValue
getData(meal)
}

function calculateData(data){
    var calories = data.calories
    var grams = data.totalWeight
    console.log(calories)
    console.log(grams)
}


calculatebtn.addEventListener("click", formInput)