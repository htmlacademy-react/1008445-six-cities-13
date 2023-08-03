import { SortType } from '../../../const.ts';
import cn from 'classnames';
import { useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/use-outside-click.ts';

type SortingProps = {
  currentSorting: string;
  setSorting: (sorting: SortType) => void;
}

export default function Sorting({ currentSorting, setSorting }: SortingProps) {
  const [ isOpened, setOpened ] = useState(false);
  const sortingRef = useRef(null);
  useOutsideClick(sortingRef, isOpened, setOpened);
  const sortingOnClickHandler = (option: SortType) => {
    setSorting(option);
    setOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={ () => setOpened(!isOpened) }
      >
        { currentSorting }
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={ `places__options places__options--custom ${ isOpened ? 'places__options--opened' : 'places__options--closed'} ` }
        ref={ sortingRef }
      >
        {
          Object.values(SortType).map((sorting) => (
            <li
              key={ sorting }
              className={ cn('places__option', { 'places__option--active': currentSorting === sorting }) }
              onClick={ () => sortingOnClickHandler(sorting) }
            >
              { sorting }
            </li>
          ))
        }
      </ul>
    </form>
  );
}
