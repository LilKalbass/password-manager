import createServer from './utils/createServer';
import logger from './utils/logger';
import {FastifyInstance} from 'fastify';
import {disconnectFromDB, connectToDB} from "./utils/db";

// const shutdownApp = (signal: string, app: FastifyInstance) => {
//     // process.on(signal,  async () => {
//     //     logger.info(`Goodbye, got signal ${signal}`);
//     //
//     //     app.close()
//     //
//     //     await disconnectFromDB();
//     //
//     //     logger.info("My work here is done");
//     //
//     //     process.exit(0);
//     // });
//     // disconnectFromDB
//     process.on(signal,() => {
//         logger.info(`Goodbye, got signal ${signal}`);
//         app.close()
//         // if(!app.close()) {await disconnectFromDB}
//         // if(!app.close()){disconnectFromDB()}
//         {/*await*/} disconnectFromDB()
//
//         logger.info("My work here is done");
//         process.exit(0);
//     })
// }

function shutdownApp(signal: string, app: FastifyInstance) {
    process.on(signal, async () => {
        logger.info(`Goodbye, got signal ${signal}`);

        app.close();

        await disconnectFromDB();

        logger.info("My work here is done");

        process.exit(0);
    });
}

async function main() {
    const app = createServer();
    const signals = ["SIGTERM", "SIGINT"];

    try {
        const url = await app.listen({port:4000, host:"0.0.0.0"});
        logger.info(`Server is ready at ${url}`);

        await connectToDB();
    } catch (e) {
        logger.error(e);
        // for (let i = 0; i < signals.length; i++) {
        //     shutdownApp(signals[i], app);
        // }
        process.exit(1);
    }

    for (let i = 0; i < signals.length; i++) {
        shutdownApp(signals[i], app);
    }
}

// const main = () => {
//     const app = createServer();
//     const signals = ["SIGTERM","SIGINT"];
//
//     app.listen({port:4000, host:"0.0.0.0"}, (err, address) => {
//         logger.info(`Server is rdy at ${address}`)
//         for (let i = 0; i < signals.length; i++) {
//             shutdownApp(signals[i], app);
//             logger.info(`Goodbye, got signal ${signals}`);
//
//         }
//         if (err) {
//             logger.error(err)
//             process.exit(1)
//         }
//     })
//
//     // for (let i = 0; i < signals.length; i++) {
//     //     shutdownApp(signals[i], app);
//     // }
// }

main();