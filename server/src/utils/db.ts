import mongoose from 'mongoose';
import {DB_Connection} from '../constants';
import logger from './logger';

export async function connectToDB() {
    try {
        await mongoose.connect(DB_Connection);
    } catch (c) {
        logger.error(c, "Error, while connecting to DB");
        process.exit(1);
    }
}

export async function disconnectFromDB() {
    await mongoose.connection.close();

    logger.info("Disconnected from DB")
    return
}

// export const connectToDB = () => {
//     try {
//         mongoose.connect(DB_Connection);
//     } catch (c) {
//         logger.error(c, "Error, while connecting to DB");
//         process.exit(1);
//     }
// }
//
// export const disconnectFromDB = () => {
//     mongoose.connection.close(() => {
//         logger.info("Disconnected from DB");
//         return;
//     })
// }