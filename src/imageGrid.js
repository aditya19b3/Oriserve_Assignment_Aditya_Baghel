import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function Grid() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const apiKey = "5efaaba96891eead7e6e71ddd40fb5bf";
    const apiSecret = "64258033014ec1d4";

    const loadMoreData = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const flickrEndpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&nojsoncallback=1&safe_search=1&page=${page}`;
        const response = await fetch(flickrEndpoint);
        const data = await response.json();

        if (data && data.photos && data.photos.photo) {
          setPhotos((prevPhotos) => [...prevPhotos, ...data.photos.photo]);
          setPage(page + 1); // Increment the page number
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetHeight - 100
      ) {
        loadMoreData();
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Load initial data
    loadMoreData();

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading]);

  return (
    <div>
      {/* <h1>Recent Flickr Photos</h1> */}
      <div className="photogrid" ref={containerRef}>
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              alt={photo.title}
            />
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default Grid;
