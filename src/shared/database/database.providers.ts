import { DataSource } from "typeorm";
import ormConfig from "../../config/ormconfig";

export const AppDataSource = new DataSource(ormConfig);

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      return AppDataSource;
    },
  },
];
