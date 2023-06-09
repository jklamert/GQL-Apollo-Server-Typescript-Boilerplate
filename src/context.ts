import { DataSource } from "./dataSource";
export interface MyContext {
  // Context typing
  listen?: Object;
  token?: String;
  dataSources: {
    api: DataSource;
  };
}
