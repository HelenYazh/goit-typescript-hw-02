import css from "./ImageCard.module.css";

const ImageCard = ({ alt, smallImg, likes }) => {
  return (
    <div>
      <img className={css.img} src={smallImg} alt={alt} />
      <p className={css.likes}>❤ Likes: {likes}</p>
    </div>
  );
};

export default ImageCard;
