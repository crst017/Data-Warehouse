const API = 'http://localhost:3000/user/login';

const logIn = async( username , password ) => {

    try {
        const response = await axios.post( API , { username , password } );
        return response
    } catch ( error ) {
        return error.response;       
    }
}

export default logIn;