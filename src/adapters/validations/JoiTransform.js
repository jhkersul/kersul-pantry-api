export function transformJoiToErrorDetails(error) {
  return error.details.map((errorDetail) => ({
    target: errorDetail.path.join('.'),
    message: errorDetail.message,
  }));
}
