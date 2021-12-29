import capitalize from "../utils/capitalize.js";
import contact from '../utils/handleContacts.js';
import company from '../utils/handleCompanies.js'
import region from "../utils/handleRegions.js";
import country from "../utils/handleCountries.js";
import city from "../utils/handleCities.js";

// import validateContactFormData from "../utils/validateContactFormData.js";
import configAlerts from '../utils/configAlerts.js';

const CreateContactModal = () => {

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

    const createCompanyOptions = async () => {

        const companies = await company.getAllCompanies();
        const input = document.querySelector('select#company');

        companies.data.map( company => createOption( input, company ));
        manageSlider();
    }

    const createRegionOptions = async () => {

        const regions = await region.getAll();
        const inputRegion = document.querySelector('select#region');
        const inputCountry = document.querySelector('select#country');

        inputRegion.onchange = () => createSelectOptions("region","country");
        inputCountry.onchange = () => createSelectOptions("country","city");

        regions.data.map( region => createOption( inputRegion, region ));
    }

    const createSelectOptions = async ( parent , child ) => {

        const element = parent === "region" ? country : city;

        const selectParent = document.querySelector(`select#${parent}`);
        const parentID = selectParent.value;
        const children = await element.getByParent( parentID );

        const options = document.querySelectorAll(`select#${child}>*`);

        options.forEach( (option, index) => {
            if ( index !== 0 ) option.remove();
        });

        const input = document.querySelector(`select#${child}`);
        children.data.map( child => createOption( input, child ));
        if ( parent === "region" ) document.querySelector('select#city').value = "";
        input.value = "";
    }

    const createOption = ( parent , child ) => {

        const option = document.createElement('option');
        option.value = child.id;
        option.textContent = capitalize(child.name);
        parent.appendChild(option);
    }

    const manageSlider = () => {

        const input = document.querySelector('.slider');
        const interest = document.querySelector('#interest-percentage');

        const updateInput = () => {
            interest.textContent = input.value + "%";
            input.style.setProperty("--value", input.value);
            input.className = '';
            input.classList.add('slider', 'progress-' + input.value);
        }
        
        updateInput();
        input.oninput = updateInput;   
    }

    const modal = `
        <div class="modal-head">
            <h2 class="title-modal">Nuevo usuario</h2>
            <a class="close-modal icon-close" href="#home"></a>
        </div>

        <form action="" class="modal-cont">
            <section class="form-header row-5">
                <div >
                    <label for="name">Nombre<span class="red-asterisk">*</span></label> 
                    <input type="text" name="name" id="name" >
                    <span class="error-msg name hidden">Este campo es obligatorio</span>
                </div>
                <div>
                    <label for="last-name">Apellido<span class="red-asterisk">*</span></label> 
                    <input type="text" name="last-name" id="last-name" >
                    <span class="error-msg last-name hidden">Este campo es obligatorio</span>
                </div>
                <div>
                    <label for="work-position">Cargo<span class="red-asterisk">*</span></label> 
                    <input type="text" name="work-position" id="work-position" >
                    <span class="error-msg work-position hidden">Este campo es obligatorio</span>
                </div>
                <div>
                    <label for="email">Email<span class="red-asterisk">*</span></label> 
                    <input type="text" name="email" id="email" >
                    <span class="error-msg email hidden">Este campo es obligatorio</span>
                </div>
                
                <div>
                    <label for="company">Compañia<span class="red-asterisk">*</span></label>
                    <select name="company" id="company">
                        <option id="empty-company" value="" selected disabled></option>
                    </select>
                    <span class="error-msg company hidden">Seleccione una compañia</span>
                </div>

            </section>

            <section class="form-content contact">

                <section class="location row-5-19">
                    <div>
                        <label for="region">Región<span class="red-asterisk">*</span></label>
                        <select name="region" id="region">
                            <option id="empty-region" value="" selected disabled></option>
                        </select>
                        <span class="error-msg region hidden">Seleccione una región</span>
                    </div>

                    <div>
                        <label for="country">País<span class="red-asterisk">*</span></label>
                        <select name="country" id="country">
                            <option id="empty-country" value="" selected disabled></option>
                        </select>
                        <span class="error-msg country hidden">Seleccione un país</span>
                    </div>

                    <div>
                        <label for="city">Ciudad<span class="red-asterisk">*</span></label>
                        <select name="city" id="city">
                            <option id="empty-city" value="" selected disabled></option>
                        </select>
                        <span class="error-msg city hidden">Seleccione una ciudad</span>
                    </div>

                    <div>
                        <label for="address">Dirección<span class="red-asterisk">*</span></label>
                        <input type="text" name="address" id="address" >
                        <span class="error-msg address hidden">Este campo es obligatorio</span>
                    </div>

                    <div>
                        <label for="interest">Interés<span class="red-asterisk"></span></label>
                        <div class="slider-container">
                            <input type="range" name="interest" min="0" max="100" step="25" class="slider" id="slider">
                            <span id="interest-percentage"></span>
                        </div>   
                    </div>

                </section>

                <div class="modal-buttons contact">
                    <button type="submit" id="create-region" class="save">Guardar contacto</button>  
                </div>

            </section>
        </form> 
    `;

    const divModal = document.createElement('div');
    divModal.classList.add('modal-user');
    divModal.setAttribute('id','modal-user');
    divModal.innerHTML = modal;

    const form = divModal.children[1];
    form.addEventListener( "submit" , userAction );
    createCompanyOptions();
    createRegionOptions();
    
    return divModal;
}

export default CreateContactModal