from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError, HTTPException

async def custom_validation_exception_handler(
    request: Request,
    exception: RequestValidationError,
):
    errors = dict()
    for error in exception.errors():
        location = ".".join(error["loc"][1:])
        errors[location] = list([error["msg"]])

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content= {
            "errors": errors,
            "message": "Bad Request"
        },
    )

async def custom_http_exception_handler(
    request: Request,
    exception: HTTPException,
):
    message = exception.detail.pop("message") or "Oops! Something Went Wrong"

    return JSONResponse(
        status_code=exception.status_code or status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "errors": exception.detail or None,
            "message": message,
        },
    )
