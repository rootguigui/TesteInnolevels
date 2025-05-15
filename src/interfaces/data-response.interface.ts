class DataResponse {
  message: string;
  data: any;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }

  static success(message: string, data: any) {
    return new DataResponse(message, data);
  }

  static error(message: string, data: any) {
    return new DataResponse(message, data);
  }
}

export { DataResponse };

