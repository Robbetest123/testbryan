const knex = require('knex')(
    { 
        client : 'mysql',
        connection : {
            host: 'remotemysql.com',
            port: '3306',
            user: 'zAxsdJFFsp',
            password: 'PNfxfl2cRV',
            database: 'zAxsdJFFsp' 
        }
    });
 
class Database { 
    async  saveTemperature(temp) { 
        console.log(`Temperature: ${temp}`); 
        
        const id = await knex('Temp').insert({
            Date: new Date(),
            Temp_Sensor : temp
        })
    }
 
    async getTemperatures(num){
        const result = await knex('Temp').orderBy('id', 'desc').limit(num)
        return result.reverse();
        }
}
exports.default = new Database()