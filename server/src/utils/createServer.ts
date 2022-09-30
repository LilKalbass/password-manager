import fastify, {FastifyReply, FastifyRequest} from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import {Cors_Origin} from '../constants';

import fs from 'fs'
import path from 'path';
import cookie from '@fastify/cookie';

import userRoutes from '../modules/user/user.route';
import vaultRoutes from '../modules/vault/vault.route';

export default function createServer()  {
    const app = fastify();

    app.register(cors, {
        origin: Cors_Origin,
        credentials: true,
    })

    app.register(jwt, {
        secret: {
            private: fs.readFileSync(`${(path.join(process.cwd()), "certs")}/private.key`),
            public: fs.readFileSync(`${(path.join(process.cwd()), "certs")}/public.key`)
        },
        sign: {algorithm: "RS256"},
        cookie: {
            cookieName: "token",
            signed: false
        }
    });

    app.register(cookie, {
        parseOptions: {}
    });

    app.decorate("authentificate", async (request: FastifyRequest, reply: FastifyReply)=> {
        try {
            const user = await request.jwtVerify<{
                _id: string;
            }>();
            request.user = user;
        } catch (c) {
            return reply.send(c);
        }
    })

    app.register(userRoutes, {prefix: "api/users"});
    app.register(vaultRoutes, {prefix: "api/users"});

    return app;
}

//export default  const createServer = () => {
//     const app = fastify();
//     return app;
// }

