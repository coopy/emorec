import Hapi from 'hapi';
import Boom from 'boom';

import { call as callEmotionService } from './emotion-client';
import log from './logger';

const server = new Hapi.Server();
const port = process.env.PORT || 3000;
server.connection({ port });

server.start(function () {
  log.info('Server running at:', server.info.uri);
});

server.route({
  method: 'POST',
  path: '/image',
  handler: function (request, reply) {
    const imageUrl = request.payload.url;
    log.info(request.payload);

    callEmotionService(imageUrl, (err, emotionsByFace) => {
      if (err) {
        log.error(err);
        return reply(Boom.badImplementation(err));
      }

      reply(emotionsByFace);
    });
  }
});
