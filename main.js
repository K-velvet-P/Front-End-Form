const form = document.getElementById("toggle-content-form");
const plan = document.getElementById("toggle-content-plan");
const addons_monthly = document.getElementById("toggle-content-addons_monthly");
const addons_yearly = document.getElementById("toggle-content-addons_yearly");
const summary_monthly = document.getElementById(
  "toggle-content-summary_monthly"
);
const summary_yearly = document.getElementById("toggle-content-summary_yearly");

const confirmation = document.getElementById("toggle-content-confirmation");
const attribution = document.getElementById("toggle-content-attribution");
const goBackBtn = document.getElementById("go_back_button");
const nextStepBtn = document.getElementById("next_step_button");

const monthly_plan = document.getElementById("toggle-content-monthly_plan");
const yearly_plan = document.getElementById("toggle-content-yearly_plan");
const switch_div = document.getElementById("plan_switch");

const btnDiv = document.getElementById("toggle-content-btn_div");

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone_number = document.getElementById("number");

const next_step_button = document.getElementById("next_step_button");
const mobileView = document.getElementsByClassName(
  "toggle-content-steps_mobile"
);

//-----------------STEP NUMBER ICONS -----------------

let currentPageIndex;
let error_message = [];

const pageArray = [
  form,
  plan,
  addons_monthly,
  summary_monthly,
  confirmation,
  attribution,
];

const stepNumbersArrray_color = [
  "one_color",
  "two_color",
  "three_color",
  "four_color",
];
const stepNumbersArrray = ["one", "two", "three", "four"];

const stepNumbersArrrayM = ["oneM", "twoM", "threeM", "fourM"];
const stepNumbersArrray_colorM = [
  "one_colorM",
  "two_colorM",
  "three_colorM",
  "four_colorM",
];

const submit_button = document.getElementById("next_step_button");

submit_button.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const fields = [
    {
      input: document.getElementById("name"),
      errorDiv: "error_div1",
      errorMessage: "Full name is required",
    },
    {
      input: document.getElementById("email"),
      errorDiv: "error_div2",
      errorMessage: "Email is required",
    },
    {
      input: document.getElementById("number"),
      errorDiv: "error_div3",
      errorMessage: "Phone number is required",
    },
  ];

  let idWithError = null;

  fields.forEach((field) => {
    if (field.input.value === "") {
      document.getElementById(field.errorDiv).innerText = field.errorMessage;
      field.input.style.border = "1px solid #ee374a";
      if (idWithError === null) {
        idWithError = field.errorDiv;
      }
    } else {
      console.log("field", field);
      document.getElementById(field.errorDiv).innerText = ""; // Clear error message
      field.input.style.border = "1px solid #d6d9e6"; // Reset border
    }
  });

  if (idWithError === null) {
    nextStep();
  }
}
function validateForm() {
  let error_message = [];
  let idWithError = null;
  let form_errors;

  const fields = [fullName.value, email.value, phone_number.value];

  if (fields.some((field) => field === "" || field === null)) {
    error_message.push("This field is required");
    console.log("error_message1", error_message);
  }

  if (fields[0] === "" || fields[0] === null) {
    idWithError = "name";
    form_errors = document.getElementById("error_div1");
  } else if (fields[1] === "" || fields[1] === null) {
    idWithError = "email";
    form_errors = document.getElementById("error_div2");
  } else if (fields[2] === "" || fields[2] === null) {
    idWithError = "number";
    form_errors = document.getElementById("error_div3");
  }

  if (error_message.length > 0) {
    console.log("meee");
    form_errors.innerText = error_message.join(", ");
    document.getElementById(idWithError).style.border = "1px solid #ef1c1c";
  } else {
    nextStep();
  }
}

//----------------- HELPER FUNCTIONS -----------------
function getCurrentPageIndex() {
  return pageArray.findIndex((page) => page.classList.contains("current-page"));
}

function toggleButtonVisibility() {
  const currentPageIndex = getCurrentPageIndex();
  goBackBtn.style.visibility = currentPageIndex !== 0 ? "visible" : "hidden";
  if (currentPageIndex === pageArray.length - 3) {
    nextStepBtn.style.display = "none";
    confirm_step_button.style.display = "block";
  } else {
    nextStepBtn.style.display = "block";
    confirm_step_button.style.display = "none";
  }
}

