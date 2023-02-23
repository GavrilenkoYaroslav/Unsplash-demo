import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import MainLayout from '../layouts/main';
import MainPage from '../pages/main';
import ImagePreview from '../components/modals/imagePreview';
import ErrorPage from '../pages/error';

export default createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        children: [
          {
            path: 'images/:id',
            element: <ImagePreview />,
          }
        ]
      }
    ],
  }
]);
