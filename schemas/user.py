from pydantic import BaseModel, Field, field_validator
from pydantic_core import PydanticCustomError
from email_validator import validate_email as validate_email_value, EmailNotValidError
import re

# validation functions
def validate_email(email: str):
    try:
        result = validate_email_value(email)
        return result.normalized
    except EmailNotValidError:
        raise PydanticCustomError(
            "value_error",
            "Please enter a valid email",
        )

def validate_user_name(name: str):
    min_length = 2
    name = name.strip()
    if len(name) < min_length:
        raise PydanticCustomError(
            "value_error",
            "Name must be at least {min_length} characters long",
            {
                "min_length": min_length,
            }
        )

    return name

def validate_new_password(password: str):
    min_length = 8

    if len(password) < min_length:
        raise PydanticCustomError(
            "value_error",
            "Password must be at least {min_length} characters",
            {
                "min_length": min_length,
            }
        )
    if not re.search(r"[A-Z]", password):
        raise PydanticCustomError(
            "value_error",
            "Password must contain at least one uppercase letter",
        )
    if not re.search(r"[a-z]", password):
        raise PydanticCustomError(
            "value_error",
            "Password must contain at least one lowercase letter",
        )
    if not re.search(r"[0-9]", password):
        raise PydanticCustomError(
            "value_error",
            "Password must contain at least one number",
        )
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-\[\]\\/]", password):
        raise PydanticCustomError(
            "value_error",
            "Password must contain at least one special character",
        )

    return password

def validate_password(password: str):
    if not password:
        raise PydanticCustomError(
            "value_error",
            "Please enter your password",
        )

    return password


# schemas
class UserBaseModel(BaseModel):
    name: str = Field(
        ...,
        description="Full name of the user. Must contain at least 2 characters.",
        examples=["John Doe"],
    )

    email: str = Field(
        ...,
        description="Valid email address used for account registration.",
        examples=["john.doe@example.com"],
    )

    @field_validator("name")
    @classmethod
    def validate_name_field(cls, name: str):
        return validate_user_name(name)

    @field_validator("email")
    @classmethod
    def validate_email_field(cls, email: str):
        return validate_email(email)
