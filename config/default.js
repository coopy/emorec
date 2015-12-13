module.exports = {
  log: {
    level: 'debug'
  },
  services: {
    emotion: {
      apiKey: process.env.OXFORD_EMOTION_API_KEY,
      url: 'https://api.projectoxford.ai/emotion/v1.0/recognize'
    }
  }
};
