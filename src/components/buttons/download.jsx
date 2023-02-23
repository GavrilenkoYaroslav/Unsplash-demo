import Button from './base';
import ContextMenu from '../contextMenu';
import { useCallback, useRef, useState } from 'react';

import { ReactComponent as DropDownArrow } from '../../assets/icons/ChevronDownOutlined.svg';

export default function DownloadButton({ options, callback, contextPosition, contextOffset, className = '' }) {
  const [showOptions, setShowOptions] = useState(false);
  const boundRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  };

  const contextCallback = useCallback((value) => {
    if (value !== undefined && callback) callback(value);
    setShowOptions(false);
  }, [callback]);

  const hasOptions = options && !!options.length;

  return (
    <div ref={boundRef} className={className}>
      <Button onClick={toggleOptions} disabled={!hasOptions}
              className={'grid grid-cols-[minmax(0,_1fr),_32px] items-stretch h-8 w-[180px] gap-px bg-[rgb(119,_208,_140)] rounded overflow-hidden group'}>
        <div className={'flex items-center justify-center bg-[rgb(97,_177,_116)]'}>
          <span className={'text-sm text-white font-medium'}>
            Download free
          </span>
        </div>

        <div className={'w-8 flex items-center justify-center bg-[rgb(97,_177,_116)]'}>
          <DropDownArrow
            className={`transition-transform duration-300 group-hover:translate-y-0.5 ${showOptions ? '-scale-100' : ''}`} />
        </div>
      </Button>

      {hasOptions && showOptions &&
      <ContextMenu trigger={boundRef.current} callback={contextCallback} options={options} positioning={contextPosition}
                   offsets={contextOffset} />}
    </div>
  );
}
