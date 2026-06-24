from pydantic import BaseModel, Field, field_validator
from schemas.user import UserBaseModel, validate_password, validate_new_password

# schemas
class UpdateProfileModel(UserBaseModel):
    pass

class UpdatePasswordModel(BaseModel):
    password: str = Field(
        ...,
        description="User account password.",
        examples=["SecurePass123!"],
    )

    new_password: str = Field(
        ...,
        description=(
            "Account password. Must be at least 8 characters long and contain "
            "at least one uppercase letter, one lowercase letter, one number, "
            "and one special character."
        ),
        examples=["NewSecurePass123!"],
    )

    @field_validator("password")
    @classmethod
    def validate_password_field(cls, password: str):
        return validate_password(password)

    @field_validator("new_password")
    @classmethod
    def validate_new_password_field(cls, new_password: str):
        return validate_new_password(new_password)
