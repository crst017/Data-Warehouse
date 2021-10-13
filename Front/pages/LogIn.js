import loginUser from '../utils/loginUser.js';
const LogIn = async () => {

    const login =  async (e) => {

        e.preventDefault();
        const username = document.querySelector('#inputUsername').value;
        const password = document.querySelector('#inputPassword').value;
        const response = await loginUser( username, password );
        
        if ( response.status === 200 ) {
            sessionStorage.setItem( 'token' , response.data );
            window.location.hash = 'home';
        }
    }

    let form = document.createElement('form');
    form.classList.add("card" , "p-4" , "mt-3" ,"col-4");

    form.innerHTML = `
        <div class="mb-3">
            <label for="inputUsername" class="form-label">Usuario</label>
            <input type="text" class="form-control" id="inputUsername" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="inputPassword">
        </div>
        <button type="submit" class="btn btn-primary">Ingresar</button>    
    `;
   
    form.addEventListener( 'submit' , login );
    return form
};

export default LogIn
