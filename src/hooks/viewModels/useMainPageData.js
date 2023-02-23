import { useCallback, useEffect, useState } from 'react';
import { useMatch } from 'react-router';
import { usePhotos } from '../queries/usePhotos';
import { usePhoto } from '../queries/usePhoto';
import { useScrollBottomTrigger } from '../utility/useScrollBottomTriger';

const useMainPageData = () => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const match = useMatch('/images/:id');
  const photoId = match?.params?.id;

  const { data, isLoading, error } = usePhotos(currentPage, itemsPerPage);
  const { data: item, isLoading: isPreviewLoading, error: previewError } = usePhoto(photoId, data.entities.has(photoId));

  const loadNextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!photoId || !data.items.length) return;
    const index = data.items.findIndex(item => item.id === photoId);
    setCurrentStep(index);
  }, [photoId, data]);

  useEffect(() => {
    if (!data.items.length) return;
    if (currentStep >= data.items.length - 2) loadNextPage();
  }, [currentStep, data.items, loadNextPage]);

  useScrollBottomTrigger(loadNextPage, 200, !data.items.length || isLoading);
  const next = data.items[currentStep + 1];
  const prev = data.items[currentStep - 1];
  const previewItem = data.items[currentStep] || item;
  const list = data.items;

  return { list, previewItem, next, prev };
};

export {
  useMainPageData,
}
