import OfferItem from './offer-item.tsx';
import { TPreviewOffer, TOfferItemClassOptions } from '../../../types/offer.ts';

type OfferListProps = {
  offers: TPreviewOffer[];
  classOption: TOfferItemClassOptions;
  setCurrentOffer?: (offer: TPreviewOffer | undefined) => void;
}

export default function OfferList({ offers, classOption, setCurrentOffer }: OfferListProps) {
  const { placeListClass } = classOption;
  return (
    <div className={ placeListClass }>
      { offers.map((offer) => (
        <OfferItem
          key={ offer.id }
          offer={ offer }
          classOptions={ classOption }
          setCurrentOffer= { setCurrentOffer }
        />))}
    </div>
  );
}
