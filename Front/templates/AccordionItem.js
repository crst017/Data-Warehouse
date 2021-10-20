import region from '../utils/handleRegions.js'
import configAlerts from '../utils/configAlerts.js';

const AccordionItem = ( item , openModal) => {

    const deleteUser = async (e) => {

        const regionID = e.target.parentNode.parentNode.parentNode.id;

        Swal.fire( configAlerts.deleteAlert )
            .then( async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await region.deleteRegion(regionID);
                        response.status !== 405 ?
                            configAlerts.modifyConfirm( 'region' , 'eliminado') :
                            configAlerts.modifyError( 'region' , 'eliminar');
                    } catch (error) {
                        configAlerts.modifyError( 'region' , 'eliminar');
                    }
                }
            })
    }

    const editUser = async (e) => {
        const regionID = e.target.parentNode.parentNode.parentNode.id; // Same id as row id (user id)
        document.querySelector('.title-modal').id = regionID; // Passing the id using the title
        
        const regionInfo = await region.getRegion(regionID);
        const name = document.querySelector('#name');
        name.value = regionInfo.data.name;
        openModal(e,'region'); // The endpoint is accesed through modal button. See CreateRegionModal.js
    }

    const createEdit = () => {
        const modifyUserButton = document.createElement('span');
        modifyUserButton.classList.add('icon-mode_edit');
        modifyUserButton.onclick = editUser;
        return modifyUserButton;
    }

    const createDelete = () => {
        const deleteUserButton = document.createElement('span');
        deleteUserButton.classList.add('icon-delete');
        deleteUserButton.onclick = deleteUser;
        return deleteUserButton;
    }

    const view = `
        <h2 class="accordion-header d-flex" id="panelsStayOpen-headingOne" key="${item.id}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${item.id}" 
                aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                ${item.name}
                
            </button>
            <div class="actions">
                <span class="icon-dots-three-horizontal"></span>
            </div>
        </h2>
        <div id="panelsStayOpen-collapse${item.id}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div class="accordion-body w-75">
            <strong>This is the first item's accordion body.</strong></div>
        </div>
    `;

    const itemDiv = document.createElement('div');
    itemDiv.id = item.id;
    itemDiv.key = item.id;
    itemDiv.classList.add('accordion-item');

    itemDiv.innerHTML = view;

    const actionsDiv = itemDiv.children[0].children[1];
    actionsDiv.appendChild(createDelete());
    actionsDiv.appendChild(createEdit());

    return itemDiv;
}

export default AccordionItem