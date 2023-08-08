import { MAX_VISIBLE_IMAGES } from '../../../const.ts';

type ImagesProps = {
  images: string[];
}

export default function ImageList({ images }: ImagesProps) {
  return (
    <div className="offer__gallery">
      { images.slice(0, MAX_VISIBLE_IMAGES).map((imageUrl) => (
        <div key={ imageUrl } className="offer__image-wrapper">
          <img className="offer__image" src={ imageUrl } alt="Photo studio"/>
        </div>
      ))}
    </div>
  );
}
