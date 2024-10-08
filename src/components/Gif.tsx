import { useState, useEffect } from 'react';

interface GifComponentProps {
  staticSrc: string;  // Path to the static image (first frame or placeholder)
  gifSrc: string;     // Path to the GIF image
  gifDuration: number; // Number of milliseconds
  alt?: string;   // Alternative text for accessibility
}

const Gif: React.FC<GifComponentProps> = ({
  staticSrc,
  gifSrc,
  gifDuration,
  alt = 'GIF'
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(gifSrc); // Start with the GIF
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);   // Track if GIF has played

  // Hardcoded duration of 3 seconds
  const duration = gifDuration; // Duration to play the GIF before switching back

  useEffect(() => {
    console.log("Use Effect Called")
    const timer = setTimeout(() => {
      if (!hasPlayed) {
        setHasPlayed(true); // Mark that the GIF has played
      } else {
        setCurrentSrc(staticSrc); // Switch back to static image
      }
    }, hasPlayed ? duration : 100); // Start GIF playback with a delay

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [hasPlayed, staticSrc]);

  const handleMouseEnter = () => {
    setCurrentSrc(gifSrc);  // Switch to GIF when hovered
  };

  // Function to handle mouse leave (reset to static)
  const handleMouseLeave = () => {
    setCurrentSrc(staticSrc);  // Reset to static image
  };

  return (
    <div>
      <img
        src={currentSrc}
        alt={alt}
        onMouseEnter={handleMouseEnter}  // Play GIF on hover
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }} // Optional: Change cursor on hover for interactivity
      />
    </div>
  );
};

export default Gif;