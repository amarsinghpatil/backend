class ApiResponse {

    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

/*
Here how the response are handled, so many response will accour
*/