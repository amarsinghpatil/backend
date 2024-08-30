class ApiError extends Error {
    constructor(
        statusCode,
        message = "somethings went wrong",
        errors = [],
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (statck) {
            this.stack = statck
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apiError}

/*
What this Represent, While Connecting to the database error will occur so Error are handled here

*/