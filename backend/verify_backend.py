import os
import sys

# Add the current directory to sys.path to make app importable
sys.path.append(os.getcwd())

try:
    print("Attempting to import app.main...")
    from app.main import app

    print("Successfully imported app.main")

    from app.database import engine
    from sqlalchemy import text

    print("Attempting to connect to database...")
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print(f"Database connection successful: {result.scalar()}")

    print("Backend verification passed!")

except Exception as e:
    print(f"Verification failed: {e}")
    sys.exit(1)
