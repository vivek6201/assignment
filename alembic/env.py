from logging.config import fileConfig
from alembic import context

# NOW import app modules
from config.settings import settings
from db.config import engine
import sqlmodel

from db.models.calender import *

# this is the Alembic Config object
config = context.config

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set your database URL from settings
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Add your model's MetaData object here for 'autogenerate' support
target_metadata = sqlmodel.SQLModel.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # Enable type comparison
            compare_server_default=True,  # Enable server default comparison
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()