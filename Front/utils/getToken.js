const getToken = () => {
    
    const token = sessionStorage.getItem('token') || null;

    const header = {
        'Authorization' : `Bearer ${token}`
    }
    
    return header
}


export default getToken;