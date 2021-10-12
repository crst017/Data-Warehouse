const validateUserFormData = ( ) => {
    
    const name = document.querySelector('#name').value;
    const lastname = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const role = document.querySelector('#role').value;
    const password = document.querySelector('#password').value;
    const confirmPasword = document.querySelector('#confirm-password').value;

    const errorMsgs = document.querySelectorAll('.error-msg');
    errorMsgs.forEach( msg => msg.classList.add('hidden'));

    let validatedData = true;
    const fieldsToValidate = { 'name' : name, 'lastname' : lastname, 'email' : email, 'password' : password, 'confirm-password' : confirmPasword }

    for (const field in fieldsToValidate) {
        
        if (!fieldsToValidate[field]) {
            document.querySelector(`.error-msg.${field}`).classList.remove('hidden');
            validatedData = false;
        }
    }

    if (password !== confirmPasword) {  
        const msg = document.querySelector('.error-msg.confirm-password');
        msg.textContent = 'Las contraseñas no coinciden';
        msg.classList.remove('hidden');
        validatedData = false
    }

    if( validatedData) return { name , lastname , email , role , password }
}

export default validateUserFormData;