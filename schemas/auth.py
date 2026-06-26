from pydantic import BaseModel, Field, field_validator
from schemas.user import UserBaseModel, validate_email, validate_new_password, validate_password

# schemas
class RegisterModel(UserBaseModel):
    password: str = Field(
        ...,
        description=(
            "Account password. Must be at least 8 characters long and contain "
            "at least one uppercase letter, one lowercase letter, one number, "
            "and one special character."
        ),
        example="SecurePass123!",
    )

    @field_validator("password")
    @classmethod
    def validate_password_field(cls, password: str):
        return validate_new_password(password)

class LoginModel(BaseModel):
    email: str = Field(
        ...,
        description="Registered email address of the user.",
        example="john.doe@example.com",
    )

    password: str = Field(
        ...,
        description="User account password.",
        example="SecurePass123!",
    )

    @field_validator("email")
    @classmethod
    def validate_email_field(cls, email: str):
        return validate_email(email)

    @field_validator("password")
    @classmethod
    def validate_password_field(cls, password: str):
        return validate_password(password)

class UserResponseModel(UserBaseModel):
    id: int = Field(
        ...,
        description="User id",
        example=1,
    )

class UserWithPasswordModel(UserResponseModel):
    password: str = Field(
        ...,
        description="User's hashed password for internal use",
    )

class CurrentUserModel(UserResponseModel):
    hashed_token: str = Field(
        ...,
        description="Hashed authentication token stored in database",
    )
