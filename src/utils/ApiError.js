

class ApiError extends Error{
    
    constructor(
      statusCode,
      meeage = "Tamari aa bhul chhe",
      error = [],
      stack = ""
    ){
        super(meeage)
        this.statusCode = statusCode
        this.data = null
        this.message = meeage
        this.success  = false;
        this.error = error

        if (stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}