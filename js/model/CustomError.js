function CustomError(message){
    Error.call(this);
    this.message = message;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;