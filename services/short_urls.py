from sqlmodel import Session
from repositories.short_urls import ShortUrlsRepository
from schemas.short_urls import ShortUrlDataModel
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
        destination_url: str,
    ) -> str:
        short_code = await ShortUrlsService.generate_short_code(session)
        data = {
            "user_id": user_id,
            "short_code": short_code,
            "destination_url": destination_url,
            "is_active": True,
        }
        redirect_entry = await ShortUrlsRepository.create_short_code(
            session=session,
            data=ShortUrlDataModel.model_validate(data),
        )

        return redirect_entry["short_code"]
