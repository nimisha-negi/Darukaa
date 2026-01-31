from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None


class ProjectOut(BaseModel):
    id: int
    title: str
    icon: str
    sites: int
    updated: datetime

    class Config:
        from_attributes = True
