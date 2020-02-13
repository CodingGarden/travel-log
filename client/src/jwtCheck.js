const jwt = require('jsonwebtoken');

const verify = (token, callback, error) => {
    jwt.verify(token, process.env.REACT_APP_API_KEY, (err, decoded) => {
        if (err) {        
            error("Error verify JWT token");          
        } else {
            callback(decoded);
        }
    });
}

module.exports = verify;