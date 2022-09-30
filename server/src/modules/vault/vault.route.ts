import {FastifyInstance, FastifyPluginOptions, FastifyError} from 'fastify';

export default function vaultRoutes(app:FastifyInstance, _: FastifyPluginOptions, done: (err?: FastifyError) => void) {
    done();
}

