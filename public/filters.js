console.log("filters script working")

const clearFilters = () => {
    console.log("clear button working")
   const filterCheckboxes = document.querySelectorAll("#location-filter")
   filterCheckboxes.forEach(item =>{
    item.checked = false
   })
   
}

const enableClearButton = (IdName) => {
    console.log("enable button working")
    document.getElementById("location-clear-btn").disabled = false
}

const disableClearButton = (IdName) => {
    console.log("disable button working")
    document.getElementById(IdName).disabled = true
}

const triggerClearBUtton = () => {

}

const addEventListeners = () =>{
    console.log("add event listeners")
    document.getElementById("filter-list").addEventListener('click', (event) => {
        if (event.target.type === "checkbox") {
            console.log("hit checkbox")
            //clear button is disabled, enable it         
            if(document.getElementById("location-clear-btn").disabled){
                document.getElementById("location-clear-btn").disabled = false
                return
            }
            const filterCheckboxes = document.querySelectorAll("input[name='location']:checked")
            console.log(filterCheckboxes)
            //diabled clear if theres no more checked checkboxes
            if(filterCheckboxes.length ==  0){
                document.getElementById("location-clear-btn").disabled = true
            }else{
                console.log("theres still checked boxes")
            }             
        }
    })
}

addEventListeners()

