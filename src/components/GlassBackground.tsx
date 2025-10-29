interface GlassBackgroundProps {
  children: React.ReactNode;
}

export const GlassBackground = ({ children }: GlassBackgroundProps) => {
  return (
    <div className="min-h-screen bg-black/95 flex flex-col overflow-x-hidden relative">
      {/* Glass Morphism Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-3xl -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,136,0.08),transparent_50%)] -z-10"></div>
      
      {children}
    </div>
  );
};
