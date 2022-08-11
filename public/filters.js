console.log("filters script working")
const checkedItems = {
    location: [],
    amenities: [],
    activities: []
    }
const clearFilters = (filterClassName) => {
    console.log("clear button working")
   const filterCheckboxes = document.getElementsByClassName(filterClassName)
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
const storeLocationValues = () => {
    const checkedValues = document.querySelectorAll("input[name='location']:checked")
    if(checkedValues.length >  0){
        checkedValues.forEach(item =>{
            checkedItems.location.push(item.value)
            console.log(item.value)
           })
           console.log("theres checked boxes")
           
    }else{
        console.log("theres no checked boxes")
    }    
    console.log(checkedItems)

    //invoke the submit   
    // let filterForm = document.getElementById("location-filter-form")
    // filterForm.submit()
    fetchDataAsync ("http://localhost:3000/studios", options)       
}

// const showPreviousCheckedItems = (checkedItems) => {
//     //each item is the value that was sent to the req.body
//     checkedItems.location.forEach(item =>{
//         document.querySelector(`input[value=${item}]`).checked
//     })

//     checkedItems.location = []
    
// }

//form must do the post method also
const options = {
    method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            //pass checked items, will be passed as the body
            location: "North",
        })
};

//url shld be /studuios
const fetchDataAsync = async (url, options) => {
    const response = await fetch(url, options)
    const studios = await response.json()
    console.log("log in front end", studios)
    document.getElementById("class-list").classList.add("hidden")
    studios.forEach(item =>{
        document.getElementById("class-list-section").appendChild(          
       `<div class="col card w-75 mx-auto">
       <div class=" d-flex">
           <div class="studio-item-img"><a href="/studios/${item._id}">
           <img src="${item.img}" class="card-img-top"></a>
           </div>
           <div class="card-body studio-item-details">
               <p class="card-text">
               ${item.name}
                   </a></p>
           </div>
           <div class="card-body studio-item-description">
               <p class="card-text">
               ${item.description}
                   </a></p>
           </div>
       </div>
   </div>`)

    })
}



const addEventListeners = () =>{
    console.log("add event listeners")
    document.getElementById("location-filter-list").addEventListener('click', (event) => {
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
// showPreviousCheckedItems()



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
