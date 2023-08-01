import OfferItem from './offer-item.tsx';
import { TPreviewOffer, TOfferItemClassOptions } from '../../../types/offer.ts';

type OfferListProps = {
  offers: TPreviewOffer[];
  classOption: TOfferItemClassOptions;
  onOfferHoverHandler?: (offer: TPreviewOffer | null) => void;
}

export default function OfferList({ offers, classOption, onOfferHoverHandler }: OfferListProps) {
  const { placeListClass } = classOption;
  return (
    <div className={ placeListClass }>
      { offers.map((offer) => (
        <OfferItem
          key={ offer.id }
          offer={ offer }
          classOptions={ classOption }
          onOfferHoverHandler = { onOfferHoverHandler }
        />))}
    </div>
  );
}
