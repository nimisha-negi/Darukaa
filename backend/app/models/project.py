from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    icon = Column(String, default="🌍")
    updated = Column(DateTime, default=datetime.utcnow)
    description = Column(String) 
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="projects")

    sites = relationship("Site", back_populates="project", cascade="all, delete")
