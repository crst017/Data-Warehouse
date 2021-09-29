import loginUser from '../utils/loginUser.js';

const LogIn = async () => {

    const login =  async (e) => {

        e.preventDefault();
        const username = document.querySelector('#inputUsername').value;
        const password = document.querySelector('#inputPassword').value;
        const response = await loginUser( {username, password});

        response.status !== 200 ? console.log("swal de mal"+ response.data) : console.log("swal de bien"+ response.data);

    }

    let form = document.createElement('form');
    form.classList.add("card" , "p-4" , "mt-3" ,"col-4");

    form.innerHTML = `
        <div class="mb-3">
            <label for="inputUsername" class="form-label">Username</label>
            <input type="text" class="form-control" id="inputUsername" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="inputPassword">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>    
    `;
   
    form.addEventListener( 'submit' , login );
    return form;
};

export default LogIn
