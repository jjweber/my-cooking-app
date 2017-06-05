/*******************************************************************************/
/*************** Three Ways To Write The Document Ready Statement **************/
/*******************************************************************************/
/*
 // jQuery ready method 1
 // - Easier to understand for people who aren't experienced with jQuery
 $( document ).ready(function() {
 console.log( "ready!" );
 });

 // Method 2
 // Shorthand for $( document ).ready() - Experienced developers usually use the shorthand method
 $(function() {
 console.log( "ready!" );
 });

 // Method 3 - Passing a named function instead of an anonymous function.
 function readyFn( jQuery ) {
 // Code to run when the document is ready.
 }

 $( document ).ready( readyFn );
 // or:
 $( window ).on( "load", readyFn );
 */


/*********************************************/
/*************** Main Javascript**************/
/*********************************************/

let recipeStore = null;
let currentCategory = "all";

$(function () {
  init();
});

function init() {
  getRecipes();
  redrawRecipes();
}

// Function To Add Event Listeners
function addListeners() {
  let $menu = $("[data-category]");

  // Greensock H1 Bounce Animation
  $("h1").on("mouseenter", function() {
    TweenMax.to(this, 0.4, {scale:1.2, ease:Bounce.easeOut})
    TweenMax.to(this, 0.2, {scale:1, delay:0.4})
  })

  // Click Event for Menu Filter
  $menu.click(function (e) {
      e.preventDefault();
      currentCategory = $(this).data( "category" );
      redrawRecipes();
  });
}

// Function for Add Recipe onclick using myPlugin Modal
function openAddModal(index) {
  let htmlForPopup = `
  <form id="addRecipeForm">
    <label for="PhotoUrl">Recipe Image:</label>
    <input type="text" class="form-control photoField" name="PhotoUrl" placeholder="e.g. Homemade Cobbler..." />

    <label for="Title">Recipe Name:</label>
    <input type="text" class="form-control titleField" name="Title" placeholder="e.g. Homemade Cobbler..." />

    <label for="Description">Recipe Description:</label>
    <textarea class="form-control descriptionField" rows="3" name="Description" placeholder="e.g. Best Cobbler I have ever tasted..."></textarea>

    <label for="addStarRatingForModal">Recipe Rating:</label>
    <div id="addStarRatingForModal" class="stars" >
      <input type="radio" name="star" class="star-1" id="star-1" />
      <label class="star-1" for="star-1">1</label>
      <input type="radio" name="star" class="star-2" id="star-2" />
      <label class="star-2" for="star-2">2</label>
      <input type="radio" name="star" class="star-3" id="star-3" />
      <label class="star-3" for="star-3">3</label>
      <input type="radio" name="star" class="star-4" id="star-4" />
      <label class="star-4" for="star-4">4</label>
      <input type="radio" name="star" class="star-5" id="star-5" />
      <label class="star-5" for="star-5">5</label>
      <span></span>
    </div>
    <input type="hidden" class="starField" name="StarRating" value="0">
  </form>

  <div id="addModalBtns">
    <input id="addReciepeSaveBtn" class="btn btn-success" type="submit" value="Save">
    <input id="addModalCancelBtn" class="btn btn-danger" type="button" value="Cancel">
  </div>
  `;

  // Use The Plugin And Pass It Options I Want To Use
  let $modal = $().jjwModal({
      modalClass: "alert", // "warning", "alert", "success", or "danger"
      headerText: "Add Recipe",
      bodyHtml: htmlForPopup
  });

  $("input[name=star]:radio").change(function () {
    let clickedStar = $("input[name='star']:checked").attr('class').split("-")[1];
    $("input[name='StarRating']").val(clickedStar);
  });

  // Click Event For Save Button on Add Recipe Modal With Empty Form Validation
  $("#addReciepeSaveBtn").click(function () {
    if($('.photoField').val() && $('.titleField').val() && $('.descriptionField').val() && $('.starField').val() != 0) {
      let newRecipe = formToObject("form#addRecipeForm");
      recipeStore.addRecipeToStore(newRecipe);

      redrawRecipes();

      $modal.closeDialog();
    } else {
      alert("Missing fields! Please Fill out all Fields!")
    }
  });

  // Click Event For Cancel Button on Add Recipe Modal
  $("#addModalCancelBtn").click(function () {
    // close the modal dialog using the closeDialog function returned from modal plugin
    $modal.closeDialog();
  });
}

