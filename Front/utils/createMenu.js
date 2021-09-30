const createMenu = () => {

    const menu = `
        <nav class="navbar navbar-dark bg-primary justify-content-between px-5">
            <span class="navbar-brand">LOGO</span>
            <ul class="navbar-nav d-flex flex-row">
                <li class="nav-item mx-4">
                    <a class="nav-link" href="#">Contactos</a>
                </li>
                <li class="nav-item mx-4">
                    <a class="nav-link" href="#">Compañias</a>
                </li>
                <li class="nav-item mx-4">
                    <a class="nav-link" href="#">Usuarios</a>
                </li>
                <li class="nav-item mx-4">
                    <a class="nav-link" href="#">Region / Ciudad</a>
                </li>
            </ul>
        </nav>
    `;

    const header = document.querySelector('header')
    header.innerHTML = menu;
}

export default createMenu;