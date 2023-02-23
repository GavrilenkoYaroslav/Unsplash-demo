import React from 'react';
import { Link } from 'react-router-dom';
import { useImagePreload } from '../../hooks/utility/useImagePreload';

export default function Photo({ src, desc, link, className = '' }) {
  const loaded = useImagePreload(src);

  let element = 'div';
  const props = { className };

  if (link) {
    element = Link;
    props.to = link;
  }

  return React.createElement(
    element,
    props,
    loaded.length ?
      <img src={src} alt={desc} loading={'lazy'} className={'w-full select-none'} /> :
      <div className={'skeleton h-96'}/>
  );
}
