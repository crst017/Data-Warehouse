import getToken from './getToken.js';

const API = 'http://localhost:3000/user';
const allUsers = 's';
const userID = '/';
const newUser = '/register';

const headers = {
    'Authorization' : `Bearer ${getToken()}`
}

const getAllUsers = async () => {
    try {
        const response = await axios.get( API + allUsers , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const createUser = async ( data ) => {
    try {   
        const response = await axios.post( API + newUser , data , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const editUser = async ( data ) => {
    try {
        const response = await axios.put( API + `/${data.userID}` , data , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const getUser = async (id) => {
    try {  
        const response = await axios.get( API + `/${id}` , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

export default { getAllUsers , createUser , editUser , getUser }