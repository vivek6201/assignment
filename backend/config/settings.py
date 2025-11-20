from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Lysr Assignment"
    PORT: int = 8000
    HOST: str = "localhost"
    
    DATABASE_URL: str = ""
    ALLOWED_HOSTS: list = ["*"]
    
    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
        "extra":"allow"
    }
    
    
settings = Settings()