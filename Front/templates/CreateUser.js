import capitalize from "../utils/capitalize.js";
import user from '../utils/handleUsers.js';

const CreateUser = () => {
    
    const createNewUser = async (e) => {

        e.preventDefault();

        const name = capitalize(document.querySelector('#name').value);
        const lastname = capitalize(document.querySelector('#lastname').value);
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
        
        if ( validatedData )  {

            const data = {
                'username' : name + ' ' + lastname,
                'fullname' : name + ' ' + lastname,
                'email' : email,
                'password' : password,
                'role' : role
            }

            const response = await user.createUser(data);
            console.log(response)
            if ( response.status === 201) {
                
                document.querySelector('.modal-user').classList.remove('visible');
            }
            
        }
    }

    const modal = `
        <div class="modal-head">
            <h2>Nuevo usuario</h2>
            <a class="close-modal" href="#users">X</a>
        </div>

        <form action="" class="modal-cont">
            <section class="form-header">
                <div>
                    <label for="name">Nombre<span class="red-asterisk">*</span></label> 
                    <input type="text" name="name" id="name" >
                    <span class="error-msg name hidden">Este campo es obligatorio</span>
                </div>
                
                <div>
                    <label for="lastname">Apellido<span class="red-asterisk">*</span></label>
                    <input type="text" name="lastname" id="lastname" >
                    <span class="error-msg lastname hidden ">Este campo es obligatorio</span>
                </div>
                
                <div>
                    <label for="email">Email<span class="red-asterisk">*</span></label>
                    <input type="email" name="email" id="email" >
                    <span class="error-msg email hidden">Error en datos ingresados</span>
                </div>
                
                <div>
                    <label for="role">Rol<span class="red-asterisk">*</span></label>
                    <select name="role" id="role">
                        <option value="user" selected>Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                    <span class="error-msg hidden">Sin error</span>
                </div>
            </section>

            <section class="form-content">
                <div>
                    <label for="password">Contraseña<span class="red-asterisk">*</span></label>
                    <input type="password" name="password" id="password" >
                    <span class="error-msg password hidden">Este campo es obligatorio</span>
                </div>

                <div>
                    <label for="confirm-password">Repetir contraseña<span class="red-asterisk">*</span></label>
                    <input type="password" name="confirm-password" id="confirm-password" >
                    <span class="error-msg confirm-password hidden">Este campo es obligatorio</span>
                </div>

                <div class="modal-buttons">
                <button id="create-user" class="save">Guardar usuario</button>  
                </div>
            </section>
        </form>
    `;

    const divModal = document.createElement('div');
    divModal.classList.add('modal-user');
    divModal.setAttribute('id','modal-user');
    divModal.innerHTML = modal;

    const form = divModal.children[1];
    form.addEventListener( "submit" , createNewUser )

    return divModal;
}

export default CreateUser