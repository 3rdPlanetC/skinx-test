import { DataSource } from 'typeorm'
import { dataSourceConfig } from "./lib/datasource"

const datasource = new DataSource(dataSourceConfig)
datasource.initialize();
export default datasource