import Link from 'next/link'


export function Footer ({ description, link, textLink }) {
  return (
    <div className='w-full flex justify-center mt-3'>
      <span className='text-[12px]'>
        {description}{' '}
        <Link href={link} className='font-bold'>
          {textLink}
        </Link>
      </span>
    </div>
  )
}