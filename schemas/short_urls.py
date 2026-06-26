from pydantic import BaseModel, Field, HttpUrl, field_validator
from pydantic_core import PydanticCustomError
from urllib.parse import urlparse

# validation functions
def validate_url(url: str):
    url = url.strip()

    parsed = urlparse(url)

    if not parsed.scheme or not parsed.netloc:
        raise PydanticCustomError(
            "invalid_url",
            "Please provide a valid URL including http or https",
        )

    if parsed.scheme not in ("http", "https"):
        raise PydanticCustomError(
            "invalid_scheme",
            "Only http and https URLs are allowed",
        )

    return url

# schemas
class CreateShortUrlModel(BaseModel):
    url: str = Field(
        ...,
        description="The original long URL to be shortened",
        examples=["https://example.com/some/very/long/path"],
    )

    @field_validator("url")
    @classmethod
    def validate_url_field(cls, url: str) -> str:
        return validate_url(url)


class ShortUrlDataModel(BaseModel):
    user_id: int = Field(
        ...,
        description="Unique identifier of the user who owns the short URL.",
    )

    short_code: str = Field(
        ...,
        description="Unique short code used to access the shortened URL.",
        example="abc123",
    )

    destination_url: HttpUrl = Field(
        ...,
        description="The original destination URL that the short code redirects to.",
        example="https://example.com/products/123",
    )

    is_active: bool = Field(
        ...,
        description="Indicates whether the short URL is active and can be used.",
        example=True,
    )

class ShortUrlRecordModel(ShortUrlDataModel):
    id: int = Field(
        ...,
        description="Unique identifier of the short URL."
    )
