const getHash = () => {

    const token = sessionStorage.getItem('token') || null;

    if ( !token ) window.location.hash = ''
    const hash = location.hash.slice(1).toLocaleLowerCase().split('/')[0] || '/';
     
    return hash
}

export default getHash;