# Interactive Registration Form
In this project, I have created an interactive registration form for a FullStack conference.

This project was created with HTML, CSS and Javascript.

## Conditions that must be met for the sign up field validations

All validations are done using regular expressions on the spot. Event listeners are binded on keyup, allowing to provide live feedback on the values entered.

### Name
The name field must consist of at least 2 words (separated by a whitespace). It cannot contain numbers or special characters. Also, it cannot be empty.

### Email
The email follows the regular validation rules, in the format of x@y.z. It cannot be empty or atypical.

### Activities
After the first interaction, we check if at least one activity has been selected. Also, we disable all other activities that are on the same time that a chosen activity occurs. If an activity is unchecked, all the activities that were disabled because of it become unchecked.

### Credit card number
The credit card number is a stream of 13-16 digits and cannot be empty nor contain letters. If the user enters a letter, they receive a specific error message, else they receive a generic message about the overall desired formatting of the field. 

### ZIP
The ZIP code requirements in this project where that the ZIP code is a 5-digit input. Thus, only numbers are allowed. However, it is understandable that this is not always the case so the error message and the regular expression will need to be modified accordingly if the code is used otherwise.

### CVV
Abiding by the global standards for the CVV field, it needs to be a 3-digit input. It cannot be empty or contain letters. If the user enters a letter, they receive a specific error message, else they receive a generic message about the overall desired formatting of the field. 

## Notes

1. To enhance the accessibility of the form, we have added focus states for the activity checkboxes of the form. This assists greatly for tab navigation. 

2. The available t-shirt colors are dynamically filtered and displayed based on the user's selection on the Design dropdown.

3. 
