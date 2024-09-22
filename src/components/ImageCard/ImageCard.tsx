import css from "./ImageCard.module.css";

interface ImageCardProps {
  alt: string;
  smallImg: string;
  likes: number;
}

const ImageCard: React.FC<ImageCardProps> = ({ alt, smallImg, likes }) => {
  return (
    <div>
      <img className={css.img} src={smallImg} alt={alt} />
      <p className={css.likes}>❤ Likes: {likes}</p>
    </div>
  );
};

export default ImageCard;
