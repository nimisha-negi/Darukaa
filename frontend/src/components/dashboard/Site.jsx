import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSite, getSitesByProject, deleteSite } from "../../api/sites";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./projects.css";

export default function Site({ project, onClose }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  const [savedSites, setSavedSites] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
      defaultMode: "simple_select",
    });

    mapRef.current.addControl(drawRef.current, "top-left");
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    const loadSites = async () => {
      if (!project?.id) return;
      if (!drawRef.current) return;

      try {
        // Clear previous polygons from map
        drawRef.current.deleteAll();

        // Fetch only this project's sites
        const backendSites = await getSitesByProject(project.id);

        setSavedSites(backendSites);

        // Add polygons to map
        backendSites.forEach((site) => {
          if (site?.feature) {
            drawRef.current.add(site.feature);
          }
        });
      } catch (err) {
        toast.error("Error fetching sites");
        console.error("Error fetching sites:", err);
      }
    };

    loadSites();
  }, [project?.id]);

  const handleAddSiteMode = () => {
    drawRef.current.changeMode("draw_polygon");
  };

  const handleSaveSites = async () => {
    try {
      const data = drawRef.current.getAll();
      if (!data?.features?.length) return;

      // existing site_ids from backend
      const existingSiteIds = new Set(savedSites.map((s) => s.site_id));

      for (let i = 0; i < data.features.length; i++) {
        const feature = data.features[i];

        // If feature already has siteId, keep it
        const siteId =
          feature.properties?.siteId ||
          feature.properties?.site_id ||
          `${project.id}-SITE-${Date.now()}-${i}`;

        // Skip if already saved
        if (existingSiteIds.has(siteId)) continue;

        const name = feature.properties?.name || `Site ${savedSites.length + i + 1}`;

        // attach props into polygon
        feature.properties = {
          ...feature.properties,
          siteId,
          name,
        };

        await createSite({
          site_id: siteId,
          project_id: project.id,
          name,
          feature,
        });
      }

      const backendSites = await getSitesByProject(project.id);
      toast.success("Site saved successfully!");
      setSavedSites(backendSites);

      // refresh map polygons
      drawRef.current.deleteAll();
      backendSites.forEach((site) => {
        if (site?.feature) drawRef.current.add(site.feature);
      });
    } catch (err) {
      toast.error
      console.error("Error saving sites:", err);
    }
  };

  // DELETE SITE
  const handleDeleteSite = async (siteId) => {
    try {
      await deleteSite(siteId);

      setSavedSites((prev) => prev.filter((s) => s.site_id !== siteId));
      const backendSites = await getSitesByProject(project.id);
      setSavedSites(backendSites);

      drawRef.current.deleteAll();
      backendSites.forEach((site) => {
        if (site?.feature) drawRef.current.add(site.feature);
      });
      toast.success("Site removed successfully!");
    } catch (err) {
      console.error("Error deleting site:", err);
    }
  };

  return (
    <div className="site-map-overlay">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="site-map-header">
        <div>
          <h2>{project?.title}</h2>
          <p>Draw polygon → Save Sites</p>
        </div>

        <div className="site-map-actions">
          <button className="btn-outline" onClick={handleAddSiteMode}>
            + Add Site
          </button>

          <button className="btn-primary" onClick={handleSaveSites}>
            Save Sites
          </button>

          <button className="btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <div className="site-map-body">
        <div ref={mapContainerRef} className="map-container" />

        <div className="site-info-panel">
          <h3>Saved Sites</h3>

          {savedSites.length === 0 ? (
            <p style={{ opacity: 0.7 }}>
              No sites saved yet. Draw and click “Save Sites”.
            </p>
          ) : (
            savedSites.map((s) => (
              <div key={s.site_id} className="site-mini-card">
                <p>
                  <b>{s.name}</b>
                </p>

                <p style={{ opacity: 0.7, fontSize: "12px" }}>{s.site_id}</p>

                <button
                  className="btn-danger btn-small"
                  onClick={() => handleDeleteSite(s.site_id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
