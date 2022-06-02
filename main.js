let contactForm = document.querySelector("#contact-form")

contactForm.onsubmit = function(event) {
    // stopping the default behaviour of form submission
    event.preventDefault()

    // clear all the error messages
    let errMsgDiv = document.querySelector('#contact-form .error-msgs')
    errMsgDiv.innerHTML = ''

    // clear the success msg
    let successMsgElement = document.querySelector('.success-msg')
    successMsgElement.innerText = ''

    // do validation
    let errMsgs = []

    let nameFieldElement = document.querySelector('#fullname')
    if (nameFieldElement.value === "") {
        errMsgs.push("Name must not be empty")
    }

    // validate the email field
    let emailFieldElement = document.querySelector('#email')
    if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailFieldElement.value)) {
        errMsgs.push("Email is invalid")
    }

    // validate the message field
    let messageFieldElement = document.querySelector('#message')
    let messageWordsArr = messageFieldElement.value.split(' ') //delimiter
    if (messageWordsArr.length < 3) {
        errMsgs.push('Message must have at least 3 words')
    }

    // if there is any err,
    // -> put the err-msgs class to block and append all the errors as <li>
    if (errMsgs.length != 0) {
        errMsgDiv.style.display = 'block'

        errMsgs.forEach(item => {
            let errMsgLi = document.createElement('li')
            errMsgLi.innerText = item
            errMsgDiv.append(errMsgLi)
        })

        // return here to prevent form submission
        return
    }

    // if validation is successful, here maybe will:
    // - send email
    // - store in DB
    // - etc

    // clear the form fields
    nameFieldElement.value = ''
    emailFieldElement.value = ''
    messageFieldElement.value = ''

    // display a message: Thank you for your submission, we have received your message
    successMsgElement.innerText = 'Thank you for your submission, we have received your message'

    console.log("form is submitted")
}