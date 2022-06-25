const path = require('path')
require('dotenv/config')

function env(key) {
    return process.env[key]
}
const baseConfig = {
    type: env('DB_DIALECT'),
    database: env('DB_DATABASE'),
    entities: [path.join(__dirname, 'dist', 'database', 'entities', '*.entity.js')],
    migrations: [path.join(__dirname, 'migrations', '*.js')],
    logging: true,
    cli: {
        migrationsDir: path.join('migrations'),
    },
    seeds: [path.join(__dirname, 'dist', 'src', 'database', 'seeds', '*.seed{.ts,.js}')],
    factories: [path.join(__dirname, 'dist', 'src', 'database', 'factories', '*.factory{.ts,.js}')],
}

if (process.env.NODE_ENV !== 'test') {
    module.exports = {
        host: env('DB_HOST'),
        port: env('DB_PORT'),
        username: env('DB_USERNAME'),
        password: env('DB_PASSWORD'),
        synchronize: false,
        ...baseConfig,
    }
} else {
    module.exports = {
        dropSchema: false,
        synchronize: false,
        ...baseConfig,
    }
}
