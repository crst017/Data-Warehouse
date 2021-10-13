const Header = () => {
    
    let nav = document.createElement('nav');
    nav.classList.add("justify-content-between" , "px-5");

    const logout = () => {
        sessionStorage.clear()
        location.reload();
    }
    
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
        </ul>
    `;

    const token = sessionStorage.getItem('token');
    // token ? 
    //     nav.innerHTML = logo + menu :
    //     nav.innerHTML = logo;
    
    if ( token ) {

        nav.innerHTML = logo + menu

        const logoutButton = document.createElement('li');
        logoutButton.innerHTML = '<a class="" href="#">Salir</a>';
        logoutButton.classList.add('nav-item','li-logout')
        logoutButton.onclick = logout;
        nav.children[1].appendChild(logoutButton);
        
    } else {
        nav.innerHTML = logo;
    }

    try {
        const role = jwt_decode(token).role;
        if ( role !== 'admin') {
            const userItem = nav.children[1].children[2];
            userItem.classList.add('d-none')
        }
    } catch (error) {}
    
    return nav;
}

export default Header;