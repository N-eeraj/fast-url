from sqlmodel import Session, create_engine
import models
from config import Settings

settings = Settings()
DATABASE_URL = settings.DATABASE_URL

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,
)

def get_session():
    with Session(engine) as session:
        yield session
