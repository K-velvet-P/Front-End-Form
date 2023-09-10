let form = document.getElementById("toggle-content-form");
let plan = document.getElementById("toggle-content-plan");
let addons_monthly = document.getElementById("toggle-content-addons_monthly");
let addons_yearly = document.getElementById("toggle-content-addons_yearly");

let summary_monthly = document.getElementById("toggle-content-summary_monthly");
let summary_yearly = document.getElementById("toggle-content-summary_yearly");

let confirmation = document.getElementById("toggle-content-confirmation");
let attribution = document.getElementById("toggle-content-attribution");
let goBackBtn = document.getElementById("go_back_button");
let nextStepBtn = document.getElementById("next_step_button");

let monthly_plan = document.getElementById("toggle-content-monthly_plan");
let yearly_plan = document.getElementById("toggle-content-yearly_plan");
let switch_div = document.getElementById("plan_switch");

let btnDiv = document.getElementById("toggle-content-btn_div");

let currentPageIndex;

let pageArray = [
  form,
  plan,
  addons_monthly,
  // addons_yearly,
  summary_monthly,
  // summary_yearly,
  confirmation,
  attribution,
];

// // ---REFACTORING---
// make array of all the pages
// write function that maps trough the array and hides/shows the neccery pages

function nextStep() {
  // Find the index of the currently visible div
  let currentPageIndex = pageArray.findIndex((page) => {
    return page.classList.contains("current-page");
  });
  console.log("currentPageIndex", currentPageIndex);

  console.log("currentPage", pageArray[currentPageIndex + 1]);

  // Check if currentPageIndex is valid
  if (currentPageIndex !== -1 && currentPageIndex < pageArray.length - 1) {
    // Remove the current-page class from the current div
    pageArray[currentPageIndex].classList.remove("current-page");
    pageArray[currentPageIndex].style.display = "none";
    // Add the current-page class to the next div
    pageArray[currentPageIndex + 1].classList.add("current-page");
    pageArray[currentPageIndex + 1].style.display = "block";
  }

  if (currentPageIndex === 0) {
    goBackBtn.style.visibility = " visible";
  }

  if (currentPageIndex === pageArray.length - 4) {
    nextStepBtn.style.display = "none";
    confirm_step_button.style.display = "block";
  }
}

function goBack() {
  let currentPageIndex = pageArray.findIndex((page) => {
    return page.classList.contains("current-page");
  });
  console.log("currentPageIndex", currentPageIndex);
  if (currentPageIndex !== -1 && currentPageIndex < pageArray.length - 1) {
    // Remove the current-page class from the current div
    pageArray[currentPageIndex].classList.remove("current-page");
    pageArray[currentPageIndex].style.display = "none";
    // Add the current-page class to the next div
    pageArray[currentPageIndex - 1].classList.add("current-page");
    pageArray[currentPageIndex - 1].style.display = "block";
  }
  if (currentPageIndex === 1) {
    goBackBtn.style.visibility = " hidden";
  }
}

// ---CONFIRMATION PAGE---
function Confirm() {
  console.log("finish");
  summary_monthly.style.display = "none";
  summary_yearly.style.display = "none";
  confirmation.style.display = "block";
  btnDiv.style.visibility = "hidden";
  goBackBtn.style.visibility = "hidden";
}

// ---CHANGE PLAN---
function changePlan() {
  console.log("change plan");
  if (switch_div.checked) {
    monthly_plan.style.display = "none";
    yearly_plan.style.display = "block";
    plan.style.display = "block";
  } else {
    plan.style.display = "block";
  }
  addons_monthly.style.display = "none";
  addons_yearly.style.display = "none";
  summary_monthly.style.display = "none";
  summary_yearly.style.display = "none";
  confirmation.style.display = "none";
  attribution.style.display = "none";
  nextStepBtn.style.display = "block";
  confirm_step_button.style.display = "none";
}

// ----SHOW YEARLY PLAN OR MONTHLY PLAN----
function showYearlyPlan() {
  if (switch_div.checked) {
    monthly_plan.style.display = "none";
    yearly_plan.style.display = "block";
  } else {
    monthly_plan.style.display = "block";
    yearly_plan.style.display = "none";
  }
}

