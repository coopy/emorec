Emotion Recognition
===================

This micro-service uses the Microsoft Oxford Emotion Recognition service. Given an image URL, it gives back an array of the detected emotions of any faces in that image. The only functionality this service provides over the raw Oxford service is to calculate the _most apparent emotion_ for each face.

Prerequisites
-------------
You'll need an API key by signing up for [Project Oxford](https://www.projectoxford.ai/emotion). The free tier gives you plenty of API call. Once you've gotten your key, export it as the environment variable `OXFORD_EMOTION_API_KEY`.

```sh
$ export OXFORD_EMOTION_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Running the Service
-------------------
```
$ npm install
$ npm start
```

Example service call
--------------------

```
$ curl -v -X POST -H "Content-Type: application/json" -d '{"url":"https://cldup.com/IFDaJogTzT-3000x3000.png"}' "localhost:3000/image"
```

Response:

```
[{"emotion":"happiness","score":0.915759}]
```

Resources
---------
Oxford emotion API example raw response:

```
[
  {
    "faceRectangle": {
      "height": 649,
      "left": 91,
      "top": 231,
      "width": 649
    },
    "scores": {
      "anger": 6.950815E-08,
      "contempt": 7.747893E-09,
      "disgust": 1.02905129E-09,
      "fear": 2.00001614E-06,
      "happiness": 0.915759,
      "neutral": 5.65865776E-06,
      "sadness": 5.42378946E-12,
      "surprise": 0.08423323
    }
  }
]
```
