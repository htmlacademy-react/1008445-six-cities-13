import OfferItem from './offer-item.tsx';
import { Offer, OfferItemClassOptions } from '../../../types/offer.ts';

type OfferListProps = {
  offers: Offer[];
  classOption: OfferItemClassOptions;
  onOfferHoverHandler?: (id: string) => void;
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
