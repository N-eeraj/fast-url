from fastapi import APIRouter
from schemas.auth import RegisterModel, LoginModel

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/register")
async def register(body: RegisterModel):
    print(body.name)
    print(body.email)
    print(body.password)

    return {
        "success": True,
    }


@router.post("/login")
async def login(body: LoginModel):
    print(body.email)
    print(body.password)

    return {
        "success": True,
    }
