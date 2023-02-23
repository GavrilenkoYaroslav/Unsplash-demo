import { useCallback, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router';
import ServiceApi from '../../api/service';

function usePreviewModel() {
  const { previewItem, prev, next } = useOutletContext();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadParams = useMemo(() => ({
    'Small': { w: 640, h: 960 },
    'Medium': { w: 1920, h: 2880 },
    'Large': { w: 2400, h: 3600 },
    'Original': { w: previewItem?.width, h: previewItem?.height },
  }), [previewItem]);

  const downloadOptions = useMemo(() => {
    if (!previewItem) return [];
    return Object.keys(downloadParams).map(key => `${key} (${downloadParams[key].w} x ${downloadParams[key].h})`)
  }, [downloadParams, previewItem]);

  const download = useCallback( async (option) => {
    const key = option.replace(/\s\(\d*\sx\s\d*\)/, '');
    setIsDownloading(true);
    await ServiceApi.downloadPhoto(previewItem.urls.raw, downloadParams[key]);
    setIsDownloading(false);
  }, [downloadParams, previewItem]);

  return {
    preview: previewItem?.urls.regular,
    description: previewItem?.description,
    avatar: previewItem?.user.profile_image.medium,
    name: previewItem?.user.name,
    download,
    isDownloading,
    downloadOptions,
    next: next?.id,
    prev: prev?.id,
  };
}

export {
  usePreviewModel,
}
