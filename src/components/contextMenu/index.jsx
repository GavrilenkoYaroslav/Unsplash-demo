import ReactDOM from 'react-dom';
import { useMemo, useRef } from 'react';
import { useBounds } from '../../hooks/utility/useWindowBounds';
import { useClickOutside } from '../../hooks/utility/useClickOutside';

const supportedPositioning = {
  TOP_LEFT: 'top-left',
  BOTTOM_LEFT: 'bottom-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_RIGHT: 'bottom-right',
};

export default function ContextMenu({ trigger, options, callback, positioning = supportedPositioning.TOP_LEFT, offsets, className = '' }) {
  const selfRef = useRef(null);
  const triggerBounds = useBounds(trigger, true);
  const transform = useMemo(() => getTransform(triggerBounds, positioning), [triggerBounds, positioning]);
  useClickOutside(selfRef.current, trigger, callback, true);

  function getTransform(triggerBounds, position) {
    let result;
    if (!Object.values(supportedPositioning).includes(positioning)) {
      console.error(`Unhandled positioning '${positioning}'`);
    }

    if (triggerBounds && position) {
      switch (position) {
        case supportedPositioning.TOP_LEFT: {
          result = `translate(${triggerBounds.left}px, calc(-100% + ${triggerBounds.top}px))`;
          break;
        }
        case supportedPositioning.TOP_RIGHT: {
          result = `translate(calc(-100% + ${triggerBounds.right}px), calc(-100% + ${triggerBounds.top}px))`;
          break;
        }
        case supportedPositioning.BOTTOM_LEFT: {
          result = `translate(${triggerBounds.left}px, ${triggerBounds.bottom}px)`;
          break;
        }
        case supportedPositioning.BOTTOM_RIGHT: {
          result = `translate(calc(-100% + ${triggerBounds.right}px), ${triggerBounds.bottom}px)`;
          break;
        }
      }
    }

    return result;
  }

  const onSelect = (e) => {
    callback(e.currentTarget.dataset.value);
  };

  return ReactDOM.createPortal(
    <div ref={selfRef}
         className={`fixed z-20 w-60 bg-neutral-1000 rounded shadow-sm overflow-hidden py-2 before:absolute before:inset-0 before:bg-white/[0.12] ${className}`}
         style={transform ? { top: offsets?.top || 0, left: offsets?.left || 0, transform } : { display: 'none' }}>
      <ul className={'relative z-10 w-full gap-px flex flex-col'}>
        {options.map(option =>
          <li key={option} onClick={onSelect} data-value={option}
              className={`relative w-full flex-1 px-4 py-1 hover:cursor-pointer ${options.length > 1 ? 'last:after:absolute last:after:w-full last:after:h-px last:after:bg-white/[0.12] last:after:top-0 last:after:left-0' : ''}`}>
            <div className={'flex items-center justify-start text-white text-sm'}>
              {option}
            </div>
          </li>
        )}
      </ul>
    </div>
    , document.body);
}
