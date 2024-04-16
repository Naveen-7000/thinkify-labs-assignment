import React from "react";

interface CreativePreviewProps {
  title: string;
  subtitle: string;
  color: string;
}

const CreativePreview: React.FC<CreativePreviewProps> = ({ title, subtitle, color }) => {
  return (
    <div className="creative-preview" style={{ backgroundColor: "white" }}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default CreativePreview;
