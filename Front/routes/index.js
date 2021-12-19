import Header from '../templates/Header.js';
import LogIn from '../pages/LogIn.js';
import Users from '../pages/Users.js';
import RegionCity from '../pages/RegionCity.js';
import Companies from '../pages/Companies.js';
import Contacts from '../pages/Contacts.js';

import getHash from '../utils/getHash.js';

const routes = {
    '/': LogIn,
    'home': Contacts,
    'users': Users,
    'region-city': RegionCity,
    'companies': Companies,
}

const router = async () => {

    const header = null || document.querySelector('header');
    const content = null || document.querySelector('.content');
    content.innerHTML = null;
    header.innerHTML = null;

    header.appendChild(Header());
    let route = getHash();
    let render = routes[route] ? routes[route] : console.log("nelson");
    render = await render();

    typeof(render) === 'string' ? 
        content.innerHTML = render :    // Render returns a string ... Just html
        content.appendChild(render);    // Render returns an object ... Html with binded events
}

export default router;