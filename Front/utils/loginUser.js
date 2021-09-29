const API = 'http://localhost:3000/user/login';
// import axios from 'axios';

const logIn = async( loginInfo ) => {

    try {
        const response = await axios.post( API , loginInfo );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

export default logIn;