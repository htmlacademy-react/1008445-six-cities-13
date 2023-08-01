import { SortType } from '../../../const.ts';
import { useAppDispatch } from '../../../hooks';
import { changeSortOption } from '../../../store/action.ts';
import * as classNames from 'classnames';
import { useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/use-outside-click.ts';

type SortingProps = {
  selectedSortOption: string;
}

export default function Sorting({ selectedSortOption }: SortingProps) {
  const dispatch = useAppDispatch();
  const [ isOpened, setOpened ] = useState(false);
  const sortingRef = useRef(null);
  useOutsideClick(sortingRef, isOpened, setOpened);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={ () => setOpened(!isOpened) }
      >
        { selectedSortOption }
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={ `places__options places__options--custom ${ isOpened ? 'places__options--opened' : 'places__options--closed'} ` }
        ref={ sortingRef }
      >
        {
          Object.values(SortType).map((option) => (
            <li
              key={ option }
              className={ classNames('places__option', { 'places__option--active': selectedSortOption === option }) }
              onClick={ () => {
                dispatch(changeSortOption(option));
                setOpened(false);
              }}
            >
              { option }
            </li>
          ))
        }
      </ul>
    </form>
  );
}
