export function GridBackground() {
  return (
    <div 
      className="fixed inset-0 opacity-30 pointer-events-none z-0"
      style={{
        background: `
          linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'center top',
        animation: 'grid-fly 20s linear infinite',
      }}
    />
  );
}