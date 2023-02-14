export function getBodyPayload(bodyParams: Record<string, unknown>): Record<string, unknown> {
  const modelParams = {};
  for (const param in bodyParams) {
    modelParams[param] = bodyParams[param];
  }
  return modelParams;
}
