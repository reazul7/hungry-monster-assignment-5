//value accept from search input
const getFoodList = () => {
    let searchInputTxt = document.getElementById("searchValue");
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt.value}`)
        .then(res => res.json())
        .then((data) => {
            displayFood(data.meals);
        });
};

//found item result show area
const displayFood = (foods) => {
    let foodContainer = document.getElementById("foodItem");
    if (foods == null || foods.length < 0) {
        const foodDiv = document.createElement("div");
        const foodInfo = `
        <h3>Sorry!! Food not found</h3>            
        `;
        foodDiv.innerHTML = foodInfo;
        foodContainer.appendChild(foodDiv);
    }

    else {
        foods.forEach((food) => {
            const foodDiv = document.createElement("div");
            foodDiv.className = "col-md-4 my-3";
            const foodInfo = `
            <div onclick="displayCountryDetail('${food.idMeal}')" class="card" style="width: 18rem;">
            <img  class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
            <div class="card-body">
            <p class="card-text"><h4>${food.strMeal}</h4></p>
            </div>
            </div>
            `;
            foodDiv.innerHTML = foodInfo;
            foodContainer.appendChild(foodDiv);
        });
    }
    document.getElementById("searchValue").value = "";
}

const displayCountryDetail = foodDetails => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetails}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getFoodInfo(data.meals[0]);
        });
}

//food details 
const getFoodInfo = food => {
    const foodDetail = document.getElementById('foodDetails');
    const cockingIngredients = [];
    for (let i = 1; i <= 10; i++) {
        if (food[`strIngredient${i}`]) {
            cockingIngredients.push(`${food[`strMeasure${i}`]}-${food[`strIngredient${i}`]}`);
        } else {
            break;
        }
    }
    foodDetail.innerHTML = `
          <div class="card card-custom">
              <img class="card-img" src="${food.strMealThumb}">
              <div class="card-body">
              <h4 class="card-text">${food.strMeal}</h4>
              <h5>Cocking Ingredients:</h5>
              <ul>
              ${cockingIngredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
          </div>
           `;
}
