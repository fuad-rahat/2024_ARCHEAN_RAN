'use client';
import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const World = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [altitude, setAltitude] = useState(() => () => 0.1);
  const [transitionDuration, setTransitionDuration] = useState(1000);

  useEffect(() => {
    // Load country data from the correct path
    fetch('/datasets/ne_110m_admin_0_countries.geojson')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch the GeoJSON file');
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        // Set altitude and transition duration
        setTimeout(() => {
          setTransitionDuration(4000);
          setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5));
        }, 3000);
      })
      .catch((error) => {
        console.error('Error loading GeoJSON:', error);
      });
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      // Enable auto-rotate for the globe
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 2;

      // Set the point of view to a certain altitude
      globeEl.current.pointOfView({ altitude: 2.5 }, 5000);
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}> {/* Set the globe size here */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')} // Exclude Antarctica
        polygonAltitude={altitude}
        polygonCapColor={() => 'rgba(200, 0, 0, 0.6)'}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonLabel={({ properties: d }) => `
          <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
          Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
        `}
        polygonsTransitionDuration={transitionDuration}
      />
    </div>
  );
};

export default World;
