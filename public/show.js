// import filterLesson from "../../utils/helper"

const submitForm = () => {
    console.log("working button")
    let selectedLesson= document.getElementById("lessons-select").value  
    console.log(selectedLesson)
    let filterForm = document.getElementById("filter-form")
    filterForm.submit()
}

const loadStars = () => {
    console.log("laod stars")
    let avgStars = document.getElementsByClassName("avg-star")
    let avgRating = Math.round(document.getElementById("avg-rating-num").innerText)
    console.log(avgStars, avgRating)
    for(let i = 4; i >= avgRating; i--){
        avgStars[i].classList.add("opacity-25")}

       
}     


const init = () => {
    loadStars()
}


// init()