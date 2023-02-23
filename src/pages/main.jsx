import Grid from '../components/masonry';
import { Outlet } from 'react-router';
import { useMainPageModel } from '../hooks/viewModels/useMainPageModel';

export default function MainPage() {
  const { list, previewItem, prev, next } = useMainPageModel();

  return (
    <>
      <Grid items={list} />
      <Outlet context={{ previewItem, next, prev }} />
    </>
  );
}
