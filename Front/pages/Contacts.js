import contact from '../utils/handleContacts.js';
import capitalize from '../utils/capitalize.js';
import configAlerts from '../utils/configAlerts.js';

import createContactModal from '../templates/CreateContactModal.js';

const Contacts = async () => {

    const contacts = await contact.getAll();

    const search = async (e) => {
        
        if ( e.type === "click" || e.keyCode === 13 ) {

            const value = section.children[1].children[0].children[0].value;
            const searchResults = await contact.search( value );
            console.log(searchResults.data);
        }
    };

    const openModal = (e) => {     
        
        const h2 = document.querySelector('.title-modal');

        if (e.target.tagName === 'BUTTON') {
            h2.textContent = "Nuevo contacto";
            // setCompanyFormData();
        } 
        else h2.textContent = "Modificar contacto";

        const modal = document.querySelector('.modal-user');
        modal.classList.add('visible');
        const closeModalButton = document.querySelector('.close-modal');
        closeModalButton.onclick = () => modal.classList.remove('visible');
    };

    const editContact = async (e) => {
        const contactID = e.target.parentNode.parentNode.id; // Same id as row id (contact id)
        // document.querySelector('.title-modal').id = contactID; // Passing the id using the title
        
        const contactInfo = await contact.get(contactID);
        // setContactFormData(contactInfo.data);
        openModal(e);
    };

    const deleteContact = async (e) => {
        const contactID = e.target.parentNode.parentNode.id;

        Swal.fire( configAlerts.deleteAlert )
            .then( async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await contact.delete(contactID);
                        response.status !== 405 ?
                            configAlerts.modifyConfirm( 'contacto' , 'eliminado') :
                            configAlerts.modifyError( 'contacto' , 'eliminar' , response.data.sqlMessage ); // Send string with error info
                    } catch (error) {
                        configAlerts.modifyError( 'contacto' , 'eliminado');
                    }
                }
            })
    };

    const createEdit = () => {
        const editContactButton = document.createElement('span');
        editContactButton.classList.add('icon-mode_edit');
        editContactButton.onclick = editContact;
        return editContactButton;
    };

    const createDelete = () => {
        const deleteContactButton = document.createElement('span');
        deleteContactButton.classList.add('icon-delete');
        deleteContactButton.onclick = deleteContact;
        return deleteContactButton;
    }

    const view = `
        
        <div class="title-content contacts">
            <h2 class="">Contactos</h2>
        </div>
        <div class="d-flex justify-content-between">
            <div class="search-container">
                <input type="text" name="search" id="search">
            </div>
        </div>
        <section class="table contact">
            <div class="table-header contact g-0 p-0">
                <input type="checkbox" id="checkbox-header" name="checkbox-header" value="" class="checkbox"disabled >
                <span class="">Contacto<span class="icon-exchange"></span></span>
                <span class="">Pais/Región<span class="icon-exchange"></span></span>
                <span class="">Compañia<span class="icon-exchange"></span></span>
                <span class="">Cargo<span class="icon-exchange"></span></span>
                <span class="">Interés<span class="icon-exchange"></span></span>
                <span class="actions">Acciones</span>
            </div>
            ${contacts.data.map( contact => `
                <div id=${contact.id} class="table-row contact g-0 p-0">
                    <input type="checkbox" id="contact-${contact.id}" class="checkbox" name="contact-${contact.id}" value="${contact.id}">
                    
                    <div class="contact-info">
                        <span class="icon-person"></span>
                        <div class="name-email">
                            <span class="">${capitalize(contact.first_name) + ' ' + capitalize(contact.last_name)}</span>
                            <span class="contact-email">${contact.email}</span>
                        </div>                    
                    </div>
                    
                    <div class="contact-region">
                        <span class="">${capitalize(contact.country)}</span>
                        <span class="contact-region">${capitalize(contact.region)}</span>                
                    </div>
                    
                    <span class="">${capitalize(contact.company)}</span>
                    <span class="">${capitalize(contact.work_position)}</span>
                    
                    <div class="interest">
                        <span class="percentage">${contact.interest}%</span>
                        <div class="bar-bg">
                            <div class="progress-${contact.interest}"></div>
                        </div>
                    </div>
                    
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

    // Create search button
    const searchButton = document.createElement('span');
    searchButton.classList.add('icon-search');
    section.children[1].children[0].appendChild(searchButton);

    // Attach search button onclick and input on enter keypress
    const input = section.children[1].children[0].children[0];
    input.onkeypress = search;
    searchButton.onclick = search;
    
    // Create "add new contact" button, it opens new contact modal on click.
    const createContactButton = document.createElement('button');
    createContactButton.textContent = 'Agregar contacto';
    createContactButton.classList.add('add-button');
    createContactButton.onclick = openModal;


    // Append "add new contact" button and "create contact modal" into their position.
    section.children[1].appendChild(createContactButton);
    section.appendChild(createContactModal());

    const numberOfContacts = section.children[2].children.length;

    for (let i = 1; i < numberOfContacts ; i++) {

        const actionsContainer = section.children[2].children[i].children[6];

        const deleteCompanyButton =  createDelete();
        actionsContainer.appendChild(deleteCompanyButton);

        const editCompanyButton = createEdit();
        actionsContainer.appendChild(editCompanyButton);    
    };

    return section;
} 

export default Contacts;