import validateRegionModalData from "../utils/validateRegionModalData.js";
import region from "../utils/handleRegions.js";
import configAlerts from "../utils/configAlerts.js";

const CreateRegionModal = ( buttonText ) => {

    const validateRequest = ( response ) => {
        const method = response.config.method;
        if ( response.status === 201) {
            method === 'put' ? 
                configAlerts.modifyConfirm( 'región' , 'modificada') :
                configAlerts.modifyConfirm( 'región' , 'creada');
        } else {
            method === 'put' ?
                configAlerts.modifyError( 'región' , 'modificar') :
                configAlerts.modifyError( 'región' , 'eliminar');
        };
        document.querySelector('.modal-user').classList.remove('visible');
    }

    const userAction = async (e) => {

        e.preventDefault();
        const validatedData = validateRegionModalData();
        if ( validatedData )  {

            let data = validatedData;
            const response = await region.createRegion(data);
            validateRequest( response );       
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