# app/models/site.py
from datetime import datetime

from app.database import Base
from app.models.project import Project
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship


class Site(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(String, unique=True, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"))
    name = Column(String, nullable=False)
    feature = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="sites")
