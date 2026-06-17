from pydantic import BaseModel, EmailStr, field_validator
import re

# validation functions
def validate_user_name(name: str):
    name = name.strip()
    if len(name) < 2:
        raise ValueError("Please enter your name")

    return name

def validate_new_password(password: str):
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters")
    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter")
    if not re.search(r"[a-z]", password):
        raise ValueError("Password must contain at least one lowercase letter")
    if not re.search(r"[0-9]", password):
        raise ValueError("Password must contain at least one number")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-\[\]\\/]", password):
        raise ValueError("Password must contain at least one special character")

    return password

def validate_password(password: str):
    if not password:
        raise ValueError("Please enter your password")

    return password


# schemas
class RegisterModel(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("name")
    @classmethod
    def validate_name_field(cls, name: str):
        return validate_user_name(name)

    @field_validator("password")
    @classmethod
    def validate_password_field(cls, password: str):
        return validate_new_password(password)

class LoginModel(BaseModel):
    email: EmailStr
    password: str

    @field_validator("email")
    @classmethod
    def validate_email_field(cls, email: str):
        return email.strip().lower()

    @field_validator("password")
    @classmethod
    def validate_password_field(cls, password: str):
        return validate_password(password)