// ----NEXT STEP----
function nextStep() {
  let currentPageIndex = getCurrentPageIndex();
  if (currentPageIndex !== -1 && currentPageIndex < pageArray.length - 1) {
    pageArray[currentPageIndex].classList.remove("current-page");
    pageArray[currentPageIndex].style.display = "none";
    pageArray[currentPageIndex + 1].classList.add("current-page");
    pageArray[currentPageIndex + 1].style.display = "block";
  }
  toggleButtonVisibility();
  showStepNumber();
}

// ----GO BACK A STEP----
function goBack() {
  let currentPageIndex = getCurrentPageIndex();
  if (currentPageIndex !== -1 && currentPageIndex < pageArray.length - 1) {
    pageArray[currentPageIndex].classList.remove("current-page");
    pageArray[currentPageIndex].style.display = "none";
    pageArray[currentPageIndex - 1].classList.add("current-page");
    pageArray[currentPageIndex - 1].style.display = "block";
  }
  toggleButtonVisibility();
  showStepNumber();
}
// ----Numbers on the side----

function showStepNumber() {
  currentPageIndex = getCurrentPageIndex();
  if (screen.width < 992) {
    stepNumbersArrrayM.forEach((stepNumber, index) => {
      const stepNumberElementM = document.getElementById(stepNumber);
      if (index === currentPageIndex) {
        stepNumberElementM.style.display = "none";
      } else {
        stepNumberElementM.style.display = "block";
      }
    });

    stepNumbersArrray_colorM.forEach((stepNumber, index) => {
      const stepNumberColorElementM = document.getElementById(stepNumber);
      if (index === currentPageIndex) {
        stepNumberColorElementM.style.display = "block";
      } else {
        stepNumberColorElementM.style.display = "none";
      }
    });
  } else {
    stepNumbersArrray.forEach((stepNumber, index) => {
      const stepNumberElement = document.getElementById(stepNumber);
      if (index === currentPageIndex) {
        stepNumberElement.style.display = "none";
      } else {
        stepNumberElement.style.display = "block";
      }
      stepNumbersArrray_color.forEach((stepNumber, index) => {
        const stepNumberColorElement = document.getElementById(stepNumber);
        if (index === currentPageIndex) {
          stepNumberColorElement.style.display = "block";
        } else {
          stepNumberColorElement.style.display = "none";
        }
      });
    });
  }
}
// ----SHOW YEARLY PLAN OR MONTHLY PLAN----

function showYearlyPlan() {
  monthly_plan.style.display = switch_div.checked ? "none" : "block";
  yearly_plan.style.display = switch_div.checked ? "block" : "none";

  pageArray.splice(2, 2);
  pageArray.splice(
    2,
    0,
    switch_div.checked ? addons_yearly : addons_monthly,
    switch_div.checked ? summary_yearly : summary_monthly
  );
}

// ---CONFIRMATION PAGE---
function Confirm() {
  summary_monthly.style.display = "none";
  summary_yearly.style.display = "none";
  confirmation.style.display = "block";
  btnDiv.style.visibility = "hidden";
  goBackBtn.style.visibility = "hidden";
}

// ---CHANGE PLAN---

function changePlan() {
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

  pageArray[3].classList.remove("current-page");
  pageArray[1].classList.add("current-page");
}

// ----ADD ONS----

let planPrice;//BUG 1

function planSelection(value, price) {
  const planChoice = value;
  console.log("planChoice", planChoice);
  planPrice = price;
  console.log("price", price);
  console.log("planPrice", planPrice);
  // button.getAttribute("data-price");

  // console.log("planPrice22", planPrice);
  // console.log("price", data - price);
  // console.log("planChoice", planChoice);
  // console.log("value", value);
  const existingContent = switch_div.checked ? "(yearly)" : "(monthly)";
  console.log("existingContent", existingContent);

  const updatedContentM = `${planChoice} ${existingContent}`;
  document.getElementById("planChoiseM").textContent = updatedContentM;
  console.log("updatedContentM", updatedContentM);

  const updatedContentY = `${planChoice} ${existingContent}`;
  document.getElementById("planChoiseY").textContent = updatedContentY;
  console.log("updatedContentY", updatedContentY);

  const priceElementM = document.getElementById(`${value.toLowerCase()}PriceM`); //get the element
  const priceM = priceElementM.textContent; //get the price from the element
  console.log("priceM", priceM);
  const priceElementY = document.getElementById(`${value.toLowerCase()}PriceY`);
  const priceY = priceElementY.textContent;

  document.getElementById("selectedPlanPriceM").textContent = priceM; //update the price
  document.getElementById("selectedPlanPriceY").textContent = priceY;
  return planPrice;//BUG 1
}

