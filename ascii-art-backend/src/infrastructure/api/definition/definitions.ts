export default {
  apiResult: {
    type: 'object',
    properties: {
      result: {
        type: 'object',
        properties: {
          code: {
            description: 'The unique code of the response',
            type: 'string',
            example: 'ASCII40001',
          },
          requestId: {
            description: 'The unique identifier for the request',
            type: 'string',
            format: 'uuid',
            example: '8c8ff55c-11f5-4b3c-8596-3d9831a8934d',
          },
          message: {
            description: 'The response message in a human format',
            type: 'string',
            example: 'Request message response',
          },
        },
      },
    },
  },
  upload: {
    type: 'object',
    required: [
      'file',
      'miliseconds',
    ],
    properties: {
      id: {
        description: 'Id of upload',
        type: 'string',
        format: 'uuid',
        example: '8c8ff55c-11f5-4b3c-8596-3d9831a8934d',
      },
      file: {
        description: 'Text file containing ASCII art.',
        type: 'string',
        example: 'ThisIsAsCIIarT',
      },
      miliseconds: {
        description: 'Interval in miliseconds between each printed line of the file.',
        type: 'string',
        example: '300',
      },
    },
  },
  uploadResponse: {
    allOf: [
      {
        $ref: '#/definitions/apiResult',
      },
      {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: '#/definitions/upload',
            },
          },
        },
      },
    ],
  },
};
