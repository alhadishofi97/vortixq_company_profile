import React from "react";

interface SvgRendererProps {
  svgString: string;
}

const SvgRenderer: React.FC<SvgRendererProps> = ({ svgString }) => {
  return (
    <div
      className="w-6 h-6" // bisa styling CSS
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

export default SvgRenderer;
