import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./FoodPartner_profile.css";

export default function FoodPartnerProfile() {
  const { partnerId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canUpload, setCanUpload] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`http://localhost:3000/api/food/partner/${partnerId}`);
        setProfile(response.data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.error || "Failed to load store profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [partnerId]);

  useEffect(() => {
    async function checkPartnerAuth() {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/foodpartner/me", {
          withCredentials: true,
        });

        const authenticatedPartnerId = response.data?.foodpartner?.id;
        setCanUpload(Boolean(authenticatedPartnerId && authenticatedPartnerId === partnerId));
      } catch {
        setCanUpload(false);
      }
    }

    checkPartnerAuth();
  }, [partnerId]);

  if (loading) {
    return (
      <main className="partner-profile-page">
        <section className="partner-profile-shell">
          <p className="partner-profile-status">Loading store profile...</p>
        </section>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="partner-profile-page">
        <section className="partner-profile-shell">
          <div className="partner-profile-error-card">
            <p className="partner-profile-status error">{error || "Store not found."}</p>
            <Link className="partner-back-link" to="/user/home">
              Back to feed
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const videoCount = profile.videos?.length || 0;

  return (
    <main className="partner-profile-page">
      <section className="partner-profile-shell">
        <div className="partner-profile-hero">
          <div className="partner-profile-glow partner-profile-glow-a" />
          <div className="partner-profile-glow partner-profile-glow-b" />

          <div className="partner-profile-topline">
            <span className="partner-profile-badge">Food Partner Profile</span>
            <div className="partner-profile-actions">
              {canUpload ? (
                <Link className="partner-upload-link" to="/foodpartner/VideoUpload">
                  Upload Videos
                </Link>
              ) : null}
              <Link className="partner-back-link" to="/user/home">
                Back
              </Link>
            </div>
          </div>

          <div className="partner-profile-copy">
            <h1>{profile.restaurantName}</h1>
            <p className="partner-profile-name">@{profile.name}</p>
            <p className="partner-profile-phone">Phone: {profile.phoneNumber}</p>
          </div>

          <div className="partner-hero-stats">
            <article className="partner-hero-stat primary">
              <span className="partner-hero-label">Videos Posted</span>
              <strong>{videoCount}</strong>
            </article>
            <article className="partner-hero-stat highlight">
              <span className="partner-hero-label">Total Likes</span>
              <strong>{profile.totalLikes}</strong>
            </article>
          </div>
        </div>

        <section className="partner-video-section">
          <div className="partner-video-heading">
            <h2>Posted Videos</h2>
            <p>All reels uploaded by this food partner.</p>
          </div>

          <div className="partner-video-grid">
            {profile.videos?.map((video) => (
              <article key={video.id} className="partner-video-card">
                <div className="partner-video-frame">
                  <video
                    className="partner-video-player"
                    src={video.src}
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>
                <div className="partner-video-copy">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <span className="partner-video-likes">{video.likes} likes</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
