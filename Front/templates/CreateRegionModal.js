import validateRegionModalData from "../utils/validateRegionModalData.js";
import region from "../utils/handleRegions.js";
import country from "../utils/handleCountries.js";
import city from "../utils/handleCities.js";

import configAlerts from "../utils/configAlerts.js";
const CreateRegionModal = () => {

    const validateRequest = ( response , title ) => {
        const method = response.config.method;
        if ( response.status === 201) {
            method === 'put' ? 
                configAlerts.modifyConfirm( title.split(' ')[1] , 'modificada') :
                configAlerts.modifyConfirm( title.split(' ')[1] , 'creada');
        } else {
            method === 'put' ?
                configAlerts.modifyError( title.split(' ')[1] , 'modificar') :
                configAlerts.modifyError( title.split(' ')[1] , 'crear' , response.data);
        };
        document.querySelector('.modal-user').classList.remove('visible');
    }

    const userAction = async (e) => {

        const title = document.querySelector('.title-modal');
        const action = title.textContent;
        const infoID = title.id.split('-')[0]; 
        const itemID = title.id.split('-')[1];

        const endpoint = action.includes("región") || action.includes("region") ? region  :
                         action.includes("país")   || action.includes("pais")   ? country : city;
        
        e.preventDefault();

        const validatedData = validateRegionModalData();

        if ( validatedData )  {
            let data = validatedData;
            if (action.includes('Nuev')) {
                
                if ( infoID === 'ncountry') data = { ...data , region_id : itemID }  // In this case, the parent ID required for the endpoint;
                if ( infoID === 'ncity')    data = { ...data , country_id : itemID } // In this case, the parent ID required for the endpoint;
                const response = await endpoint.create(data);
                validateRequest( response , action );       
            }
            else {

                data = { ...data , itemID }
                const response = await endpoint.edit(data);
                validateRequest( response , action );
            }
        }
    }

    const modal = `
        <div class="modal-head">
            <h2 class="title-modal">Nuevo usuario</h2>
            <a class="close-modal icon-close" href="#region-city"></a>
        </div>

        <form action="" class="modal-cont">
            <section class="form-header">
                <div>
                    <label for="name">Nombre<span class="red-asterisk">*</span></label> 
                    <input type="text" name="name" id="name" >
                    <span class="error-msg name hidden">Este campo es obligatorio</span>
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

    const button = divModal.children[1].children[1].children[0].children[0];
    button.onclick = userAction;

    return divModal
}

export default CreateRegionModal