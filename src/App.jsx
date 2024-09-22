import { useEffect, useState } from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchPhotosByKeyword } from "./photos-api";

function App() {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!keyword) return;

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const data = await fetchPhotosByKeyword(page, keyword);
        setPhotos((prevPhotos) =>
          page === 1 ? data : [...prevPhotos, ...data]
        );

        if (data.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (data.length === 0) {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page, keyword]);

  const handleSearch = (newKeyword) => {
    if (newKeyword === keyword) return;

    setError(false);
    setPhotos([]);
    setPage(1);
    setKeyword(newKeyword);
    setHasMore(true);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const onOpenModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const onCloseModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {photos !== null && (
        <ImageGallery photos={photos} onOpenModal={onOpenModal} />
      )}
      {photos !== null && hasMore && !loading && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={onCloseModal}
          modalImg={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          title={selectedImage.description}
        />
      )}
    </div>
  );
}

export default App;
