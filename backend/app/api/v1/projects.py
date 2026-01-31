from typing import List

from app.api.v1.deps import get_current_user, get_db
from app.models.project import Project
from app.models.user import User
from app.schema.project import ProjectCreate, ProjectOut
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(prefix="/projects", tags=["Projects"])


# GET all projects for current user
@router.get("/", response_model=List[ProjectOut])
def get_projects(db: Session = Depends(get_db), user=Depends(get_current_user)):
    projects = db.query(Project).filter(Project.owner_id == user.id).all()
    result = []
    for p in projects:
        site_count = len(p.sites) if p.sites else 0
        result.append(
            ProjectOut(
                id=p.id, title=p.title, icon=p.icon, sites=site_count, updated=p.updated
            )
        )
    return result


# POST create new project
@router.post("/", response_model=ProjectOut)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    new_project = Project(
        title=project_in.title,
        icon=project_in.icon if hasattr(project_in, "icon") else "",
        owner_id=user.id,
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    # Convert to response dict with proper types
    return {
        "id": new_project.id,
        "title": new_project.title,
        "icon": new_project.icon,
        "sites": len(new_project.sites) if new_project.sites else 0,  # always int
        "updated": new_project.updated,
    }


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(
    project_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return ProjectOut(
        id=project.id,
        title=project.title,
        icon=project.icon,
        sites=len(project.sites),
        updated=project.updated,
    )


# DELETE a project
@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}
