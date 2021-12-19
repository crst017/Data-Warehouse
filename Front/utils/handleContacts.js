import getToken from './getToken.js';

const API = 'http://localhost:3000/contact';
const allContacts = 's';

const handleContacts = {

    getAll : async () => {
        try {
            const headers = getToken();
            const response = await axios.get( API + allContacts , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    create : async ( data ) => {
        try {
            const headers = getToken();   
            const response = await axios.post( API , data , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    edit : async ( data ) => {
        try {
            const headers = getToken();
            const response = await axios.put( API  + `/${data.itemID}` , data , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    get : async ( id ) => {
        try {
            const headers = getToken();  
            const response = await axios.get( API  + `/${id}` , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },
    
    delete : async ( id ) => {
        try {
            const headers = getToken(); 
            const response = await axios.delete( API  + `/${id}` , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    },

    search : async ( word ) => {
        try {
            const headers = getToken(); 
            const response = await axios.get( 'http://localhost:3000/search'  + `/${word}` , { headers } );
            return response
        } catch ( error ) {
            return error.response;       
        }
    }
}

export default handleContacts;