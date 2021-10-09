import user from '../utils/handleUsers.js';
import CreateUser from '../templates/CreateUser.js';

const Users = async () => {
    
    const response = await user.getAllUsers();
    let section = document.createElement('section');
    section.classList.add('users-table' , 'col-9');

    const view = `
            <h2 class="text-center m-5">Usuarios</h2>
            <div class="row g-0 p-0 mb-4">
                <span class="col text-center">Nombre</span>
                <span class="col text-center">E-mail</span>
                <span class="col text-center">Rol</span>
                <div class="col text-center">Acciones</div>
            </div>
            ${response.data.map( user => `
                <div class="row g-0 p-0 mb-4">
                    <span class="col px-3">${user.fullname}</span>
                    <span class="col px-3">${user.email}</span>
                    <span class="col px-3">${user.role}</span>
                    <div class="col px-3 d-flex justify-content-evenly">
                        <span class="edit">Editar</span>
                        <span class="delete">Eliminar</span>
                    </div>
                </div>
                `).join('')
            }
    `;

    section.innerHTML = view;
    const createUserButton = document.createElement('button');
    createUserButton.textContent = 'Crear usuario';
    section.appendChild(createUserButton);
    section.appendChild(CreateUser());

    createUserButton.onclick = () => {    
        const modal = document.querySelector('.modal-user');
        modal.classList.add('visible');

        const closeModalButton = document.querySelector('.close-modal');
        closeModalButton.onclick = () => modal.classList.remove('visible');
    };
    
    return section
}

export default Users;