import { useState, useEffect } from "react";
import { Moon, Sun, Maximize, Minimize, Smartphone } from "lucide-react";
import { useSmoothTime } from "./hooks/useSmoothTime";
import { useWakeLock } from "./hooks/useWakeLock";

// Faces
import SwissRailwayClock from "./components/faces/SwissRailwayClock";
import ClassicNumericClock from "./components/faces/ClassicNumericClock";

type ClockType = "swiss" | "minimal" | "classic";

function App() {
  const time = useSmoothTime();
  const { requestWakeLock } = useWakeLock();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeFace, setActiveFace] = useState<ClockType>("swiss");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Toggle Dark Mode Class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Handle Full Screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      requestWakeLock(); // Request wake lock when entering full screen
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  const renderFace = () => {
    switch (activeFace) {
      case "swiss":
        return <SwissRailwayClock date={time} />;
      case "classic":
        return <ClassicNumericClock date={time} />;
      default:
        return <SwissRailwayClock date={time} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden relative">
      {/* Clock Container */}
      <div
        className={`
        @container
        relative 
        aspect-square 
        w-[90vw] max-w-[500px] 
        ${isFullscreen ? "md:max-w-[80vh]" : ""}
        transition-all duration-500 ease-in-out
      `}
      >
        {renderFace()}
      </div>

      {/* Controls Overlay */}
      <div
        className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 
        bg-white/80 dark:bg-black/80 backdrop-blur-md 
        p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800
        flex items-center gap-6
        transition-opacity duration-500
        ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
        z-50
      `}
      >
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors text-gray-800 dark:text-gray-200"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700" />

        {/* Face Selectors */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFace("swiss")}
            className={`p-2 rounded-lg transition-all ${
              activeFace === "swiss"
                ? "bg-red-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
            }`}
            title="Swiss Railway"
          >
            Swiss
          </button>
          <button
            onClick={() => setActiveFace("classic")}
            className={`p-2 rounded-lg transition-all ${
              activeFace === "classic"
                ? "bg-orange-600 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
            }`}
            title="Classic Numeric"
          >
            Classic
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700" />

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullScreen}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors text-gray-800 dark:text-gray-200"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
      </div>

      {/* Mobile Hint */}
      {!isFullscreen && (
        <div className="absolute top-4 text-xs text-gray-400 flex items-center gap-2 opacity-50">
          <Smartphone size={14} />
          <span>Tap screen to show controls</span>
        </div>
      )}
    </div>
  );
}

export default App;
