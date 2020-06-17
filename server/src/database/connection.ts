import knex from 'knex';
import path from 'path';

const connection = knex({
    //mudar pra SQLSERVER, SÓ VER A DOCUMENTAÇÃO
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    }
})

export default connection;