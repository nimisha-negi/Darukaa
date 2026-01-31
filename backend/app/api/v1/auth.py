from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.database import get_db
from app.models.user import User
from app.schema.user import Token, UserCreate, UserLogin

router = APIRouter(prefix="/auth", tags=["Auth"])


# ----- Register -----
@router.post("/register", status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Validate username
        if not user.username or len(user.username.strip()) < 3:
            raise HTTPException(status_code=400, detail="Username > 3 characters")
        if len(user.username.strip()) > 50:
            raise HTTPException(status_code=400, detail="Username < 50 characters")

        # Validate password
        if not user.password or len(user.password) < 6:
            raise HTTPException(status_code=400, detail="Password > 6 characters")
        if len(user.password.encode("utf-8")) > 72:
            raise HTTPException(status_code=400, detail="Password too long")

        # Check if email already exists
        if db.query(User).filter(User.email == user.email).first():
            raise HTTPException(status_code=400, detail="Email already exists")

        # Create new user
        new_user = User(
            username=user.username.strip(),
            email=user.email.strip(),
            hashed_password=hash_password(user.password),
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User registered successfully"}

    except HTTPException:
        raise  # Reraise known HTTP errors
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


# ----- Login -----
@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        db_user = db.query(User).filter(User.email == user.email.strip()).first()

        if not db_user or not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        token = create_access_token({"sub": str(db_user.id)})
        return {"access_token": token}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
