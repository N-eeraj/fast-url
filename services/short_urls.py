from math import ceil
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

    @staticmethod
    async def get_redirect_url(
        session: Session,
        short_code: str
    ) -> str | None:
        url_id = recover_id(short_code)

        if not url_id:
            return None

        redirect_url = await ShortUrlsRepository.get_active_destination_url_by_id(
            session=session,
            id=url_id,
        )

        return redirect_url

    @staticmethod
    async def get_short_url_list(
        session: Session,
        user_id: int,
        filters: dict[str, any],
    ):
        (data, total_count) = await ShortUrlsRepository.get_short_url_list(
            session=session,
            user_id=user_id,
            search=filters["search"],
            page=filters["page"],
            limit=filters["limit"],
            sort=filters["sort"],
        )

        meta_data = {
            "current_page": filters["page"],
            "total_pages": ceil(total_count / filters["limit"]),
            "total_count": total_count,
        }

        return (data, meta_data)

    @staticmethod
    async def delete_short_url(
        session: Session,
        id: int,
        user_id: int,
    ):
        await ShortUrlsRepository.delete_short_url(
            session=session,
            id=id,
            user_id=user_id,
        )

    @staticmethod
    async def toggle_active_status(
        session: Session,
        id: int,
        user_id: int,
    ):
        await ShortUrlsRepository.toggle_active_status(
            session=session,
            id=id,
            user_id=user_id,
        )
