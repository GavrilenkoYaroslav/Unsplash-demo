import { useImagePreload } from '../../hooks/utility/useImagePreload';

export default function UserCard({ avatar, name }) {
  const loaded = useImagePreload(avatar);

  return (
    <div className={'flex gap-3 items-center'}>
      <div
        className={'w-10 h-10 rounded-full overflow-hidden flex items-center justify-center [&_*]:w-full [&_*]:h-full'}>
        {loaded.length ?
          <img src={avatar} alt={'Avatar'} /> :
          <div className={'skeleton'} />}
      </div>
      <div className={'flex items-center'}>
          <span className={`text-black-soft ${!name ? 'skeleton skeleton-text min-w-[100px]' : ''}`}>
            {name}
          </span>
      </div>
    </div>
  )
}
