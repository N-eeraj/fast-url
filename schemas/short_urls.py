from pydantic import BaseModel, Field, field_validator
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
    name: str = Field(
        ...,
        description="A user-provided identifier for the URL shortener entry (used as the URL slug or alias).",
        example="My Link",
    )

    destination_url: str = Field(
        ...,
        description="The original destination URL that the short code redirects to.",
        example="https://example.com/products/123",
    )

    @field_validator("destination_url")
    @classmethod
    def validate_destination_url_field(cls, destination_url: str) -> str:
        return validate_url(destination_url)


class ShortUrlDataModel(CreateShortUrlModel):
    user_id: int = Field(
        ...,
        description="Unique identifier of the user who owns the short URL.",
    )

    short_code: str = Field(
        ...,
        description="Unique short code used to access the shortened URL.",
        example="abc123",
    )

    is_active: bool | None = Field(
        description="Indicates whether the short URL is active and can be used.",
        example=True,
        default=True,
    )

class ShortUrlRecordModel(ShortUrlDataModel):
    id: int = Field(
        ...,
        description="Unique identifier of the short URL."
    )
