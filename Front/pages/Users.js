import user from '../utils/handleUsers.js';
import CreateUser from '../templates/CreateUser.js';
import setUserFormData from '../utils/setUserFormData.js'
import configAlerts from '../utils/configAlerts.js';

import capitalize from '../utils/capitalize.js';
const Users = async () => {
    
    const response = await user.getAllUsers();
    response.data.forEach( user => {
        user.role = user.role === 'admin' ? 'Administrador' : 'Usuario'
    });
    let section = document.createElement('section');
    section.classList.add('users-table' , 'col-9');

    const editUser = async (e) => {
        const userID = e.target.parentNode.parentNode.id; // Same id as row id (user id)
        document.querySelector('.title-modal').id = userID; // Passing the id using the title
        
        const userInfo = await user.getUser(userID);
        setUserFormData(userInfo.data);
        openModal(e);
    }

    const deleteUser = async (e) => {
        const userID = e.target.parentNode.parentNode.id;

        Swal.fire( configAlerts.deleteAlert )
            .then( async (result) => {
                if (result.isConfirmed) {

                    const response = await user.deleteUser(userID);
                    Swal.fire( configAlerts.deleteConfirm('usuario') )
                        .then(  result => location.reload());    
                }
            })
    }

    const openModal = (e) => {     
        
        const h2 = document.querySelector('.title-modal');

        if (e.target.tagName === 'BUTTON') {
            h2.textContent = "Nuevo usuario";
            setUserFormData();
        } 
        else h2.textContent = "Modificar usuario";

        const modal = document.querySelector('.modal-user');
        modal.classList.add('visible');
        const closeModalButton = document.querySelector('.close-modal');
        closeModalButton.onclick = () => modal.classList.remove('visible');
    }

    const createEdit = () => {
        const modifyUserButton = document.createElement('span');
        modifyUserButton.classList.add('icon-mode_edit');
        return modifyUserButton;
    }

    const createDelete = () => {
        const deleteUserButton = document.createElement('span');
        deleteUserButton.classList.add('icon-delete');
        return deleteUserButton;
    }

    const view = `
            <div class=title-content>
                <h2 class="">Usuarios</h2>
            </div>
            <section class="table">
            <div class="table-header g-0 p-0">
                <span class="">Nombre<span class="icon-exchange"></span></span>
                <span class="">Apellido<span class="icon-exchange"></span></span>
                <span class="">E-mail<span class="icon-exchange"></span></span>
                <span class="">Rol<span class="icon-exchange"></span></span>
                <span class="actions">Acciones</span>
            </div>
            ${response.data.map( user => `
                <div id=${user.id} class="table-row g-0 p-0">
                    <span class="">${capitalize(user.fullname.split(' ')[0])}</span>
                    <span class="">${capitalize(user.fullname.split(' ')[1])}</span>
                    <span class="">${user.email}</span>
                    <span class="">${user.role}</span>
                    <div class="d-flex justify-content-evenly actions">
                        <span class="icon-dots-three-horizontal"></span>
                    </div>
                </div>
                `).join('')
            }
            </section>
    `;
    
    section.innerHTML = view;
    
    const createUserButton = document.createElement('button');
    createUserButton.textContent = 'Agregar usuario';
    createUserButton.classList.add('add-button');
    createUserButton.onclick = openModal;

    section.children[0].insertBefore(createUserButton, section.children[0].children[1]);
    section.appendChild(CreateUser());

    const numberOfUsers = section.children[1].children.length;
    for (let i = 1; i < numberOfUsers; i++) {

        const editUserButton =  createDelete();
        editUserButton.onclick = deleteUser;
        section.children[1].children[i].children[4].appendChild(editUserButton);

        const modifyUserButton = createEdit();
        modifyUserButton.onclick = editUser;
        section.children[1].children[i].children[4].appendChild(modifyUserButton);

    }

    return section
}

export default Users;