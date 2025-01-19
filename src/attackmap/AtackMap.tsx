import Globe from "react-globe.gl";
import * as THREE from "three";
import pointsData from "../assets/random-locations.json";
import countriesData from "../assets/countries_110m.json";
import texture from "../assets/texture.jpg";

const min = 1000;
const max = 4000;
const sliceData = pointsData
  .sort(() => (Math.random() > 0.5 ? 1 : -1))
  .slice(20, 90);

const arcsData = sliceData.map(() => {
  const randStart = Math.floor(Math.random() * sliceData.length);
  const randEnd = Math.floor(Math.random() * sliceData.length);
  const randTime = Math.floor(Math.random() * (max - min + 1) + min);
  return {
    startLat: sliceData[randStart].lat,
    startLng: sliceData[randStart].lng,
    endLat: sliceData[randEnd].lat,
    endLng: sliceData[randEnd].lng,
    time: randTime,
    color: ["#ffffff00", "#faf7e6", "#ffffff00"],
  };
});

const countryFeatures = countriesData.features || [];

const CyberAttackMap: React.FC = () => {
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
