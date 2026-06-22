from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from routers.api import auth, profile

router = APIRouter(
    prefix="/api",
    tags=["api"],
)

router.include_router(auth.router)
router.include_router(profile.router)

@router.api_route(
    "/{path:path}",
    methods=["GET", "POST", "PATCH", "PUT", "DELETE"],
    response_class=JSONResponse,
)
async def api_not_found_error(request: Request):
    raise HTTPException(
        status_code=404,
        detail={
            "message": "URL not found",
            "path": request.url.path,
        },
    )
