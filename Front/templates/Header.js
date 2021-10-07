const Header = () => {
    
    let nav = document.createElement('nav');
    nav.classList.add("navbar" , "navbar-dark" , "bg-primary" ,"justify-content-between" , "px-5");

    const logo = `
    <span class="navbar-brand">LOGO</span>  
    `;
    
    const menu = `
        <ul class="navbar-nav d-flex flex-row">
            <li class="nav-item mx-4">
                <a class="nav-link" href="#contacts">Contactos</a>
            </li>
            <li class="nav-item mx-4">
                <a class="nav-link" href="#companies">Compañias</a>
            </li>
            <li class="nav-item mx-4">
                <a class="nav-link" href="#users">Usuarios</a>
            </li>
            <li class="nav-item mx-4">
                <a class="nav-link" href="#regions">Region / Ciudad</a>
            </li>
            <li class="nav-item mx-4">
                <a class="nav-link" href="#">Salir</a>
            </li>
        </ul>
    `;

    sessionStorage.getItem('token') ? 
        nav.innerHTML = logo + menu :
        nav.innerHTML = logo; 

    return nav;
}

export default Header;