# app/schema/site.py
from datetime import datetime
from typing import Any, Dict

from pydantic import BaseModel, Field


class SiteBase(BaseModel):
    site_id: str
    project_id: int
    name: str
    feature: Dict[str, Any]


class SiteCreate(SiteBase):
    pass


class SiteOut(BaseModel):
    site_id: str
    project_id: int
    name: str
    feature: Dict[str, Any]
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

    # Aliases for camelCase
    siteId: str = Field(..., alias="site_id")
    projectId: int = Field(..., alias="project_id")
    createdAt: datetime = Field(..., alias="created_at")
