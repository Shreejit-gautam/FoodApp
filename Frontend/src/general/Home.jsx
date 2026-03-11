import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const accent = "linear-gradient(180deg, #5f140d 0%, #1a0605 100%)";

const initReelVideos = [
  {
    id: "spice-route",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    storeName: "Spice Route Kitchen",
    description:
      "Smoky tandoori platters, fresh naan, and house chutneys served hot all evening.",
    likes: 128,
  },
];

function HeartIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      className="reel-heart-icon"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.5 4.9 13.8a4.8 4.8 0 0 1 0-6.9 4.9 4.9 0 0 1 7 0L12 8l.1-.1a4.9 4.9 0 0 1 7 0 4.8 4.8 0 0 1 0 6.9Z" />
    </svg>
  );
}

function Home() {
  const location = useLocation();
  const username = location.state?.user?.username || "Guest";

  const [reelVideos, setReelVideos] = useState(initReelVideos);
  const [activeVideoId, setActiveVideoId] = useState(initReelVideos[0]?.id || null);
  const [likedVideos, setLikedVideos] = useState([]);

  const sectionRefs = useRef([]);
  const videoRefs = useRef([]);
  const visibilityMap = useRef({});

  // fetch videos once
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get("http://localhost:3000/api/food/view", {
          withCredentials: true,
        });

        const incoming = Array.isArray(response.data) ? response.data : [];

        setReelVideos((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const newItems = incoming.filter((item) => item && !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      }
    }

    fetchVideos();
  }, []);

  // observe sections whenever reelVideos change
  useEffect(() => {
    const observedSections = sectionRefs.current.filter(Boolean);
    if (!observedSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.dataset.videoId;
          if (!videoId) return;

          visibilityMap.current[videoId] = {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
          };
        });

        const mostVisible = Object.entries(visibilityMap.current)
          .filter(([, value]) => value.isIntersecting)
          .sort((a, b) => b[1].intersectionRatio - a[1].intersectionRatio)[0];

        if (mostVisible) {
          const [videoId] = mostVisible;
          setActiveVideoId(videoId);
        }
      },
      { threshold: [0.45, 0.65, 0.85] }
    );

    observedSections.forEach((section) => {
      const videoId = section.dataset.videoId;
      if (videoId && !visibilityMap.current[videoId]) {
        visibilityMap.current[videoId] = {
          isIntersecting: false,
          intersectionRatio: 0,
        };
      }
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [reelVideos]);

  // play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;

      if (video.dataset.videoId === activeVideoId) {
        const playback = video.play();
        if (playback?.catch) {
          playback.catch((err) => {
            console.error("Autoplay failed:", video.dataset.videoId, err);
          });
        }
      } else {
        video.pause();
      }
    });
  }, [activeVideoId, reelVideos]);

  function handleLike(videoId) {
    setLikedVideos((currentLikes) =>
      currentLikes.includes(videoId)
        ? currentLikes.filter((id) => id !== videoId)
        : [...currentLikes, videoId]
    );
  }

  return (
    <main className="reel-feed" aria-label="Food reel feed">
      {reelVideos.map((video, index) => {
        const isLiked = likedVideos.includes(video.id);
        const displayLikes = (video.likes || 0) + (isLiked ? 1 : 0);

        return (
          <section
            key={video.id}
            ref={(element) => {
              sectionRefs.current[index] = element;
            }}
            className="reel-slide"
            data-video-id={video.id}
            style={{ background: accent }}
          >
            <video
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              className="reel-video"
              data-video-id={video.id}
              src={video.src}
              muted
              loop
              playsInline
              autoPlay={index === 0}
              preload="metadata"
            />

            <div className="reel-overlay" />

            <div className="reel-topbar">
              <span className="reel-pill">Food Reels</span>
              <span className="reel-greeting">Hi, {username}</span>
            </div>

            <div className="reel-content">
              <p className="reel-store">{video.storeName}</p>
              <p className="reel-description">{video.description}</p>
              <button type="button" className="visit-store-btn">
                Visit Store
              </button>
            </div>

            <button
              type="button"
              className={`reel-like-btn${isLiked ? " liked" : ""}`}
              onClick={() => handleLike(video.id)}
              aria-pressed={isLiked}
              aria-label={isLiked ? "Unlike this store" : "Like this store"}
            >
              <HeartIcon filled={isLiked} />
              <span className="reel-like-count">{displayLikes}</span>
            </button>
          </section>
        );
      })}
    </main>
  );
}

export default Home;