// ----ADD ONS----
function planSelection(value) {
  //can i make this all into one function?
  let planChoise = value;
  console.log(planChoise);
  let existingContent = "";

  if (switch_div.checked) {
    existingContent = "(yearly)";
  } else {
    existingContent = "(monthly)";
  }

  let updatedContentM = planChoise + " " + existingContent;
  document.getElementById("planChoiseM").textContent = updatedContentM;

  let updatedContentY = planChoise + " " + existingContent;
  document.getElementById("planChoiseY").textContent = updatedContentY;

  console.log("updatedContent", updatedContentM);
  console.log("updatedContent", updatedContentY);

  // Get the price from the selected button's h4 element
  let priceElementM = document.getElementById(`${value.toLowerCase()}PriceM`);
  let priceM = priceElementM.textContent;
  console.log(priceM);

  let priceElementY = document.getElementById(`${value.toLowerCase()}PriceY`);
  let priceY = priceElementY.textContent;
  console.log(priceY);

  // Update the price in the summary page
  document.getElementById("selectedPlanPriceM").textContent = priceM;
  document.getElementById("selectedPlanPriceY").textContent = priceY;
}

// let itemForm = document.getElementsByClassName("add-ons_monthly"); // getting the parent container of all the checkbox inputs
// let checkBoxes = itemForm.querySelectorAll('input[type="checkbox"]'); // get all the check box

let itemFormsM = document.getElementsByClassName("add-ons");
// let itemFormsY = document.getElementsByClassName("add-ons_yearly");
console.log("itemFormsM", itemFormsM);
// let checkBoxesM = itemFormsM[0].querySelectorAll('input[type="checkbox"]');

//---WHY DO I HAVE TO DO THIS TWICE?---WHY CAN'T I JUST DO ITEM FORMS AS A WHOLE?
let checkBoxesM = itemFormsM[0].querySelectorAll('input[type="checkbox"]');
let checkBoxesY = itemFormsM[1].querySelectorAll('input[type="checkbox"]');

console.log("checkBoxesM", checkBoxesM);
console.log("checkBoxesY", checkBoxesY);
let addonChoise = [];

function addonSelection(checkbox) {
  addonChoise = [];

  // console.log('addon_price',addon_price);
  // console.log('Cboxvalue',Cboxvalue);

  checkBoxesM.forEach((item) => {
    console.log("item", item);
    // loop all the checkbox item
    if (item.checked) {
      //if the check box is checked
      let data = {
        // create an object
        item: item.value,
        pricedigit: parseFloat(item.dataset.price),
        pricestring: item.dataset.pricelabel,
      };
      addonChoise.push(data); //stored the objects to result array
    }
  });

  checkBoxesY.forEach((item) => {
    console.log("item", item);
    // loop all the checkbox item
    if (item.checked) {
      //if the check box is checked
      let data = {
        // create an object
        item: item.value,
        pricedigit: parseFloat(item.dataset.price),
        pricestring: item.dataset.pricelabel,
      };
      addonChoise.push(data); //stored the objects to result array
    }
  });

  console.log("addonChoise", addonChoise);

  let addonTotal = 0;
  for (let i = 0; i < addonChoise.length; i++) {
    let addonText = addonChoise[i].item;
    let addon_price_string = addonChoise[i].pricestring;
    let addon_price = addonChoise[i].pricedigit;

    console.log("addonText", addonText);
    console.log("addon_price_string", addon_price_string);
    console.log("addon_price", addon_price);

    if (addonText) {
      if (switch_div.checked) {
        document.querySelector(`.addonChoiseY${i + 1}`).textContent = addonText;
        document.querySelector(`.addonPriceY${i + 1}`).textContent =
          addon_price_string;
        addonTotal += addon_price; // Accumulate the prices of selected add-ons

        console.log("Total addon price:", addonTotal);

        let totalElement = document.querySelector(".totalPriceY");
        totalElement.textContent = `$+${addonTotal.toFixed(2)}/mo`;
      } else {
        document.querySelector(`.addonChoise${i + 1}`).textContent = addonText;
        document.querySelector(`.addonPrice${i + 1}`).textContent =
          addon_price_string;
        addonTotal += addon_price; // Accumulate the prices of selected add-ons
        console.log("Total addon price:", addonTotal);

        let totalElement = document.querySelector(".totalPriceM");
        totalElement.textContent = `$+${addonTotal.toFixed(2)}/mo`;
      }
    }
  }
}
