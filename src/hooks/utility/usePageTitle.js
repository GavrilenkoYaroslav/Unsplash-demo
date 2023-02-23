import { useEffect } from 'react';

const usePageTitle = (title) => {

  useEffect(() => {
    document.title = `Unsplash-demo - ${title}`;

    return () => {
      document.title = 'Unsplash-demo';
    }
  }, [title]);
};

export {
  usePageTitle,
}
