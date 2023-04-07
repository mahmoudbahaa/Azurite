import { Options as SequelizeOptions } from "sequelize";

import ConfigurationBase from "../common/ConfigurationBase";
import { StoreDestinationArray } from "../common/persistence/IExtentStore";
import { DEFAULT_SQL_OPTIONS } from "../common/utils/constants";
import {
  DEFAULT_DATA_LAKE_PERSISTENCE_ARRAY,
  DEFAULT_ENABLE_ACCESS_LOG,
  DEFAULT_ENABLE_DEBUG_LOG
} from "./utils/constants";
import {
  DEFAULT_DATA_LAKE_LISTENING_PORT,
  DEFAULT_DATA_LAKE_SERVER_HOST_NAME
} from "./utils/constants";

/**
 * The configuration for the server based on sql database.
 *
 * @export
 * @class SqlDataLakeConfiguration
 * @extends {ConfigurationBase}
 */
export default class SqlDataLakeConfiguration extends ConfigurationBase {
  public constructor(
    host: string = DEFAULT_DATA_LAKE_SERVER_HOST_NAME,
    port: number = DEFAULT_DATA_LAKE_LISTENING_PORT,
    public readonly sqlURL: string,
    public readonly sequelizeOptions: SequelizeOptions = DEFAULT_SQL_OPTIONS,
    public readonly persistenceArray: StoreDestinationArray = DEFAULT_DATA_LAKE_PERSISTENCE_ARRAY,
    enableAccessLog: boolean = DEFAULT_ENABLE_ACCESS_LOG,
    accessLogWriteStream?: NodeJS.WritableStream,
    enableDebugLog: boolean = DEFAULT_ENABLE_DEBUG_LOG,
    debugLogFilePath?: string,
    loose: boolean = false,
    skipApiVersionCheck: boolean = false,
    cert: string = "",
    key: string = "",
    pwd: string = "",
    oauth?: string,
    disableProductStyleUrl: boolean = false,
    clearDB: boolean = false
  ) {
    super(
      host,
      port,
      enableAccessLog,
      accessLogWriteStream,
      enableDebugLog,
      debugLogFilePath,
      loose,
      skipApiVersionCheck,
      cert,
      key,
      pwd,
      oauth,
      disableProductStyleUrl,
      clearDB
    );
  }
}
