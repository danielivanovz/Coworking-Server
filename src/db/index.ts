import { MongoClient, Db, Collection } from "mongodb";
import log from "../logger";
import env from "../env";

interface MongoOptions {
  readonly useUnifiedTopology: boolean;
  readonly ignoreUndefined?: boolean;
}

const options: MongoOptions = {
  useUnifiedTopology: true,
  ignoreUndefined: true,
};

const mongoURI: string = env.getDBUri();

export const establishConnection = async (dbName: string) => {
  const client = new MongoClient(mongoURI, options);
  try {
    console.log(dbName);

    const connected = await client
      .connect()
      .finally(() =>
        log.info("Connection to the database established - status: " + client["topology"].s.state)
      );

    console.log();

    db = connected.db(dbName);

  } catch (error) {
    log.error;
  }

  return client;
};

export let db: Db;