let itemFormsM = document.getElementsByClassName("add-ons");
let checkBoxesM = itemFormsM[0].querySelectorAll('input[type="checkbox"]');
let checkBoxesY = itemFormsM[1].querySelectorAll('input[type="checkbox"]');
let addonChoise = [];

// ----ADD ON SELECTION----

function addonSelection(checkbox) {
  addonChoise = [];
 
  checkBoxesM.forEach((item) => {
    // console.log("item", item);
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
    if (item.checked) {
      let data = {
        item: item.value,
        pricedigit: parseFloat(item.dataset.price),
        pricestring: item.dataset.pricelabel,
      };
      addonChoise.push(data); 
    }
  });

  // console.log("addonChoise", addonChoise);

  let addonTotal = 0;
  for (let i = 0; i < addonChoise.length; i++) {
    let addonText = addonChoise[i].item;
    let addon_price_string = addonChoise[i].pricestring;
    let addon_price = addonChoise[i].pricedigit;

    // console.log("addonText", addonText);
    // console.log("addon_price_string", addon_price_string);
    // console.log("addon_price", addon_price);

    if (addonText) {
      if (switch_div.checked) {
        document.querySelector(`.addonChoiseY${i + 1}`).textContent = addonText;
        document.querySelector(`.addonPriceY${i + 1}`).textContent =
          addon_price_string;
        addonTotal += addon_price += planPrice; //BUG 1 (added priceplan to toal  price)
        // Accumulate the prices of selected add-ons

        // console.log("Total addon price:", addonTotal);

        let totalElement = document.querySelector(".totalPriceY");
        totalElement.textContent = `$+${addonTotal.toFixed(2)}/mo`;
      } else {
        document.querySelector(`.addonChoise${i + 1}`).textContent = addonText;
        document.querySelector(`.addonPrice${i + 1}`).textContent =
          addon_price_string;
        addonTotal += addon_price; // Accumulate the prices of selected add-ons
        // console.log("Total addon price:", addonTotal);

        let totalElement = document.querySelector(".totalPriceM");
        totalElement.textContent = `$+${addonTotal.toFixed(2)}/mo`;
      }
    }
  }
}

// function addonSelection(checkbox) {
//   const isYearly = switch_div.checked;
//   const itemForms = isYearly ? itemFormsM[1] : itemFormsM[0];
//   const checkBoxes = itemForms.querySelectorAll('input[type="checkbox"]');

//   addonChoise = [];
//   checkBoxes.forEach((item, index) => {
//     if (item.checked) {
//       const data = {
//         item: item.value,
//         pricedigit: parseFloat(item.dataset.price),
//         pricestring: item.dataset.pricelabel,
//       };

//       addonChoise.push(data);

//       const addonText = data.item;
//       const addonPriceString = data.pricestring;
//       console.log("m0m0 ", addonPriceString);
//       const addonPrice = data.pricedigit;
//       console.log("meme ", addonPrice);

//       const addonClassPrefix = isYearly ? ".addonChoiseY" : ".addonChoise";
//       const addonPriceClassPrefix = isYearly ? ".addonPriceY" : ".addonPrice";

//       document.querySelector(`${addonClassPrefix}${index + 1}`).textContent =
//         addonText;
//       document.querySelector(
//         `${addonPriceClassPrefix}${index + 1}`
//       ).textContent = addonPriceString;

//       let addonTotal = addonChoise.reduce(
//         (total, addon) =>  + total + addon.pricedigit,
//         0
//       );

//       const totalElement = document.querySelector(
//         `.totalPrice${isYearly ? "Y" : "M"}`
//       );
//       totalElement.textContent = `$${addonTotal.toFixed(2)}/mo`;
//     }
//   });
// }
