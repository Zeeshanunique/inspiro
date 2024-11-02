import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-10 flex-col'>
        <Image src='/placeholder.png' alt='Empty State' width={200} height={200}/>
        <h2 className='font-medium text-lg text-gray-500'>Create new AI Interior design</h2>
        <Link href={"/dashboard/create-new"} className='mt-5'>
            <Button>+ Redesign Room</Button>
        </Link>
    </div>
  )
}

export default EmptyState