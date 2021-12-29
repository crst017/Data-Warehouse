import capitalize from '../utils/capitalize.js';
import validateCompanyFormData from '../utils/validateCompanyFormData.js';
import company from '../utils/handleCompanies.js';
import configAlerts from '../utils/configAlerts.js';

const createCompanyModal = ( cities ) => {

    const validateRequest = ( response ) => {
        const method = response.config.method;
        if ( response.status === 201) {
            method === 'put' ? 
                configAlerts.modifyConfirm( 'compañia' , 'modificada') :
                configAlerts.modifyConfirm( 'compañia' , 'creada');
        } else {
            method === 'put' ?
                configAlerts.modifyError( 'compañia' , 'modificar') :
                configAlerts.modifyError( 'compañia' , 'eliminar');
        };
        document.querySelector('.modal-user').classList.remove('visible');
    };

    const saveChanges = async (e) => {

        let title = e.target.previousElementSibling.children[0];
        const action = title.textContent;
        const companyID = title.id;

        e.preventDefault();
        const validatedData = validateCompanyFormData();
        
        if ( validatedData )  {
            
            let data = {
                    'name' : capitalize(validatedData.name),
                    'address' : capitalize(validatedData.address),
                    'email' : validatedData.email,
                    'telephone' : validatedData.telephone,
                    'city_id' : validatedData.city_id
            }

            let response;
            if (action === "Nueva compañia") {
                response = await company.createCompany(data);
                validateRequest( response );
            }
            else {
                data = { ...data , companyID }
                response = await company.editCompany(data);
                validateRequest( response );
            }    
        }
    };

    const modal = `
        <div class="modal-head">
            <h2 class="title-modal">Nuevo usuario</h2>
            <a class="close-modal icon-close" href="#companies"></a>
        </div>

        <form action="" class="modal-cont">
            <section class="form-header row-5">
                <div >
                    <label for="name">Nombre<span class="red-asterisk">*</span></label> 
                    <input type="text" name="name" id="name" >
                    <span class="error-msg name hidden">Este campo es obligatorio</span>
                </div>
                <div>
                    <label for="address">Dirección<span class="red-asterisk">*</span></label> 
                    <input type="text" name="address" id="address" >
                    <span class="error-msg address hidden">Este campo es obligatorio</span>
                </div>
                <div>
                    <label for="email">Email<span class="red-asterisk">*</span></label> 
                    <input type="text" name="email" id="email" >
                    <span class="error-msg email hidden">Este campo es obligatorio</span>
                </div>
                <div>
                    <label for="telephone">Telefono<span class="red-asterisk">*</span></label> 
                    <input type="text" name="telephone" id="telephone" >
                    <span class="error-msg telephone hidden">Este campo es obligatorio</span>
                </div>
                
                <div>
                    <label for="city">Ciudad<span class="red-asterisk">*</span></label>
                    <select name="city" id="city">
                        <option value="" selected disabled></option>
                    ${cities.map( city => `
                        <option value="${city.id}">${capitalize(city.name)}</option>
                    `)}
                    </select>
                    <span class="error-msg city hidden">Seleccione una ciudad</span>
                </div>

            </section>

            <section class="form-content">
                <div class="modal-buttons">
                    <button type="submit" id="create-region" class="save">Guardar elemento</button>  
                </div>
            </section>
        </form> 
    `;

    const divModal = document.createElement('div');
    divModal.classList.add('modal-user');
    divModal.setAttribute('id','modal-user');
    
    divModal.innerHTML = modal;

    const form = divModal.children[1];
    form.addEventListener( "submit" , saveChanges )

    return divModal;
}

export default  createCompanyModal