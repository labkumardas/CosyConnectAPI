class ResponseStatus {
  constructor() {
    this.statusCodes = {
      OK: { code: 200, message: 'OK' },
      CREATED: { code: 201, message: 'Created' },
      UPDATED: { code: 200, message: 'Updated' },
      BAD_REQUEST: { code: 400, message: 'Bad Request' },
      UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
      FORBIDDEN: { code: 403, message: 'Forbidden' },
      NOT_FOUND: { code: 404, message: 'Not Found' },
      INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
      EXISTING_PHONE_NUMBER: { code: 409, message: 'Phone number already exists' },
      EXISTING_EMAIL: { code: 409, message: 'Emails already exist' },
      EXISTING_USERNAME: { code: 409, message: 'Username already exists' },
      SAME_EMAIL: { code: 409, message: "Can't Update same email, Please change" },
      SAME_PHONE_NUMBER: { code: 409, message: "Can't Update same phone number, Please change" },
      SAME_USERNAME: { code: 409, message: "Can't Update same username, Please change" },
    };
  }

  getStatus(code, customMessage) {
    const status = this.statusCodes[code] || { code: 500, defaultMessage: 'Internal Server Error' };

    return {
      code: status.code,
      message: customMessage || status.message || 'OK', // Change here to use 'OK' as the default message for 200
    };
  }
}

export default new ResponseStatus();
