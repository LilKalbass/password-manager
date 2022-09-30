import {FastifyInstance, FastifyPluginOptions, FastifyError} from 'fastify';

export default function userRoutes(app:FastifyInstance, _: FastifyPluginOptions, done: (err?: FastifyError) => void) {
    done();
}

