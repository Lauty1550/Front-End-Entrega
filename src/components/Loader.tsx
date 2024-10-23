// SpinLoader.tsx
import React from "react";
import "../css/SpinLoader.css";
interface SpinLoaderProps {
  isLoading: boolean;
}

const SpinLoader: React.FC<SpinLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null; // No renderiza nada si no está cargando

  return (
    <div className="spin-loader">
      <img src="/Loading.gif" alt="Loading..." />
    </div>
  );
};

export default SpinLoader;
