import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  title: string;
  modalImg: string;
  alt: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  title,
  modalImg,
  alt,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      contentLabel="Image Modal"
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <h2 className={css.title}>{title}</h2>
        <img className={css.modalImage} src={modalImg} alt={alt} />
      </div>
    </Modal>
  );
};

export default ImageModal;
