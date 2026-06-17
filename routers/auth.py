from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, field_validator
import re

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

class RegisterModel(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, name: str):
        name = name.strip()
        if len(name) < 2:
            raise ValueError("Please enter your name")

        return name

    @field_validator("password")
    @classmethod
    def validate_password(cls, password: str):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"[0-9]", password):
            raise ValueError("Password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-\\/\\[\]]", password):
            raise ValueError("Password must contain at least one special character")

        return password

class LoginModel(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, password: str):
        if not password:
            raise ValueError("Please enter your password")

        return password


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
