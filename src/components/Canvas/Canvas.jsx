import { useEffect, useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        boxSizing: 'border-box',
        background: '#282c34',
        flex: 1,
        display: 'block',
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default Canvas;
