# app/models/site.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON
from datetime import datetime
from app.database import Base
from app.models.project import Project

class Site(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(String, unique=True, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"))
    name = Column(String, nullable=False)
    feature = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="sites")
