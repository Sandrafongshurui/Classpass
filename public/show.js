// import filterLesson from "../../utils/helper"

const submitForm = () => {
    console.log("working button")
    let selectedLesson= document.getElementById("lessons-select").value  
    console.log(selectedLesson)
    let filterForm = document.getElementById("filter-form")
    filterForm.submit()
}


  