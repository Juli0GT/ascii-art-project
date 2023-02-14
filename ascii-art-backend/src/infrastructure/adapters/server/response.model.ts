'use strict';

import httpStatusCodes from 'http-status-codes';
import AgencyResponse from '../../../domain/definitions/agencyResponse';

type Payload = {
  result: {
    code: string;
    message: string;
    requestId: string;
    errors?: string[];
  },
  data?: unknown;
  extra?: unknown;
}

type ExtraParams = { data?: unknown; extra?: unknown; errors?: string[] };

export default class APIResponse {
  public statusCode: number;
  public internalCode: string;
  public requestId: string;
  public message: string;
  public data: unknown;
  public extra: unknown;
  public errors: string[];

  constructor(response: AgencyResponse, requestId: string, extra: ExtraParams = {}) {
    this.statusCode = response.statusCode ?? httpStatusCodes.INTERNAL_SERVER_ERROR;
    this.internalCode = response.code ?? `${this.statusCode}00`,
    this.requestId = requestId;
    this.message = response.message;
    this.data = extra.data;
    this.extra = extra.extra;
    this.errors = extra.errors ?? [];
  }

  build(): Payload {
    const response: Payload = {
      result: {
        code: this.internalCode,
        message: this.message,
        requestId: this.requestId,
      },
      data: this.data,
      extra: this.extra,
    };
    if (this.errors.length > 0) {
      response.result.errors = this.errors;
    }
    return response;
  }
}
