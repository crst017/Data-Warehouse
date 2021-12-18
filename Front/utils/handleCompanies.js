import getToken from './getToken.js';

const API = 'http://localhost:3000/compan';
const baseURL = 'y';
const allCompanies = 'ies';

const getAllCompanies = async () => {
    try {
        const headers = getToken();
        const response = await axios.get( API + allCompanies , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const createCompany = async ( data ) => {
    try {
        const headers = getToken();   
        const response = await axios.post( API + baseURL , data , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const editCompany = async ( data ) => {
    try {
        const headers = getToken();
        const response = await axios.put( API + baseURL + `/${data.companyID}` , data , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const getCompany = async ( id ) => {
    try {
        const headers = getToken();  
        const response = await axios.get( API + baseURL + `/${id}` , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

const deleteCompany = async ( id ) => {
    try {
        const headers = getToken();  
        const response = await axios.delete( API + baseURL + `/${id}` , { headers } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

export default { getAllCompanies , createCompany , editCompany , getCompany , deleteCompany }