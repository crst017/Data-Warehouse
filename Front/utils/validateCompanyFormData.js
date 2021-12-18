const validateCompanyFormData = () => {

    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#email').value;
    const telephone = document.querySelector('#telephone').value;
    const city = document.querySelector('#city').value;

    const errorMsgs = document.querySelectorAll('.error-msg');
    errorMsgs.forEach( msg => msg.classList.add('hidden'));

    let validatedData = true;
    const fieldsToValidate = { 
        'name' : name, 
        'address' : address, 
        'email' : email, 
        'telephone' : telephone, 
        'city' : city 
    };

    for (const field in fieldsToValidate) {
        if (!fieldsToValidate[field]) {
            document.querySelector(`.error-msg.${field}`).classList.remove('hidden');
            validatedData = false;
        }
    };

    if( validatedData) return { name , address , email, telephone, 'city_id' : city }
}

export default validateCompanyFormData;