from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import JSONResponse
from routers.api import auth, profile, short_urls

router = APIRouter(
    prefix="/api",
    tags=["api"],
)

router.include_router(auth.router)
router.include_router(profile.router)
router.include_router(short_urls.router)

@router.api_route(
    "/{path:path}",
    methods=["GET", "POST", "PATCH", "PUT", "DELETE"],
    response_class=JSONResponse,
)
async def api_not_found_error(request: Request):
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail={
            "message": "URL not found",
            "path": request.url.path,
        },
    )
