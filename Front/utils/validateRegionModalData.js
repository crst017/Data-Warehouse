const validateUserFormData = ( ) => {
    
    const name = document.querySelector('#name').value;
    const errorMsgs = document.querySelectorAll('.error-msg');
    errorMsgs.forEach( msg => msg.classList.add('hidden'));

    let validatedData = true;
    const fieldsToValidate = { 'name' : name }

    for (const field in fieldsToValidate) {
        if (!fieldsToValidate[field]) {
            document.querySelector(`.error-msg.${field}`).classList.remove('hidden');
            validatedData = false;
        }
    }

    if( validatedData) return { name } 
}

export default validateUserFormData;