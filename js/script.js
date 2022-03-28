/**
 * Constant declarations
 */
const nameField=document.getElementById('name');
const emailField=document.getElementById('email');
const designSelector=document.getElementById('design');
const colorSelector=document.getElementById('color');
const cardNumber=document.getElementById('cc-num');
const zip=document.getElementById('zip');
const cvv=document.getElementById('cvv');
const jobTitleDropdown=document.getElementById('title');
const otherJobRole=document.getElementById('other-job-role');
const activityCheckboxes=document.querySelectorAll('#activities input[type="checkbox"]');
const availableActivities=document.getElementById('activities');
const paymentChoices=document.getElementById('payment');
const methodIDs=['credit-card','paypal','bitcoin'];
const paymentOptions=[];

let totalCost=0;
let price=0;

//Hide the other field of the job dropdown
otherJobRole.style.display="none";

//set focus on the Name input field
nameField.focus();

//Disable the color selector until a design is picked
colorSelector.disabled=true;

//Selects by default Credit card as the payment method
document.querySelector('#payment option[value="credit-card"]').selected=true;

//a collection of all the payment options option fields
methodIDs.forEach(item=>{
    paymentOptions.push(document.getElementById(`${item}`));
});

//hides the sections referring to the other payment methods
changeDisplay(paymentOptions,'id','credit-card');



/**
 * Changes the display property of the given items
 * @param {array} items an array of items whose display property we want to change 
 * @param {String} attribute the attribute we will use to decide on the value of the display property
 * @param {String} category the value against which we are comparing the attribute
 */
function changeDisplay(items,attribute,category){
    items.forEach(element => {
        if(element.getAttribute(attribute)!==category){
            element.style.display='none';
        }
        else{
            element.style.display='';
        }
    });
}

/**
 * A function to scroll to the location of the first error encountered on submission
 * @param {Element} element the element that had an error on validation and we want to scroll to 
 */
function scrollToError(element){
    element.scrollIntoView({
        behavior: 'smooth'
    });
}

/**
 * Check if a checkbox was checked and if any other activities happen at the same time. If so, it disables the checkboxes. Else, in the case that a checkbox is unchecked
 * we remove the disabled restriction and class from all the elements that were on the same time
 * @param {Element} checkbox the checkbox on which the event occured 
 */
function checkAndDisable(checkbox){
    if(checkbox.checked){
        activityCheckboxes.forEach(element=>{
            if (element.getAttribute('data-day-and-time')===checkbox.getAttribute('data-day-and-time') && element!==checkbox){
                element.disabled=true;
                element.parentElement.classList.add('disabled');
            }
        });
    }else{
        activityCheckboxes.forEach(element=>{
            if (element.getAttribute('data-day-and-time')===checkbox.getAttribute('data-day-and-time')){
                element.disabled=false;
                element.parentElement.classList.remove('disabled');
            }
        });
    }
}  

/**
 * Validator functions
 */

/**
 * validateName: Validates the name field.
 * @returns {boolean} if the string passes validation
 */
function validateName(){
    const regex=/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
    let bool=regex.test(nameField.value);
    showError(nameField,bool);
    return bool;
}

/**
 * Validates the Email field
 * @returns {boolean} if the email was successfully validated
 */
function validateEmail(){
    const regex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let bool=regex.test(emailField.value);
    showError(emailField,bool);
    return bool;
}

/**
 * Validates the card number field. Shows a custom message if we try to add letters in the field.
 * @returns {boolean} whether the field was validated successfully (13-16 digits)
 */

function validateCardNumber(){
    const regex=/^\d{13,16}$/;
    let bool=regex.test(cardNumber.value);
    if(!bool){
        if(/[a-zA-z]+/.test(cardNumber.value)){
            console.log('here');
            showError(cardNumber,bool,'The card number cannot contain letters.');
        }
        else{
            showError(cardNumber,bool,'Credit card number must be between 13 - 16 digits');
        }
    }else{
        showError(cardNumber,bool);
    }
    return bool;
}

/**
 * Validates the ZIP code field (5 digits)
 * @returns {boolean} whether the zip code field was successfully validated
 */

function validateZip(){
    const regex=/^\d{5}$/;
    let bool=regex.test(zip.value);
    showError(zip,bool);
    return bool;
}

/**
 * Validates the cvv field (3 digits). Shows a custom message if we try to add letters in the field.
 * @returns {boolean} whether the field was validated successfully (3 digits)
 */

function validateCvv(){
    const regex=/^\d{3}$/;
    let bool=regex.test(cvv.value);
    if(!bool){
        if(/[a-zA-z]+/.test(cvv.value)){
            console.log('here');
            showError(cvv,bool,'The ZIP code cannot contain letters.');
        }
        else{
            showError(cvv,bool,'CVV must be 3 digits');
        }
    }else{
        showError(cvv,bool);
    }
    return bool;
}

