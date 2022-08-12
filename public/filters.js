// const { init } = require("../models/studios/studios")

console.log("filters script working")

const submitForm = () => {
    let filterForm = document.getElementById("studio-filters-options-form")
    filterForm.submit()
}

const clearFilters = () => {
    console.log("clear button working")
   const filterCheckboxes = document.querySelectorAll(".studio-filters-options")
   console.log(filterCheckboxes)
   filterCheckboxes.forEach(item =>{
    item.checked = false
   })   
   storeCheckedItems()
}

// const enableClearButton = (IdName) => {
//     console.log("enable button working")
//     document.getElementById("location-clear-btn").disabled = false
// }

// const disableClearButton = (IdName) => {
//     console.log("disable button working")
//     document.getElementById(IdName).disabled = true
// }
const storeCheckedItems = () => {
    const checkedValues = []
    const checkedItems = document.querySelectorAll("input[class='studio-filters-options']:checked")
    if(checkedItems.length >  0){
        checkedItems.forEach(item =>{
            checkedValues.push(item.value)
            console.log(item.value)
           })
           console.log("theres checked boxes")
           localStorage.setItem("checkedValues",JSON.stringify(checkedValues))
    }else{
        console.log("theres no checked boxes")
        localStorage.setItem("checkedValues",JSON.stringify([]))
    }    
    console.log(checkedValues)

    //invoke the submit   
    submitForm()
    //fetchDataAsync ("http://localhost:3000/studios", options)       
}

const showPreviousCheckedItems = () => {
    console.log("show checked items")
    const checkedValues = JSON.parse(localStorage.getItem('checkedValues'));
    console.log("------->",checkedValues)
    //iff theres previous checked items, the clear btn should enabled
    if(checkedValues.length >0){
        checkedValues.forEach(item =>{
            document.querySelector(`input[value=${item}]`).checked = true
        })
        document.getElementById("clear-btn").disabled = false
    }
 
    
}

//form must do the post method also
// const options = {
//     method: 'POST',
//         headers: {
//            'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             //pass checked items, will be passed as the body
//             location: "North",
//         })
// };

// //url shld be /studuios
// const fetchDataAsync = async (url, options) => {
//     const response = await fetch(url, options)
//     const studios = await response.json()
//     console.log("log in front end", studios)
//     document.getElementById("class-list").classList.add("hidden")
//     studios.forEach(item =>{
//         document.getElementById("class-list-section").appendChild(          
//        `<div class="col card w-75 mx-auto">
//        <div class=" d-flex">
//            <div class="studio-item-img"><a href="/studios/${item._id}">
//            <img src="${item.img}" class="card-img-top"></a>
//            </div>
//            <div class="card-body studio-item-details">
//                <p class="card-text">
//                ${item.name}
//                    </a></p>
//            </div>
//            <div class="card-body studio-item-description">
//                <p class="card-text">
//                ${item.description}
//                    </a></p>
//            </div>
//        </div>
//    </div>`)

//     })
// }



const addEventListeners = () =>{
    console.log("add event listeners")
    document.getElementById("studio-filters-list").addEventListener('click', (event) => {
        if (event.target.type === "checkbox") {
            console.log("hit checkbox")
            //clear button is disabled, enable it         
            if(document.getElementById("clear-btn").disabled){
                document.getElementById("clear-btn").disabled = false

                return
            }
            const filterCheckboxes = document.querySelectorAll("input[class='studio-filters-options']:checked")
            console.log(filterCheckboxes)
            //diabled clear if theres no more checked checkboxes
            if(filterCheckboxes.length ==  0){
                document.getElementById("clear-btn").disabled = true
            }else{
                console.log("theres still checked boxes")
            }             
        }
    })
}


const init = () => {
    addEventListeners()
    showPreviousCheckedItems()
}

init()




// <% if(location != null){%>
//     <% if(Array.isArray(location))%>
//     <% location.forEach(item => { %>
//         <% if(item == "North"){ %>
//         <input class="location-filter" type="checkbox" value="North" name="location" checked>North
//         <%}%>
//     <%})%>
//     <%}else{%>
//         <% if(item == "North"){ %>
//             <input class="location-filter" type="checkbox" value="North" name="location" checked>North
//             <%}%>
//     <%}%>
// <%}else{%>
//     <input class="location-filter" type="checkbox" value="North" name="location">North
// <%}%>
