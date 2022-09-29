import fastify from 'fastify';

export default function createServer()  {
    const app = fastify();
    return app;
}

//export default  const createServer = () => {
//     const app = fastify();
//     return app;
// }

