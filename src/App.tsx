import { useEffect, useState } from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchPhotosByKeyword, Photo } from "./photos-api";

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  useEffect(() => {
    if (!keyword) return;

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const data: Photo[] = await fetchPhotosByKeyword(page, keyword);
        setPhotos((prevPhotos) =>
          page === 1 ? data : [...(prevPhotos || []), ...data]
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

  const handleSearch = (newKeyword: string) => {
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
  const onOpenModal = (image: Photo) => {
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
};

export default App;
