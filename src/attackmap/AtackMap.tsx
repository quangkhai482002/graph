import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import Stats from "stats.js";
import pointsData from "../assets/random-locations.json";
import countriesData from "../assets/countries_110m.json";
import texture from "../assets/texture.jpg";

const min = 1000;
const max = 4000;

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateArcsData = (data: any[]) => {
  return data.map(() => {
    const randStart = Math.floor(Math.random() * data.length);
    const randEnd = Math.floor(Math.random() * data.length);
    const randTime = Math.floor(Math.random() * (max - min + 1) + min);
    return {
      startLat: data[randStart].lat,
      startLng: data[randStart].lng,
      endLat: data[randEnd].lat,
      endLng: data[randEnd].lng,
      time: randTime,
      color: ["#ffffff00", "#faf7e6", "#ffffff00"],
    };
  });
};

const countryFeatures = countriesData.features || [];

const CyberAttackMap: React.FC = () => {
  const statsRef = useRef<Stats | null>(null);
  const [arcsData, setArcsData] = useState(
    generateArcsData(shuffleArray(pointsData.slice(20, 90)))
  );
  const [nextArcsData, setNextArcsData] = useState(arcsData);

  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.padding = "10px";
    document.body.appendChild(stats.dom);
    statsRef.current = stats;

    const animate = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextArcsData(generateArcsData(shuffleArray(pointsData.slice(20, 90))));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const switchInterval = setInterval(() => {
      setArcsData(nextArcsData);
    }, 5000);

    return () => clearInterval(switchInterval);
  }, [nextArcsData]);

  return (
    <Globe
      backgroundColor="#08070e"
      globeMaterial={
        new THREE.MeshPhongMaterial({
          color: "#1a2033",
          opacity: 0.95,
          transparent: true,
        })
      }
      arcsData={arcsData}
      arcAltitudeAutoScale={0.3}
      arcColor="color"
      arcStroke={0.5}
      arcDashGap={2}
      arcDashAnimateTime="time"
      polygonsData={countryFeatures}
      polygonSideColor={() => "#00000000"}
      polygonCapMaterial={
        new THREE.MeshPhongMaterial({
          color: "#49ac8f",
          side: THREE.DoubleSide,
          map: new THREE.TextureLoader().load(texture),
        })
      }
      polygonAltitude={0.01}
      polygonStrokeColor={() => "#111111"}
      polygonLabel={(d: any) => d.properties.name}
    />
  );
};

export default CyberAttackMap;