/**
 * After the first submission or change in the field (user interaction), it checks if at least one activity has been selected
 * @returns {boolean} if at least one activity is selected, it returns true, else, it returns false
 */
function validateActivities(){
    for(let i=0; i<activityCheckboxes.length;i++){
        if(activityCheckboxes[i].checked){
            showError(activityCheckboxes[i].parentElement.parentElement,true);
            return true;
        }
        else{
            showError(activityCheckboxes[i].parentElement.parentElement,false);
        }
    }
    return false;
}

/**
 * Displays the relevant error when a field is subjected to validation (no matter if it passes or fails)
 * @param {Element} element the element that was subjected to validation 
 * @param {boolean} bool if the validation was successfull or not
 * @param {String} customMsg to cater the needs of custom validation messages for the cardNumber and CVV fields, we add an optional custom message field
 */

function showError(element,bool,customMsg=null){
    if(!bool){
        element.parentElement.classList.add('not-valid');
        element.parentElement.classList.remove('valid');
        element.parentElement.lastElementChild.style.display= "inherit";
        if(customMsg!==null){
            element.parentElement.lastElementChild.textContent=customMsg;
        }
    }else{
        element.parentElement.classList.add('valid');
        element.parentElement.classList.remove('not-valid');
        element.parentElement.lastElementChild.style.display= "none";
    }
}



/**
 * Event Listeners  for the fields
 */

nameField.addEventListener('keyup',e=>{
    validateName();
});

emailField.addEventListener('keyup',e=>{
    validateEmail();
});

cardNumber.addEventListener('keyup',e=>{
    validateCardNumber();
});

zip.addEventListener('keyup',e=>{
    validateZip();
});

cvv.addEventListener('keyup',e=>{
    validateCvv();
});

/**
 * The event listener for the job title field, displays the other option when other is clicked and hides and clears all input when something else is chosen
 */
jobTitleDropdown.addEventListener('change', e=>{
    if(e.target.tagName==='SELECT' && e.target.value==='other'){
        otherJobRole.style.display='';
    }else{
        otherJobRole.style.display='none';
        if (otherJobRole.value!==""){
            otherJobRole.value='';
        }
    }
});

/**
 * Removes the disabled restriction from the color field and displays only the eligible ones based on the design choice
 */
designSelector.addEventListener('change',e=>{
    colorSelector.disabled=false;
    const options=document.querySelectorAll('#color option');
    changeDisplay(options,'data-theme',e.target.value);
    document.querySelector('#color option:nth-child(1)').selected=true;
});

/**
 * When an activity is checked or unchecked, the function adds or removes its price from the total cost accordingly.
 */
availableActivities.addEventListener('change',e=>{
    if(e.target.tagName==='INPUT'){
        price=parseInt(e.target.getAttribute('data-cost'));
        if(e.target.checked===true){
            totalCost+=price;
        }else{
            totalCost-=price;
        }
        document.getElementById('activities-cost').textContent=`Total: $${totalCost}`;
    }
});

/**
 * Event listener for the payment options dropdown that hides the relevant divs of the other payment options accordingly
 */
paymentChoices.addEventListener('change',e=>{
    changeDisplay(paymentOptions,'id',e.target.value);
});

/**
 * Form submission event listener. Performs a one-by-one validation of the fields and stops the moment it encounters an issue with validation. If an issue is encountered, 
 * submission is prevented and the view scrolls to the field that has the error.
 */
document.querySelector('form').addEventListener('submit',e=>{
    if(!validateName()){
        e.preventDefault();
        scrollToError(nameField.parentElement);
        return false;
    }else if(!validateEmail()){
        e.preventDefault();
        scrollToError(emailField.parentElement);
        return false;
    }else if(!validateActivities()){
        e.preventDefault();
        scrollToError(availableActivities);
        return false;
    }
    if(paymentChoices.value==='credit-card'){
        if(!validateCardNumber()){
            e.preventDefault();
            scrollToError(cardNumber.parentElement);
            return false;
        }else if(!validateZip()){
            e.preventDefault();
            scrollToError(zip.parentElement);
            return false;
        }else if(!validateCvv()){
            e.preventDefault();
            scrollToError(cvv.parentElement);
            return false;
        }
    }
    return true;
});

/**
 * Loops in checkboxes and adds 3 event listeners, 2 related to focus/blur and one related to the changes.
 */
activityCheckboxes.forEach(activity=>{
    //on focus, add the focus class to the checkbox
    activity.addEventListener('focus',e=>{
        e.target.parentElement.classList.add('focus');
    });
    //on blur, remove the focus class from the element's classList
    activity.addEventListener('blur',e=>{
        e.target.parentElement.classList.remove('focus');
    });

    //trigger 2 validations when a checkbox is checked/unchecked: whether there is at least one activity selected and if any other activities happen at the same time.
    activity.addEventListener('change',(e)=>{validateActivities();
    checkAndDisable(e.target);});
});

