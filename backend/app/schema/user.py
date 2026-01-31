from pydantic import BaseModel, EmailStr, constr


# ----- Register schema -----
class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=6, max_length=72)  # bcrypt max 72 bytes


# ----- Login schema -----
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ----- Token response -----
class Token(BaseModel):
    access_token: str
