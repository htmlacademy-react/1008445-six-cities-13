type InsideItemsProps = {
  goods: string[];
}

export default function InsideItemList({ goods }: InsideItemsProps) {
  return (
    <ul className="offer__inside-list">
      { (goods.map((item) =>
        <li key={ item } className="offer__inside-item">${ item }</li>)
      ) }
    </ul>
  );
}
