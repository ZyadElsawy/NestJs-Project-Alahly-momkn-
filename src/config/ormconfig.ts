import { configuration } from "./configuration";
import { DataSourceOptions } from "typeorm";

const ormConfig: DataSourceOptions = {
  type: configuration.database.type as "postgres",
  host: configuration.database.host,
  port: configuration.database.port,
  username: configuration.database.username,
  password: configuration.database.password,
  database: configuration.database.name,
  entities: [configuration.typeorm.entities],
  synchronize: configuration.typeorm.synchronize,
};

export default ormConfig;
