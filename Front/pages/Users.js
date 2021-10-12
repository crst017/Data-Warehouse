import user from '../utils/handleUsers.js';
import CreateUser from '../templates/CreateUser.js';
import setUserFormData from '../utils/setUserFormData.js'

const Users = async () => {
    
    const response = await user.getAllUsers();
    let section = document.createElement('section');
    section.classList.add('users-table' , 'col-9');

    const editUser = async (e) => {
        const userID = e.target.parentNode.parentNode.id; // Same id as row id (user id)
        document.querySelector('.title-modal').id = userID; // Passing the id using the title
        
        const userInfo = await user.getUser(userID);
        setUserFormData(userInfo.data);
        openModal(e);
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

    const view = `
            <div class=title-content>
                <h2 class="">Usuarios</h2>
            </div>
            <section class="table">
            <div class="table-header row g-0 p-0">
                <span class="col">Nombre</span>
                <span class="col">E-mail</span>
                <span class="col">Rol</span>
                <div class="col text-center actions">Acciones</div>
            </div>
            ${response.data.map( user => `
                <div id=${user.id} class="table-row row g-0 p-0">
                    <span class="col">${user.fullname}</span>
                    <span class="col">${user.email}</span>
                    <span class="col">${user.role}</span>
                    <div class="col d-flex justify-content-evenly actions">
                        <span class="icon-dots-three-horizontal"></span>
                        <span id="delete" class="icon-delete"></span>
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
        const modifyUserButton = createEdit();
        modifyUserButton.onclick = editUser;
        section.children[1].children[i].children[3].appendChild(modifyUserButton)
    }

    return section
}

export default Users;