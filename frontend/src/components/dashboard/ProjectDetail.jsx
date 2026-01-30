import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./projects.css";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

export default function ProjectDetail({ project, onBack }) {
  // const mapRef = useRef(null);
  // const mapContainerRef = useRef(null);

  // const [sites, setSites] = useState([]);

  // useEffect(() => {
  //   if (!mapContainerRef.current) return;

  //   mapRef.current = new mapboxgl.Map({
  //     container: mapContainerRef.current,
  //     style: "mapbox://styles/mapbox/light-v11",
  //     center: [78.9629, 20.5937], // India
  //     zoom: 3,
  //   });

  //   // click to add marker
  //   mapRef.current.on("click", (e) => {
  //     const { lng, lat } = e.lngLat;

  //     const newSite = {
  //       id: Date.now(),
  //       name: `Site ${sites.length + 1}`,
  //       lng,
  //       lat,
  //     };

  //     // marker on map
  //     new mapboxgl.Marker({ color: "#2e7d32" })
  //       .setLngLat([lng, lat])
  //       .addTo(mapRef.current);

  //     setSites((prev) => [...prev, newSite]);
  //   });

  //   return () => mapRef.current?.remove();
  // }, []);

  // return (
  //   <div className="project-details">
  //     <div className="details-top">
  //       <button className="back-btn" onClick={onBack}>
  //         ← Back
  //       </button>

  //       <div>
  //         <h2>{project.title}</h2>
  //         <p className="hint">
  //           Click anywhere on the map to add a site 📍
  //         </p>
  //       </div>
  //     </div>

  //     <div className="details-grid">
  //       {/* MAP */}
  //       <div className="map-box">
  //         <div ref={mapContainerRef} className="map-container" />
  //       </div>

  //       {/* SITES LIST */}
  //       <div className="sites-panel">
  //         <h3>Sites in this Project</h3>

  //         {sites.length === 0 ? (
  //           <p className="empty">No sites added yet. Click map to add one.</p>
  //         ) : (
  //           <ul className="site-list">
  //             {sites.map((site) => (
  //               <li key={site.id}>
  //                 <strong>{site.name}</strong>
  //                 <span>
  //                   {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
  //                 </span>
  //               </li>
  //             ))}
  //           </ul>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  //);
}
