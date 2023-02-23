import { useCallback, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router';
import ServiceApi from '../../api/service';
import { usePageTitle } from '../utility/usePageTitle';
import { useMetaTags } from '../utility/useMetaTags';
import { useImagePreload } from '../utility/useImagePreload';

function usePreviewModel() {
  const { previewItem, prev, next } = useOutletContext();
  const [isDownloading, setIsDownloading] = useState(false);

  const preview = previewItem?.urls.regular;
  const description = previewItem?.description;
  const avatar = previewItem?.user.profile_image.medium;
  const name = previewItem?.user.name;

  const loaded = useImagePreload([preview, avatar]);
  usePageTitle(name);
  useMetaTags([
    { name: 'description', content: description || '' },
    { property: 'og:title', content: name || '' },
    { property: 'og:description', content: description || '' },
    { property: 'og:image', content: preview || '' }
  ]);

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

  const download = useCallback(async (option) => {
    const key = option.replace(/\s\(\d*\sx\s\d*\)/, '');
    setIsDownloading(true);
    await ServiceApi.downloadPhoto(previewItem.urls.raw, downloadParams[key]);
    setIsDownloading(false);
  }, [downloadParams, previewItem]);

  return {
    preview: loaded.includes(preview) ? preview : null,
    description,
    avatar: loaded.includes(avatar) ? avatar : null,
    name,
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
