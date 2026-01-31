from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_user
from app.database import get_db
from app.models.project import Project
from app.models.site import Site
from app.schema.site import SiteCreate, SiteOut

router = APIRouter(prefix="/sites", tags=["Sites"])


@router.post("/", response_model=SiteOut)
def create_site(site_in: SiteCreate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == site_in.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Generate site_id if not provided
    site_id = (
        site_in.site_id
        or f"{site_in.project_id}-SITE-{int(datetime.utcnow().timestamp())}"
    )

    new_site = Site(
        site_id=site_id,
        project_id=site_in.project_id,
        name=site_in.name,
        feature=site_in.feature,
    )

    db.add(new_site)
    db.commit()
    db.refresh(new_site)
    return new_site


@router.get("/", response_model=list[SiteOut])
def get_sites(
    project_id: int = Query(None, alias="projectId"), db: Session = Depends(get_db)
):
    query = db.query(Site)
    if project_id is not None:
        query = query.filter(Site.project_id == project_id)
    return query.all()


@router.delete("/{site_id}", status_code=204)
def delete_site(site_id: str, db: Session = Depends(get_db)):
    site = db.query(Site).filter(Site.site_id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    db.delete(site)
    db.commit()
    return


@router.get("/all", response_model=list[SiteOut])
def get_all_sites(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Site).all()
