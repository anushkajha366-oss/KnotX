export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Coral blob */}
      <div
        className="absolute animate-float-slow"
        style={{
          width: 600,
          height: 600,
          top: "-10%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(255,95,95,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {/* Lilac blob */}
      <div
        className="absolute animate-float-slower"
        style={{
          width: 500,
          height: 500,
          bottom: "10%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {/* Mint accent blob */}
      <div
        className="absolute animate-float-slow"
        style={{
          width: 300,
          height: 300,
          bottom: "30%",
          right: "15%",
          background: "radial-gradient(circle, rgba(126,240,197,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
          animationDelay: "3s",
        }}
      />
      {/* SVG orbital lines + nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.07 }}
      >
        <defs>
          <radialGradient id="node-coral" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5F5F" />
            <stop offset="100%" stopColor="#FF5F5F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="node-lilac" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Orbital ellipses */}
        <ellipse cx="75%" cy="20%" rx="25%" ry="18%" fill="none" stroke="#C084FC" strokeWidth="0.5" />
        <ellipse cx="20%" cy="75%" rx="20%" ry="15%" fill="none" stroke="#FF5F5F" strokeWidth="0.5" />
        <ellipse cx="50%" cy="50%" rx="40%" ry="30%" fill="none" stroke="#FFF7E8" strokeWidth="0.3" />
        {/* Nodes */}
        <circle cx="75%" cy="20%" r="3" fill="#C084FC" fillOpacity="0.8" />
        <circle cx="20%" cy="75%" r="3" fill="#FF5F5F" fillOpacity="0.8" />
        <circle cx="85%" cy="60%" r="2" fill="#7EF0C5" fillOpacity="0.8" />
        <circle cx="30%" cy="30%" r="2" fill="#FFF7E8" fillOpacity="0.5" />
        <circle cx="60%" cy="80%" r="2" fill="#C084FC" fillOpacity="0.6" />
        {/* Connecting lines */}
        <line x1="75%" y1="20%" x2="85%" y2="60%" stroke="#C084FC" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="75%" y1="20%" x2="60%" y2="80%" stroke="#FF5F5F" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="20%" y1="75%" x2="30%" y2="30%" stroke="#FFF7E8" strokeWidth="0.3" strokeDasharray="3 8" />
        <line x1="30%" y1="30%" x2="85%" y2="60%" stroke="#C084FC" strokeWidth="0.3" strokeDasharray="3 8" />
      </svg>
    </div>
  );
}
