import { useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={'w-full h-screen flex flex-col items-center justify-center gap-6 p-2'}>
      <h1 className={'text-neutral-300 text-5xl md:text-7xl'}>Ooops</h1>
      <p className={'text-neutral-400 text-md text-center'}>Sorry, an unexpected error has occurred.</p>
      <p className={'text-neutral-300 text-xl text-center'}>{error.statusText || error.message}</p>
    </div>
  );
}
