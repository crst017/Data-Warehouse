import getToken from './getToken.js';

const API = 'http://localhost:3000/region';
const allUsers = 's';

const getAllRegions = async () => {
    try {
        const headers = getToken();
        const response = await axios.get( API + allUsers , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const createRegion = async ( data ) => {
    try {
        const headers = getToken();   
        const response = await axios.post( API , data , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const editRegion = async ( data ) => {
    try {
        const headers = getToken();
        const response = await axios.put( API + `/${data.regionID}` , data , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const getRegion = async ( id ) => {
    try {
        const headers = getToken();  
        const response = await axios.get( API + `/${id}` , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const deleteRegion = async ( id ) => {
    try {
        const headers = getToken();  
        console.log(id);
        const response = await axios.delete( API + `/${id}` , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

export default { getAllRegions , createRegion, editRegion, getRegion, deleteRegion}