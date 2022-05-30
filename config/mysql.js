const dotenv = require('dotenv');
const mysql = require("mysql2/promise");
dotenv.config(); 

const connect = {
    init: function() {          // #2
        return mysql.createPool({
            host: '34.64.173.255',
            user: 'cc',
            password: 'password',
            database: 'SSPT'
        });
    }
};

module.exports = connect ; 