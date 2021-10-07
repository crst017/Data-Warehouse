import Header from '../templates/Header.js';
import LogIn from '../pages/LogIn.js';
import Home from '../pages/Home.js';

import getHash from '../utils/getHash.js';

const routes = {
    '/': LogIn,
    'home': Home,
    // '/:id': Character,
    // '/contact': 'Contact'
}

const router = async () => {

    const header = null || document.querySelector('header');
    const content = null || document.querySelector('.content');
    content.innerHTML = null;

    header.innerHTML = Header().outerHTML;  // 
    let route = getHash();
    let render = routes[route] ? routes[route] : console.log("nelson");
    render = await render();

    typeof(render) === 'string' ? 
        content.innerHTML = render :    // Render returns a string ... Just html
        content.appendChild(render);    // Render returns an object ... Html with binded events
}

export default router;