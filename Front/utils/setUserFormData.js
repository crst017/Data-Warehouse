const setUserFormData = ( userInfo = '' ) => {

    let name , lastname;
    if (userInfo) {
        name = userInfo.fullname.split(' ')[0];
        lastname = userInfo.fullname.split(' ')[1];
    }

    document.querySelector('#name').value = name || '';
    document.querySelector('#lastname').value = lastname || '';
    document.querySelector('#email').value = userInfo.email || '';
    document.querySelector('#role').value = userInfo.role || ''
    
    document.querySelector('#password').value = '';
    document.querySelector('#confirm-password').value = '';
    
}

export default setUserFormData