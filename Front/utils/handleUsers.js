import getToken from './getToken.js';

const API = 'http://localhost:3000/user';
const allUsers = 's';
const userID = '/:id';
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
        console.log(data)
        console.log(headers)
        const response = await axios.post( API + newUser , data , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

export default { getAllUsers , createUser }