from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

router = APIRouter(
  prefix="/auth",
  tags=["auth"],
)

@router.post("/register")
async def register():
  return {}

@router.post("/login")
async def login():
  return {}
