'use client'

import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/20/solid'

export default function HomeNav() {
  // const user = Cookies.get('accesstoken')
  return (
    <header className="bg-gray-500">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              alt="Testimonial"
              src="../../public/istockphoto-1183790559-612x612.jpg"
              className="h-8 w-auto rounded-lg"
            />
          </Link>
        </div>
        <div className="flex lg:flex-1 lg:justify-end">
          <Link to="/profile" aria-label="Profile">
            <UserIcon className="h-6 w-6 text-white" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
