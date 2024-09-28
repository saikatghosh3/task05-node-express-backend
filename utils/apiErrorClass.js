class APIError extends Error {
  constructor(status, message, type = "API Error", uuid = "") {
    super(message);
    this.status = status;
    this.type = type;
    this.uuid = uuid;
  }
}

module.exports = APIError;
