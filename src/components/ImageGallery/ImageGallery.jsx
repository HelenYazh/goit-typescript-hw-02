import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, onOpenModal }) => {
  return (
    <ul className={css.gallery}>
      {photos.map((photo) => {
        return (
          <li
            key={photo.id}
            className={css.galleryItem}
            onClick={() => onOpenModal(photo)}
          >
            <ImageCard
              alt={photo.alt_description}
              smallImg={photo.urls.small}
              likes={photo.likes}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
