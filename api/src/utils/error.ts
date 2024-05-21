export class NotFound extends Error {
  status: number;

  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFound";
    this.status = 404;
  }
}

export class NotAuthenticated extends Error {
  status: number;
  constructor(message: string = "You are not authenticated") {
    super(message);
    this.name = "NotAuthenticated";
    this.status = 401;
  }
}

export class NotAuthorized extends Error {
  status: number;
  constructor(
    message: string = "You are not authorized to access this resource"
  ) {
    super(message);
    this.name = "NotAuthorized";
    this.status = 403;
  }
}

export class BadRequest extends Error {
  status: number;
  data: any;
  constructor(message: string = "Bad Request", data?: any) {
    super(message);
    this.name = "BadRequest";
    this.status = 400;
    this.data = data;
  }
}

export class InternalServerError extends Error {
  status: number;
  constructor(message: string = "Internal Server Error") {
    super(message);
    this.name = "InternalServerError";
    this.status = 500;
  }
}
