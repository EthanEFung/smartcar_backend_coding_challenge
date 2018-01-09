export default class GMError {
  constructor(message) {
    this.status = 404;
    this.error = message;
  }
}