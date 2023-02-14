import definitions from './definitions';
import { version } from './../../../../package.json';

export default {
  swagger: '2.0',
  info: {
    version,
    title: 'ASCII art API',
  },
  basePath: '/',
  schemes: [
    'http',
    'https',
  ],
  paths: {
    '/uploads': {
      post: {
        operationId: 'createUpload',
        'x-swagger-router-controller': 'upload.entrypoint',
        description: 'Creates an upload',
        parameters: [
          {
            name: 'data',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              required: [
                'file',
                'miliseconds',
              ],
              properties: {
                file: {
                  description: 'Text file containing ASCII art.',
                  type: 'string',
                  example: 'ThisIsAsCIIarT',
                },
                miliseconds: {
                  description: 'Time interval in miliseconds, between every printed line of the file',
                  type: 'string',
                  example: '300',
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Upload created successfully',
            schema: {
              $ref: '#/definitions/uploadResponse',
            },
          },
          400: {
            description: 'Bad request',
            schema: {
              $ref: '#/definitions/apiResult',
            },
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/apiResult',
            },
          },
        },
      },
    },
  },
  definitions,
};
