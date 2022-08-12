console.log("filters script working");

const submitForm = () => {
  let filterForm = document.getElementById("studio-filters-options-form");
  filterForm.submit();
};

const clearFilters = () => {
  console.log("clear button working");
  const filterCheckboxes = document.querySelectorAll(".studio-filters-options");
  console.log(filterCheckboxes);
  filterCheckboxes.forEach((item) => {
    item.checked = false;
  });
  storeCheckedItems();
};

const storeCheckedItems = () => {
  const checkedValues = [];
  const checkedItems = document.querySelectorAll(
    "input[class='studio-filters-options mx-1']:checked"
  );
  if (checkedItems.length > 0) {
    checkedItems.forEach((item) => {
      checkedValues.push(item.value);
      console.log(item.value);
    });
    console.log("theres checked boxes");
    localStorage.setItem("checkedValues", JSON.stringify(checkedValues));
  } else {
    console.log("theres no checked boxes");
    localStorage.setItem("checkedValues", JSON.stringify([]));
  }
  console.log(checkedValues);

  //invoke the submit
  submitForm();
  //fetchDataAsync ("http://localhost:3000/studios", options)
};

const showPreviousCheckedItems = () => {
  console.log("show checked items");
  const checkedValues = JSON.parse(localStorage.getItem("checkedValues"));
  console.log("------->", checkedValues);
  //iff theres previous checked items, the clear btn should enabled
  if (checkedValues.length > 0) {
    checkedValues.forEach((item) => {
      document.querySelector(`input[value=${item}]`).checked = true;
    });
    document.getElementById("clear-btn").disabled = false;
  }
};

const addEventListeners = () => {
  console.log("add event listeners");
  document
    .getElementById("studio-filters-list")
    .addEventListener("click", (event) => {
      if (event.target.type === "checkbox") {
        console.log("hit checkbox");
        //clear button is disabled, enable it
        if (document.getElementById("clear-btn").disabled) {
          document.getElementById("clear-btn").disabled = false;

          return;
        }
        const filterCheckboxes = document.querySelectorAll(
          "input[class='studio-filters-options mx-1']:checked"
        );
        console.log(filterCheckboxes);
        //diabled clear if theres no more checked checkboxes
        if (filterCheckboxes.length == 0) {
          document.getElementById("clear-btn").disabled = true;
        } else {
          console.log("theres still checked boxes");
        }
      }
    });
};

const init = () => {
  addEventListeners();
  showPreviousCheckedItems();
};

init();
