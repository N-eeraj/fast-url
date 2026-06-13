from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from routers import auth

router = APIRouter(
  prefix="/api",
  tags=["api"],
)

router.include_router(auth.router)

@router.get("{path:path}", response_class=JSONResponse)
async def api_not_found_error():
  return JSONResponse(
    status_code=status.HTTP_404_NOT_FOUND,
    content={
      "success": False,
      "message": "URL not found",
    }
  )
