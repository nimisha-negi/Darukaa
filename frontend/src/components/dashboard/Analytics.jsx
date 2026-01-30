import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getAllSites } from "../../api/sites";
import { getProjects } from "../../api/project";

import SiteAnalytics from "./SiteAnalytics";

export default function Analytics() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [sites, setSites] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null); // 👈 Track clicked site
  const [selectedProjectName, setSelectedProjectName] = useState("");

  // Map project IDs to names
  const projectMap = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      map[p.id] = p.title || p.name || `Project ${p.id}`;
    });
    return map;
  }, [projects]);

  // Initialize map once
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => mapRef.current?.remove();
  }, []);

  // Fetch sites and projects
  useEffect(() => {
    const loadData = async () => {
      try {
        const [sitesData, projectsData] = await Promise.all([
          getAllSites(),
          getProjects(),
        ]);
        setSites(sitesData || []);
        setProjects(projectsData || []);
      } catch (err) {
        console.error("Analytics load error:", err);
      }
    };
    loadData();
  }, []);

  // Draw polygons + click handler
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !sites.length) return;

    const geojson = {
      type: "FeatureCollection",
      features: sites
        .filter((s) => s.feature?.geometry)
        .map((s) => ({
          type: "Feature",
          geometry: s.feature.geometry,
          properties: {
            site_id: s.site_id,
            name: s.name,
            project_id: s.project_id,
          },
        })),
    };

    const onSiteClick = (e) => {
      const feature = e.features?.[0];
      if (!feature) return;

      const props = feature.properties || {};
      const site = { site_id: props.site_id, name: props.name };
      const projectId = props.project_id;
      const projectName = projectMap[projectId] || `Project ${projectId}`;

      // Instead of Popup, open React modal
      setSelectedSite(site);
      setSelectedProjectName(projectName);
    };

    const onEnter = () => (map.getCanvas().style.cursor = "pointer");
    const onLeave = () => (map.getCanvas().style.cursor = "");

    const draw = () => {
      if (map.getLayer("sites-fill")) map.removeLayer("sites-fill");
      if (map.getLayer("sites-outline")) map.removeLayer("sites-outline");
      if (map.getSource("sites-source")) map.removeSource("sites-source");

      map.addSource("sites-source", { type: "geojson", data: geojson });

      map.addLayer({
        id: "sites-fill",
        type: "fill",
        source: "sites-source",
        paint: { "fill-opacity": 0.45, "fill-color": "#2e7d32" },
      });

      map.addLayer({
        id: "sites-outline",
        type: "line",
        source: "sites-source",
        paint: { "line-width": 2, "line-color": "#1f4f3a" },
      });

      map.off("click", "sites-fill", onSiteClick);
      map.off("mouseenter", "sites-fill", onEnter);
      map.off("mouseleave", "sites-fill", onLeave);

      map.on("click", "sites-fill", onSiteClick);
      map.on("mouseenter", "sites-fill", onEnter);
      map.on("mouseleave", "sites-fill", onLeave);
    };

    if (map.isStyleLoaded()) draw();
    else map.once("load", draw);

    return () => {
      map.off("click", "sites-fill", onSiteClick);
      map.off("mouseenter", "sites-fill", onEnter);
      map.off("mouseleave", "sites-fill", onLeave);
    };
  }, [sites, projectMap]);

  return (
    <div className="analytics-page">
      <div ref={mapContainerRef} className="analytics-map-container" />

      {/* Render modal as true overlay */}
      {selectedSite && (
        <SiteAnalytics
          site={selectedSite}
          projectName={selectedProjectName}
          onClose={() => setSelectedSite(null)}
        />
      )}
    </div>
  );
}
