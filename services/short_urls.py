from sqlmodel import Session
from repositories.short_urls import ShortUrlsRepository
from schemas.short_urls import ShortUrlDataModel, CreateShortUrlModel
from utils.generate_short_code import generate_code, recover_id

class ShortUrlsService:
    @staticmethod
    async def generate_short_code(
        session: Session,
    ) -> str:
        last_id = await ShortUrlsRepository.get_last_entry_id(
            session=session,
        )
        new_id = (last_id + 1) if last_id else 1
        generated_code = generate_code(new_id)
        return generated_code

    @staticmethod
    async def create_short_url(
        session: Session,
        user_id: int,
        data: CreateShortUrlModel,
    ) -> str:
        short_code = await ShortUrlsService.generate_short_code(session)
        redirect = {
            "user_id": user_id,
            "name": data.name,
            "destination_url": data.destination_url,
            "short_code": short_code,
        }

        redirect_entry = await ShortUrlsRepository.create_short_code(
            session=session,
            data=ShortUrlDataModel.model_validate(redirect),
        )

        result = redirect_entry.copy()
        result.pop("user_id", None)
        return result
