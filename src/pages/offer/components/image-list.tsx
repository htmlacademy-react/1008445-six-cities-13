import { OfferLimits } from '../../../const.ts';

type ImagesProps = {
  images: string[];
}

export default function ImageList({ images }: ImagesProps) {
  return (
    <div className="offer__gallery" data-testid="image-item-list">
      { images.slice(0, OfferLimits.imageVisibleCount).map((imageUrl) => (
        <div key={ imageUrl } className="offer__image-wrapper" data-testid="image-item">
          <img className="offer__image" src={ imageUrl } alt="Photo studio"/>
        </div>
      ))}
    </div>
  );
}