function setRatingStar(rating) {
  $("input.star-" + rating).prop('checked', true);
}

// Function for Edit Recipe onclick using myPlugin Modal
function openEditModal(index) {
  let currentRecipe = recipeStore.getCurrentStoreData()[index];
  let htmlForPopup = `
  <form id="editRecipeForm">
    <label for="PhotoUrl">Recipe Image:</label>
    <input type="text" class="form-control photoField" name="PhotoUrl" value=" ${currentRecipe.PhotoUrl} " />

    <label for="Title">Recipe Name:</label>
    <input type="text" class="form-control titleField" name="Title" value=" ${currentRecipe.Title} " />

    <label for="Description">Recipe Description:</label>
    <textarea class="form-control descriptionField" rows="3" name="Description">${currentRecipe.Description}</textarea>

    <label for="addStarRatingForModal">Recipe Rating:</label>
    <div id="addStarRatingForModal" class="stars">
      <input type="radio" name="star" class="star-1" id="star-1" />
      <label class="star-1" for="star-1">1</label>
      <input type="radio" name="star" class="star-2" id="star-2" />
      <label class="star-2" for="star-2">2</label>
      <input type="radio" name="star" class="star-3" id="star-3" />
      <label class="star-3" for="star-3">3</label>
      <input type="radio" name="star" class="star-4" id="star-4" />
      <label class="star-4" for="star-4">4</label>
      <input type="radio" name="star" class="star-5" id="star-5" />
      <label class="star-5" for="star-5">5</label>
      <span></span>
    </div>
    <input type="hidden" class="starField" name="StarRating" value="0">
  </form>

  <div id="editModalBtns">
    <input id="editModalSaveBtn" class="btn btn-success" type="submit" value="Save">
    <input id="editModalCancelBtn" class="btn btn-danger" type="button" value="Cancel">
  </div>
  `;

  // Use The Plugin And Pass It Options I Want To Use
  let $modal = $().jjwModal({
      modalClass: "warning", // "warning", "alert", "success", or "danger"
      headerText: currentRecipe.Title,
      bodyHtml: htmlForPopup
  });

  // Setting Current Star Rating
  setRatingStar(currentRecipe.StarRating);

  $("input[name=star]:radio").change(function () {
    let clickedStar = $("input[name='star']:checked").attr('class').split("-")[1];
    $("input[name='StarRating']").val(clickedStar);
  });

  // Click Event For Save Button on Edit Recipe Modal With Empty Form Validation
  $("#editModalSaveBtn").click(function () {
    if($('.photoField').val() && $('.titleField').val() && $('.descriptionField').val() && $('.starField').val() != 0) {
      let indexOfRecipe = index;
      let updatedRecipe = formToObject("form#editRecipeForm");
      recipeStore.updateRecipeInStore(indexOfRecipe, updatedRecipe);

      redrawRecipes();

      $modal.closeDialog();
    } else {
      alert("Missing fields! Please Fill out all Fields!")
    }
  });

  // Click Event For Cancel Button on Edit Recipe Modal
  $("#editModalCancelBtn").click(function () {
    // close the modal dialog using the closeDialog function returned from modal plugin
    $modal.closeDialog();
  });
}

// Function for Delete Recipe onclick using myPlugin Modal
function openDeleteModal(index) {
  let currentRecipe = recipeStore.getCurrentStoreData()[index];

  let htmlForPopup = `
    <p>Are you sure you want to delete the recipe for  ${currentRecipe.Title}?</p>
    <div deleteRecipeBtnGroup>
      <input id="confirmDeleteBtn" class="btn btn-success" type="submit" value="Yes">
      <input id="closeDeleteBtn" lass="btn btn-danger" type="button" value="No">
    </div>
  `;

  // use the plugin and pass it options we want to use
  let $modal = $().jjwModal({
      modalClass: "danger", // "warning", "alert", "success", or "danger"
      headerText: "Delete Recipe",
      bodyHtml: htmlForPopup
  });

  // Click Event For Ok Button on Delete Recipe Confirmation Modal
  $("#confirmDeleteBtn").click(function () {
    let currentIndex = index;

    // save data here...
    recipeStore.removeItemFromStore(currentIndex);
    redrawRecipes();

    $modal.closeDialog();
  });

  // Click Event For No Button on Delete Recipe Confirmation Modal
  $("#closeDeleteBtn").click(function () {
    // close the modal dialog using the closeDialog function returned from modal plugin
    $modal.closeDialog();
  });
}

