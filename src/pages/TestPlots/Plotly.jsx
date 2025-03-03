import React from 'react';
import Plot from 'react-plotly.js';

const Plotly = () => {
  const x = [...Array(10).keys()];
  const y = [...Array(10).keys()];
  const z = x.map(() => y.map(() => Math.sin(Math.random() ** 2)));

  const data = [
    {
      z: z,
      type: 'surface',
      colorscale: 'Viridis',
    },
  ];

  const layout = {
    title: '3D Surface Plot',
    autosize: true,
    scene: {
      x: { title: 'X' },
      y: { title: 'Y' },
      z: { title: 'Z' },
    },
  };

  return (
    <div>
      <Plot
        data={data}
        layout={layout}
        style={{ width: '100%', height: '700px' }}
      />
    </div>
  );
};

export default Plotly;
