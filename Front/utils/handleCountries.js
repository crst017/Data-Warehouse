import getToken from './getToken.js';

const API = 'http://localhost:3000/countr';
const singleCountry = 'y';
const allCountries = 'ies';


const handleCountries = {

    getAll : async () => {
        try {
            const headers = getToken();
            const response = await axios.get( API + allCountries , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    create : async ( data ) => {
        try {
            const headers = getToken();   
            const response = await axios.post( API + singleCountry, data , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    edit : async ( data ) => {
        try {
            const headers = getToken();
            const response = await axios.put( API + singleCountry + `/${data.itemID}` , data , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    get : async ( id ) => {
        try {
            const headers = getToken();  
            const response = await axios.get( API + singleCountry + `/${id}` , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    delete : async ( id ) => {
        try {
            const headers = getToken(); 
            const response = await axios.delete( API + singleCountry + `/${id}` , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    }
}

export default handleCountries