import capitalize from "../utils/capitalize.js";
import user from '../utils/handleUsers.js';
import validateUserFormData from "../utils/validateUserFormData.js";
import configAlerts from '../utils/configAlerts.js';

const CreateUser = () => {

    const validateRequest = ( response ) => {
        const method = response.config.method;
        if ( response.status === 201) {
            method === 'put' ? 
                configAlerts.modifyConfirm( 'usuario' , 'modificado') :
                configAlerts.modifyConfirm( 'usuario' , 'creado');
        } else {
            method === 'put' ?
                configAlerts.modifyError( 'usuario' , 'modificar') :
                configAlerts.modifyError( 'usuario' , 'eliminar');
        };
        document.querySelector('.modal-user').classList.remove('visible');
    }

    const userAction = async (e) => {

        console.log(e.target)
        let title = e.target.previousElementSibling.children[0];
        const action = title.textContent;
        const userID = title.id;

        e.preventDefault();
        const validatedData = validateUserFormData();
        
        if ( validatedData )  {

            let data = {
                    'username' : validatedData.name + ' ' + validatedData.lastname,
                    'fullname' : capitalize(validatedData.name) + ' ' + capitalize(validatedData.lastname),
                    'email' : validatedData.email,
                    'password' : validatedData.password,
                    'role' : capitalize(validatedData.role)
            }

            let response;
            if (action === "Nuevo usuario") {
                response = await user.createUser(data);
                validateRequest( response );
            }
            else {
                data = { ...data , userID }
                response = await user.editUser(data);
                validateRequest( response );
            }    
        }
    }

    const modal = `
        <div class="modal-head">
            <h2 class="title-modal">Nuevo usuario</h2>
            <a class="close-modal icon-close users" href="#users"></a>
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
                    <button type="submit" id="create-user" class="save">Guardar usuario</button>  
                </div>
            </section>
        </form>
    `;

    const divModal = document.createElement('div');
    divModal.classList.add('modal-user');
    divModal.setAttribute('id','modal-user');
    divModal.innerHTML = modal;

    const form = divModal.children[1];
    form.addEventListener( "submit" , userAction )

    return divModal;
}

export default CreateUser