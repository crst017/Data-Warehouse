const getToken = () => sessionStorage.getItem('token') || null;    

export default getToken;