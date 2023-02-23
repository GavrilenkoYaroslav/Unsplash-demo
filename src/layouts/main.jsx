import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <div className={'w-full min-h-screen py-10 md:px-[72px] md:py-[60px]'}>
      <Outlet />
    </div>
  );
}
