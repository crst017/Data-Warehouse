import getToken from './getToken.js';

const API = 'http://localhost:3000/cit';
const singleCity = 'y';
const allCities = 'ies';


const handleCities = {

    getAll : async () => {
        try {
            const headers = getToken();
            const response = await axios.get( API + allCities , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    create : async ( data ) => {
        try {
            const headers = getToken();   
            const response = await axios.post( API + singleCity, data , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    edit : async ( data ) => {
        try {
            const headers = getToken();
            const response = await axios.put( API + singleCity + `/${data.itemID}` , data , { headers } );
            console.log(response)
            return response
        } catch ( error ) {
            console.log(error)
            return error.response;       
        }
    },
    
    get : async ( id ) => {
        try {
            const headers = getToken();  
            const response = await axios.get( API + singleCity + `/${id}` , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    delete : async ( id ) => {
        try {
            const headers = getToken();  
            console.log(id);
            const response = await axios.delete( API + singleCity + `/${id}` , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    }
}

export default handleCities