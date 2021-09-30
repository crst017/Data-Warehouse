import Header from '../templates/Header.js';
import LogIn from '../pages/LogIn.js';

// import getHash from '../utils/getHash.js';
// import resolveRoutes from '../utils/resolveRoutes.js';

// const routes = {
//     '/': Home,
//     '/:id': Character,
//     '/contact': 'Contact'
// }

const router = async () => {

    const header = null || document.querySelector('header');
    const content = null || document.querySelector('.content');

    
    header.innerHTML = Header();
    const innerLogin = await LogIn();
    content.appendChild(innerLogin);

    // content.innerHTML = await LogIn();
    // let hash = getHash();
    // let route = await resolveRoutes(hash);
    // let render = routes[route] ? routes[route] : Error404;
    // content.innerHTML = await render();
}

export default router;