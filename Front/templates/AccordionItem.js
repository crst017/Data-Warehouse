import region from '../utils/handleRegions.js';
import country from '../utils/handleCountries.js';
import city from '../utils/handleCities.js';

import configAlerts from '../utils/configAlerts.js';

const AccordionItem = ( item , openModal , itemCategory ) => {

    itemCategory = itemCategory.toLowerCase();

    const endpoint = itemCategory === "region"  ? region  :
                     itemCategory === "country" ? country : city;

    const title = itemCategory === "region"  ? "región" :
                  itemCategory === "country" ? "país"   : "ciudad";

    const deleteItem = async ( e ) => {

        const categoryID = e.target.parentNode.parentNode.parentNode.id;

        Swal.fire( configAlerts.deleteAlert )
            .then( async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await endpoint.delete( categoryID );
                        response.status !== 405 ?
                            configAlerts.modifyConfirm( title , 'eliminado') :
                            configAlerts.modifyError( title , 'eliminar' , response.data.sqlMessage ); // Send string with error info
                    } catch (error) {
                        configAlerts.modifyError( title , 'eliminar');
                    }
                }
            })
    }

    const editItem = async ( e ) => {

        const categoryID = e.target.parentNode.parentNode.parentNode.id; // Same id as row id (user id)
        document.querySelector('.title-modal').id = title + "-" + categoryID; // Passing the id using the title

        const categoryInfo = await endpoint.get( categoryID );
        const name = document.querySelector('#name');
        name.value = categoryInfo.data.name;
        openModal( e , title ); // The endpoint is accesed through modal button. See CreateRegionModal.js
    }

    const createEdit = () => {
        const modifyUserButton = document.createElement('span');
        modifyUserButton.classList.add('icon-mode_edit');
        modifyUserButton.onclick = editItem;
        return modifyUserButton;
    }

    const createDelete = () => {
        const deleteUserButton = document.createElement('span');
        deleteUserButton.classList.add('icon-delete');
        deleteUserButton.onclick = deleteItem;
        return deleteUserButton;
    }

    const view = `
        <h2 class="accordion-header d-flex" id="panelsStayOpen-headingOne" key="${item.id + itemCategory}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${itemCategory + item.id}" 
                aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                ${item.name}
            </button>
            <div class="actions">
                <span class="icon-dots-three-horizontal"></span>
            </div>
        </h2>
        <div id="panelsStayOpen-collapse${itemCategory + item.id}" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
            <div class="accordion-body">
            </div>
        </div>
    `;

    const viewCity = `
        <h2 class="accordion-header d-flex" id="panelsStayOpen-headingOne" key="${item.id + itemCategory}">
            <button class="accordion-button rm-button" type="button">
                ${item.name}
            </button>
            <div class="actions rm-button">
                <span class="icon-dots-three-horizontal"></span>
            </div>
        </h2>
    `;

    const itemDiv = document.createElement('div');
    itemDiv.id = item.id;
    itemDiv.key = item.id;
    itemDiv.classList.add('accordion-item');

    itemDiv.innerHTML = itemCategory === 'city' ? viewCity : view;

    const actionsDiv = itemDiv.children[0].children[1];
    actionsDiv.appendChild(createDelete());
    actionsDiv.appendChild(createEdit());

    return itemDiv;
}

export default AccordionItem