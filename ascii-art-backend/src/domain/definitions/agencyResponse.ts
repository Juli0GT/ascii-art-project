type AgencyResponseParams = {
  code: string;
  statusCode: number;
  message: string;
}

export default class AgencyResponse {
  public code: string;
  public statusCode: number;
  public message: string;

  constructor(response: AgencyResponseParams) {
    this.code = response.code;
    this.statusCode = response.statusCode;
    this.message = response.message;
  }
}
