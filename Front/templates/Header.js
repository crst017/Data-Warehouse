const Header = () => {
    
    let nav = document.createElement('nav');
    nav.classList.add("justify-content-between" , "px-5");

    const logo = `
    <span class="navbar-brand">LOGO</span>  
    `;
    
    const menu = `
        <ul class="navbar-nav d-flex flex-row g-0">
            <li class="nav-item">
                <a class="" href="#contacts">Contactos</a>
            </li>
            <li class="nav-item">
                <a class="" href="#companies">Compañias</a>
            </li>
            <li class="nav-item li-users">
                <a class="" href="#users">Usuarios</a>
            </li>
            <li class="nav-item li-regions">
                <a class="" href="#regions">Region / Ciudad</a>
            </li>
            <li class="nav-item li-logout">
                <a class="" href="#">Salir</a>
            </li>
        </ul>
    `;

    sessionStorage.getItem('token') ? 
        nav.innerHTML = logo + menu :
        nav.innerHTML = logo; 

    return nav;
}

export default Header;