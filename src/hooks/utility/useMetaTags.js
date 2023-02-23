import { useEffect } from 'react';

const useMetaTags = (metaData) => {

  useEffect(() => {
    let tags = [];
    for (let data of metaData) {
      const tag = document.createElement('meta');

      Object.assign(tag, data);
      if (data.hasOwnProperty('property')) {
        tag.setAttribute('property', data.property);
      }

      tags.push(tag);
      document.head.prepend(tag);
    }

    return () => {
      tags.forEach(tag => tag.remove());
    }
  }, [metaData]);
};

export {
  useMetaTags,
}
