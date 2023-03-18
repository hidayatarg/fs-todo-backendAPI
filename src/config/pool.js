const Pool = require ('pg').Pool;
const pool = new Pool({        
      user     : 'postgres',        
      host     : 'localhost',        
      database : 'todo',        
      password : 'example',        
      port     : 5432,    
});

pool.on('connect', () => {
      console.log('connected to the Database');
});

module.exports = pool;