from app.api.v1.auth import router as auth_router
from app.api.v1.projects import router as projects_router
from app.api.v1.sites import router as sites_router
from app.database import Base, engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Darukaaaa.Earth Backend", version="1.0")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://Darukaaa-frontend-l8wz.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create tables
Base.metadata.create_all(bind=engine)

# ✅ Include routers
app.include_router(auth_router)
app.include_router(projects_router)
app.include_router(sites_router, prefix="/api/v1")  # <== fixed variable name


@app.get("/")
def root():
    return {"message": "Darukaaaaa Backend is running"}
