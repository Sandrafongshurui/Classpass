console.log("show.sj script is wokring")

const submitForm = () => {
    let filterForm = document.getElementById("lesson-filter-form")
    filterForm.submit()
}

const storeSelectedOption= () => {   
    const selectedIndex = document.getElementById("lessons-select").selectedIndex
    localStorage.setItem("lessonFilterOption", JSON.stringify(selectedIndex));
    console.log("store", selectedIndex);
    //invoke the submit
    submitForm();
    //fetchDataAsync ("http://localhost:3000/studios", options)
  };

const showSelectedOption = () => {
    console.log("show selected option");
    const selectedIndex = JSON.parse(localStorage.getItem("lessonFilterOption")); 
    document.getElementById("lessons-select").options.selectedIndex = selectedIndex 
    console.log("get opetion ------->", selectedIndex);
  };

const init = () => {
    showSelectedOption()
}

init()