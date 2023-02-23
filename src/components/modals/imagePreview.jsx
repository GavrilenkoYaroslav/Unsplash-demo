import { useCallback, useRef } from 'react';
import BaseModal from './base';
import UserCard from '../user/card';
import DownloadButton from '../buttons/download';
import Button from '../buttons/base';
import { useNavigate } from 'react-router-dom';
import { useImagePreload } from '../../hooks/utility/useImagePreload';
import { usePreviewModel } from '../../hooks/viewModels/usePreviewData';
import { usePageTitle } from '../../hooks/utility/usePageTitle';
import { useMetaTags } from '../../hooks/utility/useMetaTags';

import { ReactComponent as ArrowLeft } from '../../assets/icons/ChevronLeftOutlined.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/ChevronRightOutlined.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/CloseFilled.svg';


export default function ImagePreview() {
  const { preview, description, avatar, name, download, isDownloading, downloadOptions, next, prev } = usePreviewModel();
  usePageTitle(name);
  useMetaTags([
    { name: 'description', content: description || '' },
    { property: 'og:title', content: name || '' },
    { property: 'og:description', content: description || '' },
    { property: 'og:image', content: preview || ''}
  ]);
  const loaded = useImagePreload(preview);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const onDownloadClick = useCallback((option) => {
    download(option);
  }, [download]);

  const close = useCallback(() => {
    modalRef.current.close();
  }, []);

  const onArrowClick = (e) => {
    navigate('/images/' + e.currentTarget.dataset.link);
  };

  return (
    <BaseModal ref={modalRef} overlayClassName={'cursor-zoom-out p-0 md:py-[60px] md:px-[72px]'}
               className={'cursor-default grid grid-rows-[auto,_minmax(0,_1fr),_164px] md:grid-rows-[auto,_minmax(0,_1fr)] items-center gap-4 px-0 pb-0 md:p-6'}>

      <div
        className={'absolute flex items-stretch md:items-center justify-center bg-black/50 md:bg-transparent md:justify-between z-10 h-[72px] md:h-full bottom-0 left-0 right-0 md:inset-0 md:pointer-events-none'}>
        <Button disabled={!prev} title={'Previous'} onClick={onArrowClick} data-link={prev}
                className={'pointer-events-auto w-[72px] md:h-64 flex items-center justify-center'}>
          <ArrowLeft />
        </Button>
        <div className={'flex md:absolute md:pointer-events-auto top-0 left-0'}>
          <Button onClick={close} title={'Close'} className={'p-4 md:p-7'}>
            <CloseIcon />
          </Button>
        </div>
        <Button disabled={!next} title={'Next'}  onClick={onArrowClick} data-link={next}
                className={'pointer-events-auto w-[72px] md:h-64 flex items-center justify-center'}>
          <ArrowRight />
        </Button>
      </div>

      <div className={'w-full flex items-center justify-between px-6 md:px-0'}>
        <UserCard avatar={avatar} name={name} />
        <DownloadButton options={downloadOptions} callback={onDownloadClick} contextPosition={'bottom-right'}
                        contextOffset={{ top: 12 }} className={'hidden md:block'} />
      </div>

      <div className={'h-full w-full flex items-center justify-center'}>
        {loaded.length ?
          <img src={preview} alt={description} className={'w-full h-full object-contain'} /> :
          <div className={'skeleton w-full md:w-1/2 h-full'} />}
      </div>

      <div className={'md:hidden pt-4 w-full h-full flex flex-col items-center justify-between'}>
        <DownloadButton options={downloadOptions} callback={onDownloadClick} contextPosition={'top-left'}
                        contextOffset={{ top: -12 }} />
      </div>

    </BaseModal>
  );
}
