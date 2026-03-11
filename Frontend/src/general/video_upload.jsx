import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./video_upload.css";

function formatFileSize(size) {
  if (!size) {
    return "No file selected";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export default function VideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!videoFile) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(videoFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [videoFile]);

  function handleVideoChange(event) {
    const file = event.target.files?.[0] || null;
    setVideoFile(file);
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!videoFile) {
      setStatus({ type: "error", message: "Please choose a video file before uploading." });
      return;
    }

    const payload = new FormData();
    payload.append("title", title.trim());
    payload.append("description", description.trim());
    payload.append("video", videoFile);

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post("http://localhost:3000/api/food/addinfo", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setDescription("");
      setVideoFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setStatus({ type: "success", message: "Video uploaded successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.error || "Video upload failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="upload-page">
      <section className="upload-shell">
        <div className="upload-header">
          <div>
            <div className="upload-badge">Food Partner Studio</div>
            <h1>Upload your next video reel</h1>
            <p>Add a title, short description, and a video file ready for your feed.</p>
          </div>
          <Link className="upload-back-link" to="/user/home">
            Preview feed
          </Link>
        </div>

        <div className="upload-layout">
          <form className="upload-form-card" onSubmit={handleSubmit}>
            <label className="upload-field">
              <span>Video title</span>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Butter chicken combo launch"
                required
              />
            </label>

            <label className="upload-field">
              <span>Description</span>
              <textarea
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Tell people what makes this item worth ordering."
                rows="5"
                required
              />
            </label>

            <label className="upload-dropzone" htmlFor="video-file">
              <input
                ref={fileInputRef}
                id="video-file"
                type="file"
                name="video"
                accept="video/*"
                onChange={handleVideoChange}
                hidden
              />
              <span className="upload-drop-kicker">Video file</span>
              <strong>{videoFile ? videoFile.name : "Choose a reel to upload"}</strong>
              <span className="upload-drop-help">
                MP4 and other browser-supported formats are accepted.
              </span>
              <span className="upload-drop-meta">{formatFileSize(videoFile?.size)}</span>
            </label>

            {status.message ? (
              <p className={`upload-status ${status.type}`}>{status.message}</p>
            ) : null}

            <button type="submit" className="upload-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload Video"}
            </button>
          </form>

          <aside className="upload-preview-card">
            <div className="upload-preview-top">
              <span className="upload-preview-label">Live Preview</span>
              <span className="upload-preview-chip">
                {title.trim() ? "Ready to post" : "Draft"}
              </span>
            </div>

            <div className="upload-preview-frame">
              {previewUrl ? (
                <video
                  className="upload-preview-video"
                  src={previewUrl}
                  controls
                  muted
                  playsInline
                />
              ) : (
                <div className="upload-preview-empty">
                  <strong>No video selected</strong>
                  <span>Your chosen reel will appear here before upload.</span>
                </div>
              )}
            </div>

            <div className="upload-preview-copy">
              <h2>{title.trim() || "Your video title"}</h2>
              <p>{description.trim() || "Add a short caption that sells the dish in one quick glance."}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
