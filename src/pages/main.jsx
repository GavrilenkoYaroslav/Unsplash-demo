import Grid from '../components/masonry';
import { Outlet } from 'react-router';
import { useMainPageData } from '../hooks/viewModels/useMainPageData';

export default function MainPage() {
  const { list, previewItem, prev, next } = useMainPageData();

  return (
    <>
      <Grid items={list} />
      <Outlet context={{ previewItem, next, prev }} />
    </>
  );
}
