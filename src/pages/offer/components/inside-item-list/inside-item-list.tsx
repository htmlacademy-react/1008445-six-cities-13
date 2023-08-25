type InsideItemsProps = {
  goods: string[];
}

export default function InsideItemList({ goods }: InsideItemsProps) {
  return (
    <ul className="offer__inside-list" data-testid="inside-item-list">
      { (goods.map((item) =>
        <li key={ item } className="offer__inside-item" data-testid="inside-list-item">{ item }</li>)
      ) }
    </ul>
  );
}
