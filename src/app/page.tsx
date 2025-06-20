import Orb from '../components/Orb';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="min-h-screen w-full flex justify-center">
        <div className="relative w-full h-[600px] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
          <h1 className="text-4xl text-white font-bold">
            Welcome to Resonix
          </h1>
        </div>


      </main>
    </div>
  );
}
