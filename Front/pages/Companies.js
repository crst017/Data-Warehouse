import company from '../utils/handleCompanies.js';
import city from '../utils/handleCities.js';
import capitalize from '../utils/capitalize.js';
import configAlerts from '../utils/configAlerts.js';
import setCompanyFormData from '../utils/setCompanyFormData.js';

import createCompanyModal from '../templates/CreateCompanyModal.js';

const Companies = async () => {

    const response = await company.getAllCompanies();
    const cities = await city.getAll();

    const openModal = (e) => {     
        
        const h2 = document.querySelector('.title-modal');

        if (e.target.tagName === 'BUTTON') {
            h2.textContent = "Nueva compañia";
            setCompanyFormData();
        } 
        else h2.textContent = "Modificar compañia";

        const modal = document.querySelector('.modal-user');
        modal.classList.add('visible');
        const closeModalButton = document.querySelector('.close-modal');
        closeModalButton.onclick = () => modal.classList.remove('visible');
    };

    const editCompany = async (e) => {
        const companyID = e.target.parentNode.parentNode.id; // Same id as row id (company id)
        document.querySelector('.title-modal').id = companyID; // Passing the id using the title
        
        const companyInfo = await company.getCompany(companyID);
        // const cityID = await city.get(companyInfo.data.)
        setCompanyFormData(companyInfo.data);
        openModal(e);
    };

    const deleteCompany = async (e) => {
        const companyID = e.target.parentNode.parentNode.id;

        Swal.fire( configAlerts.deleteAlert )
            .then( async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await company.deleteCompany(companyID);
                        response.status !== 405 ?
                            configAlerts.modifyConfirm( 'compañia' , 'eliminado') :
                            configAlerts.modifyError( 'compañia' , 'eliminar' , response.data.sqlMessage ); // Send string with error info
                    } catch (error) {
                        configAlerts.modifyError( 'compañia' , 'eliminado');
                    }
                }
            })
    };

    const createEdit = () => {
        const modifyCompanyButton = document.createElement('span');
        modifyCompanyButton.classList.add('icon-mode_edit');
        return modifyCompanyButton;
    };

    const createDelete = () => {
        const deleteCompanyButton = document.createElement('span');
        deleteCompanyButton.classList.add('icon-delete');
        return deleteCompanyButton;
    }

    const view = `
        <div class="title-content">
            <h2>Compañias</h2>
        </div>
        <section class="table">
            <div class="table-header company g-0 p-0">
                <span class="">Nombre<span class="icon-exchange"></span></span>
                <span class="">Ciudad<span class="icon-exchange"></span></span>
                <span class="">Direccion<span class="icon-exchange"></span></span>
                <span class="">Email<span class="icon-exchange"></span></span>
                <span class="">Teléfono<span class="icon-exchange"></span></span>
                <span class="actions">Acciones</span>
            </div>
            ${response.data.map( company => `
                <div id=${company.id} class="table-row company g-0 p-0">
                    <span class="">${capitalize(company.name)}</span>
                    <span class="">${capitalize(company.city)}</span>
                    <span class="">${capitalize(company.address)}</span>
                    <span class="">${company.email}</span>
                    <span class="">${company.telephone}</span>
                    <div class="d-flex justify-content-evenly actions">
                        <span class="icon-dots-three-horizontal"></span>
                    </div>
                </div>
                `).join('')
            }
        </section>
    `;
    
    // Create base section including full table
    let section = document.createElement('section');
    section.classList.add('users-table' , 'col-9');
    section.innerHTML = view;
    
    // Create "add new company" button, it opens new company modal on click.
    const createCompanyButton = document.createElement('button');
    createCompanyButton.textContent = 'Agregar compañia';
    createCompanyButton.classList.add('add-button');
    createCompanyButton.onclick = openModal;

    // Append "add new company" button and "create company modal" into their position.
    section.children[0].appendChild(createCompanyButton);
    section.appendChild(createCompanyModal(cities.data));

    // Create action buttons and their events
    const numberOfCompanies = section.children[1].children.length;

    for (let i = 1; i < numberOfCompanies ; i++) {

        const actionsContainer = section.children[1].children[i].children[5];

        const editCompanyButton =  createDelete();
        editCompanyButton.onclick = deleteCompany;
        actionsContainer.appendChild(editCompanyButton);

        const modifyCompanyButton = createEdit();
        modifyCompanyButton.onclick = editCompany;
        actionsContainer.appendChild(modifyCompanyButton);    
    };

    return section;
};

export default Companies;