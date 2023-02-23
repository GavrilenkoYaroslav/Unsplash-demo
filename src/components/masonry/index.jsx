import { useMemo, useState } from 'react';
import Photo from '../photo';
import { useBreakpoint } from '../../hooks/utility/useBreakpoint';

const breakpointColsCount = {
  'xs': 1,
  'sm': 1,
  'md': 2,
  'lg': 3,
  'xl': 3,
  '2xl': 3,
};

export default function Grid({ items, className = '' }) {
  const { key: breakpointKey } = useBreakpoint(({ key }) => setColsCount(breakpointColsCount[key]));
  const [colsCount, setColsCount] = useState(breakpointColsCount[breakpointKey]);

  const grid = useMemo(() => {
    const columns = Array.from({ length: colsCount }, () => []);
    const columnsAspects = columns.map((_, i) => ({ colIndex: i, acc: 0 }));

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const columnIndex = columnsAspects[0].colIndex;

      columns[columnIndex].push(item);

      columnsAspects[0].acc += item.height / item.width;
      columnsAspects.sort((col1, col2) => col1.acc - col2.acc);
    }

    return columns;
  }, [items, colsCount]);

  return (
    <div className={`w-full grid gap-6 ${className}`}
         style={{ gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))` }}>
      {grid.map((col, i) =>
        <div key={i} className={`w-full grid grid-cols-1 auto-rows-max gap-6`}>
          {col.map(item =>
            <Photo key={item.id} src={item.urls.regular} desc={item.description} link={`/images/${item.id}`}
                   className={'cursor-zoom-in overflow-hidden hover:scale-[1.02] duration-500 transition-transform [&_img]:hover:scale-105 [&_img]:duration-1000 [&_img]:transition-transform'}/>
          )}
        </div>
      )}
    </div>
  );
}