// Converting Form Values to Object
function formToObject(selector) {
  let arrayForm = $($(selector)).serializeArray();
  let objectForm = {};

  arrayForm.forEach(function (obj, index) {
    objectForm[obj.name] = obj.value;
  });

  return JSON.parse(JSON.stringify(objectForm));
}

// Function To Get Recipes From Json File Using Ajax
function getRecipes() {
  $.ajax({
    url: './src/js/recipes.json',
    dataType: 'json',
    success: function (data) {
      // user our custom LocalStorageStore class to save data to localstore
      recipeStore = new LocalStorageStore("recipe-data", data.recipes);
      redrawRecipes();
    },
    statusCode: {
      404: function () {
        alert('There was an error retrieving data from json file!');
      }
    }
  });
}

// Function to Re-Draw The Recipes
function redrawRecipes() {
  if(!recipeStore) {
    // store not available
    return;
  }

  let currentData = recipeStore.getCurrentStoreData();
  let strOut = '<ul class="cards">';

  currentData.forEach((recipe, index) => {
    if(currentCategory == "all" || recipe.Category == currentCategory) {

      const listHtml = `<li class="card-wrapper">
                  <div class="card">
                    <div class="card-image" style="background-image: url( ${recipe.PhotoUrl} )"></div>
                    <div class="card-content">
                      <div class="card-title"> ${recipe.Title} </div>
                      <div class="card-text"> ${recipe.Description} </div>
                      <div class="card-footer">
                        <div class="rating">Rating:  ${recipe.StarRating} </div>
                        <div class="buttons"><span class="glyphicon glyphicon-pencil edit" onclick="openEditModal( ` + index + ` )" aria-hidden="true"></span><span class="glyphicon glyphicon-trash delete" onclick="openDeleteModal( ` + index + ` )" aria-hidden="true"></span></div>
                      </div>
                    </div>
                  </div>
                </li>`;

      strOut += listHtml;
    }
  });

  strOut += '</ul>';

  document.getElementById("recipeContainer").innerHTML = strOut;
  addListeners();
}


/**********************************************************************/
/*************** Plugin Notification Test Area Javascript**************/
/**********************************************************************/

$(document).ready(function () {
  let $alertModal = $("button.alertModal");
  let $successModal = $("button.successModal");
  let $warningModal = $("button.warningModal");
  let $dangerModal = $("button.dangerModal");

  $alertModal.click(function () {
    // use the plugin and pass it options we want to use
    $().jjwModal({
      modalClass: "alert", // warning, alert, success, or danger
      headerText: "My Jquery Plugin Alert Notification",
      bodyHtml: '<p><span class="glyphicon glyphicon-bell" aria-hidden="true"></span> This is an alert modal!</p>'
    });
  });

  $successModal.click(function () {
    // use the plugin and pass it options we want to use
    $().jjwModal({
      modalClass: "success", // warning, alert, success, or danger
      headerText: "My Jquery Plugin Success Notification",
      bodyHtml: '<p><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span> This is a success modal!</p>'
    });
  });

  $warningModal.click(function () {
    // use the plugin and pass it options we want to use
    $().jjwModal({
      modalClass: "warning", // warning, alert, success, or danger
      headerText: "My Jquery Plugin Warning Notification",
      bodyHtml: '<p><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> This is a warning modal!</p>'
    });
  });

  $dangerModal.click(function () {
    // use the plugin and pass it options we want to use
    $().jjwModal({
      modalClass: "danger", // warning, alert, success, or danger
      headerText: "My Jquery Plugin Danger Notification",
      bodyHtml: '<p><span class="glyphicon glyphicon-fire" aria-hidden="true"></span> This is a danger modal!</p>'
    });
  });
});
