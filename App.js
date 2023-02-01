 

// ----------------------Fetch element of HTML----------------------------------------------------------------------------->
const height1 = document.getElementById("height");     
const weight1 = document.getElementById("weight");
const age1    = document.getElementById("age");
const gender1 = document.querySelector(".gender"); 
let activityLevel1 = document.querySelector(".activity-level");
let button = document.getElementById("generate-meals-button");
let recipeSection = document.querySelector(".get-recipe");
let nutrientsSection = document.querySelector(".nutrients");
var imageUrl;
    // Image URL
    const breakFastUrl = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg";
    const lunchUrl     = "https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M=";
    const dinnerUrl    = "https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1200&format=pjpg&exif=1&iptc=1"
    const imagesUrl    = [breakFastUrl,lunchUrl,dinnerUrl];
  
// API KEY
 
let apiKey = "e5f876e95bf04914bc7b95e78bf20f99";

    

// --------------Event Generate Meals Section--------------------

button.addEventListener("click", function(){

  // Value of Input Field
    const height = height1.value
    const weight = weight1.value 
    const age  = age1.value
    const gender = gender1.value
    const activityLevel=  activityLevel1.value;

    if(height == "" || weight == "" || age == ""){
      alert("Please Enter Valid Input");
      return;
    }
    if(height <0 || weight <0 || age <0){
      alert("Please Enter Valid Input");
      return;
    }

  
    // BMR formula
    BMR_Female   =  55.1 + (9.563 * weight) + (1.850 * height) + (4.476 * age); 
    BMR_Male = 66.47 + (13.75 * weight) + (5.003 * height) + (6.755 * age);
  
    
    // Daily Calories Requirement For Different Activity Level
    let dailycaloriesReq = 0;
    if(gender == "male" &&  activityLevel == "light"){
      dailycaloriesReq = BMR_Male * 1.375;  
    }
    else if(gender == "male" &&  activityLevel == "moderate"){
      dailycaloriesReq = BMR_Male * 1.55;  
    }
    else if(gender == "male" &&  activityLevel == "active"){
      dailycaloriesReq = BMR_Male * 1.725;   
    }
    else if(gender == "Female" &&  activityLevel == "light"){
      dailycaloriesReq = BMR_Female * 1.375;
    }
    else if(gender == "Female" &&  activityLevel == "moderate"){
      dailycaloriesReq = BMR_Female * 1.55; 
    }
    else if(gender == "Female" &&  activityLevel == "active"){
      dailycaloriesReq = BMR_Female * 1.725;  
    }
    
     
     
    // -------------------fetch data from API link of Generates Meals---------------
    document.getElementById("loader").style.display = "block";
    let apiKey = "e5f876e95bf04914bc7b95e78bf20f99";

    const p = fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&&timeFrame=day&&targetCalories=${dailycaloriesReq}`)
    p.then((response) =>{
      return response.json();
    }).then((data) =>{
      console.log(data);
      
       // calling function
      createRecipeCard(data);
      // getNutrients(nutrients);
      document.getElementById("loader").style.display = "none";
      // getRecipe(id);
    })

})

// ------------------------------------------------------------------------------------------------------------------------------------------
 // Card Section


function createRecipeCard(data){
  let recipeCard = "";
  let nutrients  = data.nutrients;
  // getNurients(nutrients);
  console.log(nutrients);
  getNutrients(nutrients);
  const arr = ["BREAKFAST", "LUNCH", "DINNER"];
  // ---------------------------nutrients part-----------------------------------

   
  // --------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------
  // const p2 =  fetch(`https://api.spoonacular.com/recipes/${data.meals[0].id}/information?apiKey=${apiKey}&includeNutrition=false`);
  //       p2.then((dataRecipe1)=>{
  //         return dataRecipe1.json();

  //       }).then((getRecipeData)=>{
  //         console.log(getRecipeData)
  //         imageUrl1 = getRecipeData.image;
        // })
  // const dataRecipe =   p1.json();
  // console.log(dataRecipe);
  // const imageUrl = dataRecipe.image;
  // console.log(imageUrl);
  // ------------------------------------------------------------------------------------------------------------------
  
//    arr.map((parameter,index) =>{
//     recipeCard +=     ` <div class="card">
//           <h2 class="heading">${parameter}</h2>
//           <div class="card-image" style="background-image: url(${imagesUrl[index]});">       
//             <div class="meal-calories-getRecipe">
//                 <h2>${data["meals"][index]["title"]}</h2>
//                 <h3>Calories- ${nutrients["calories"]}</h3>
//                    <button type="button" id="get-recipe-button1" onclick="getRecipe(${data.meals[index].id})">GET RECIPE</button>
//               </div>
//           </div>
//          </div>
//          `
//          console.log(data.meals[index].id);
//          document.querySelector(".cards").innerHTML = recipeCard;
         
//   })
// }${imagesUrl[index]} "https://webknox.com/recipeImages/${data.meals[index].id}-556x370.jpg"
// -----------------------------------------------------------------------------------
   

  arr.map((parameter,index) =>{
    recipeCard +=     ` <div class="card">                      
          <h2 class="heading">${parameter}</h2>
            <div class="card-image" style='background-image: url("https://webknox.com/recipeImages/${data.meals[index].id}-556x370.jpg");'>       
              <div class="meal-calories-getRecipe">
                  <h2>${data["meals"][index]["title"]}</h2>
                    <button type="button" id="get-recipe-button2" onclick="getNutrients(${nutrients})")">NUTRIENTS</button>
                    <button type="button" id="get-recipe-button1" onclick="getRecipe(${data.meals[index].id})">GET RECIPE</button>
                </div>
            </div>
        </div>
         `
         console.log(data.meals[index].id);
         document.querySelector(".cards").innerHTML = recipeCard;
         
  })
  // const buttonNutrients = document.getElementById("get-recipe-button2");
  //  ------------------------------------Nutrients Section---------------------------------------------
  function  getNutrients(nutrients){
    const nutrientsTable = `
            <table>
              <thead>
                <tr>
                  <th>CALORIES</th>
                  <th>CARBOHYDRATES</th>
                  <th>FAT</th>
                  <th>PROTEIN</th>
                </tr>
              </thead>
            </table>
    `;
    // return nutrientsTable;
    // alert("hello");

    let fragements1 = document.createDocumentFragment();
    fragements1.appendChild(convertHTML(nutrientsTable));
    nutrientsSection.innerHTML = "";
    nutrientsSection.appendChild(creatNutrientsTable(fragements1.children[0], nutrients));
    // document.querySelector(".nutrients").innerHTML = nutrientsTable;

  }
}


// --------------------------------------------------------------------------------------
    // Nutrients function
    // const buttonNutrients = document.getElementById("get-recipe-button2");
    // buttonNutrients.addEventListener("click", (nutrients)=>{
    //   const nutrientsTable = `
    //         <div>
    //           <table>
    //             <tr>
    //               <th>CALORIES</th>
    //               <th>CARBOHYDRATES</th>
    //               <th>FAT</th>
    //               <th>PROTEIN</th>
    //             </tr>
    //             <td>${nutrients.calories}</td>
    //             <td>${nutrients.carbohydrates}</td>
    //             <td>${nutrients.fat}</td>
    //             <td>${nutrients.protein}</td>
    //           </table>
    //         </div>
    //   `;
    //   return nutrientsTable;
    //   // document.querySelector(".nutrients").innerHTML = nutrientsTable;
    // })
// -----------------------------------------------------------------------------------------------
// function to convert HTML Document Fragment
  function convertHTML(recipetable){
  const div = document.createElement("div");
  div.innerHTML = recipetable;
  return div.children[0];
}

// -----------------------Get Recipe Section-------------------
async function getRecipe(id){
  console.log(id);
  // console.log("hello");
   // fetch data for Get recipe

   const p1 = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`);
   const dataRecipe =  await p1.json();
   console.log(dataRecipe);
  //  imageUrl = dataRecipe.image;
  //  console.log(imageUrl);
   const {extendedIngredients:Ingredients} = dataRecipe;
   console.log(Ingredients); 

   const recipetable = ` 
          <table class="table-container">
           <thead>
             <tr>
               <th>INGREDIENTS</th>
               <th>AMOUNT</th>
               <th>EQUIPMENT</th>
               <th>CONSISTENCY</th>
             </tr>
           </thead>
          </table>
    `;
  // ------------------------------------------------------------------------------------
  let fragements = document.createDocumentFragment();
  fragements.appendChild(convertHTML(recipetable));
  recipeSection.innerHTML = "";
  recipeSection.appendChild(createTable(fragements.children[0], Ingredients));
   
}

 
// ----------------------------------------------------------------------------------------------------------------------------------
  


  // --------------------------------------------------------------------------------------------------------------------------------
  //  recipetable = ` 
  //        <table class="table-container">
  //         <thead class="thead">
  //           <tr>
  //             <th>INGREDIENTS</th>
  //             <th>STEPS</th>
  //             <th>EQUIPMENT</th>
  //           </tr>
  //         </thead>
  //        </table>
    
  //  `;
    // document.querySelector(".get-recipe").innerHTML = recipetable;
    

  // -----------------------------------------------------------------   
  // let recipetable1 = `
  //                   <div class="card-image" style="background-image: url(${imageUrl});"> 
                     
  // `
  // document.querySelector(".get-recipe").innerHTML = recipetable1;
  // -----------------------------------------------------------------

// }
// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------- Table for dataRecipe--------------------------------
function createTable(table, arr){
  let tableBody = document.createElement("tbody");
  arr.forEach((element) => {
       
      let tableRow = document.createElement("tr");
      // data 1
      let tableData1 = document.createElement("td");
      tableData1.innerText = element.name;
      tableRow.appendChild(tableData1);
      // data 2
      let tableData2 = document.createElement("td");
      tableData2.innerText = element.amount;
      tableRow.appendChild(tableData2);
      // data 3

      let tableData3 = document.createElement("td");
      tableData3.innerText =element.unit || element.measures.us.unitShort || element.measures.us.unitShort|| element.measures.metric.unitShort || element.measures.metric.unitLong || element.name;
      tableRow.appendChild(tableData3);
      // data 4
      let tableData4 = document.createElement("td");
      tableData4.innerText = element.consistency;
      tableRow.appendChild(tableData4);
      tableBody.appendChild(tableRow);
 });
 
 table.appendChild(tableBody);
 return table;

}
// ------------------------------------------------


// --------------------create nutrients table--------------
function creatNutrientsTable(table,nutrients){
      const tr1 = document.createElement("tr");
      // data1
      const td1 = document.createElement("td");
      td1.innerText = nutrients.calories;
      tr1.appendChild(td1);
      // data2
      const td2 = document.createElement("td");
      td2.innerText = nutrients.carbohydrates;
      tr1.appendChild(td2);
      // data3
      const td3 = document.createElement("td");
      td3.innerText = nutrients.fat;
      tr1.appendChild(td3);
      // data4
      const td4 = document.createElement("td");
      td4.innerText = nutrients.protein;
      tr1.appendChild(td4);
      // table body 
      let tbody1 = document.createElement("tbody");
      tbody1.appendChild(tr1);
      table.appendChild(tbody1);
      return table;
}
// ----------------------------------------------------------------


 
 

 
