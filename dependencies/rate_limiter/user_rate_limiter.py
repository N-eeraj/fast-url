from fastapi import Request, status
from fastapi.exceptions import HTTPException
from core.rate_limiter import AUTH_USER_RULE, check_rate_limit

async def user_rate_limiter(
    request: Request,
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Unauthenticated User",
            },
        )

    key = f"user:{user['id']}"

    allowed = check_rate_limit(
        rule=AUTH_USER_RULE,
        key=key,
    )

    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "message": "Too much requests, please try again later",
            },
        )
