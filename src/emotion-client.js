import config from 'config';
import request from 'request';

import emotions from './emotions';
import log from './logger';

const emotionService = config.get('services.emotion');
const options = {
  url: emotionService.url,
  method: 'POST',
  json: true,
  headers: {
    'Ocp-Apim-Subscription-Key': emotionService.apiKey,
    'Content-Type': 'application/json'
  }
};

const call = (imageUrl, callback) => {
  const requestParams = {
    body: {
      url: imageUrl
    },
    ...options
  };

  log.info({ requestParams } , 'Calling emotion recognition service');
  request.post(requestParams, (err, response) => {
    if (err) {
      log.error(err);
      // response.statusCode
      return callback(err);
    }

    log.debug({ response }, 'Emption recognition API response');

    const emotionsByFace = response.body.map((face) => {
      const winningEmotion = Object.keys(face.scores).reduce((winner, candidate) => {
        const candidateScore = face.scores[candidate];
        if (candidateScore > winner.score) {
          return { emotion: candidate, score: candidateScore };
        }
        return winner;
      }, { emotion: '', score: 0 });

      return {
        faceRectangle: face.faceRectangle,
        ...winningEmotion
      };
    });

    callback(null, emotionsByFace);
  });
};

export {
  call
};
