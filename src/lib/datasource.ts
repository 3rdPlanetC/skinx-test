import { DataSource, DataSourceOptions } from 'typeorm'
import config from '../config'
import { Post } from '../../src/app/repository/entities/post.entity'
// import { Tag } from '../../src/app/repository/entities/tag.entity'
// import { PostTag } from '../app/repository/entities/post_tag.entity'

export const dataSourceConfig = {
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: config.database.host,
    port: parseInt(config.database.port),
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    entities: [Post],
    migrations: ['./src/migrations/**/*{.ts,.js}'],
} as DataSourceOptions

export const dataSource = new DataSource(dataSourceConfig)
export default dataSource


