console.log("show.sj script is wokring")

const submitForm = () => {
    console.log("working button")
    let filterForm = document.getElementById("lesson-filter-form")
    filterForm.submit()
}

const storeSelectedOption= () => {   
    let selectedOption  = document.getElementsByClassName("lesson-option")
    if (selectedOption.length > 0) {
        console.log( selectedOption)
        const results = selectedOption.filter(item => item.selected === true)
        
        localStorage.setItem("lessonFilterOption", JSON.stringify(selectedOption[0].value));
      
    } else {
      console.log("theres no stored option");
      localStorage.setItem("lessonFilterOption, JSON.stringify([])");
    }
    console.log(selectedOption.value);
  
    //invoke the submit
    submitForm();
    //fetchDataAsync ("http://localhost:3000/studios", options)
  };

const showSelectedOption = () => {
    console.log("show selected option");
    const selectedOption = JSON.parse(localStorage.getItem("lessonFilterOption"));
    console.log("------->", selectedOption);

  };

const init = () => {
    showSelectedOption()

}

init()