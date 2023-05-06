enum dialects {
    mysql = 'mysql',
    postgres = 'postgres',
    sqlite = 'sqlite',
    mariadb = 'mariadb',
    mssql = 'mssql',
    db2 = 'db2',
    snowflake = 'snowflake',
    oracle = 'oracle',
}

const DatabaseConfig =  {
    database: 'database',
    username: 'username',
    password: 'password',
    host: 'localhost',
    dialect: dialects.sqlite,
    storage: './database.sqlite'
}

export default DatabaseConfig;