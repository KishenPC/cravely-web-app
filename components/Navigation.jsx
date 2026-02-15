'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'search', label: 'Search', path: '/search' },
  { id: 'reviews', label: 'Reviews', path: '/reviews' },
  { id: 'offers', label: 'Offers', path: '/offers' },
  { id: 'profile', label: 'Profile', path: '/profile' },
]

export default function Navigation({ children }) {
  const pathname = usePathname()

  return (
    <main className="menu-card">
      <header className="menu-header">
        <h1>
          Crave<span>ly</span>
        </h1>
        <p>Student Food Discovery</p>
      </header>

      <nav className="menu-nav">
        {tabs.map(tab => {
          const isActive = pathname === tab.path
          return (
            <Link
              key={tab.id}
              href={tab.path}
              className={isActive ? 'active' : ''}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>

      {children}

      <footer className="menu-footer">
        <p>CRAVELY &middot; A College Project &middot; Work in Progress</p>
      </footer>
    </main>
  )
}

