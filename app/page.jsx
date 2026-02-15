'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import HomePage from '../components/HomePage'
import SearchPage from '../components/SearchPage'
import ReviewsPage from '../components/ReviewsPage'
import OffersPage from '../components/OffersPage'
import ProfilePage from '../components/ProfilePage'

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'search', label: 'Search' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'offers', label: 'Offers' },
  { id: 'profile', label: 'Profile' },
]

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <main className="menu-card">
        <header className="menu-header">
          <h1>Crave<span>ly</span></h1>
          <p>Student Food Discovery</p>
        </header>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--gray)' }}>
          Loading...
        </div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  function renderPage() {
    switch (activePage) {
      case 'home': return <HomePage />
      case 'search': return <SearchPage />
      case 'reviews': return <ReviewsPage />
      case 'offers': return <OffersPage />
      case 'profile': return <ProfilePage />
      default: return <HomePage />
    }
  }

  return (
    <main className="menu-card">
      <header className="menu-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>
              Crave<span>ly</span>
            </h1>
            <p>Student Food Discovery</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--orange)' }}
                referrerPolicy="no-referrer"
              />
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              style={{
                background: 'var(--orange)',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <nav className="menu-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activePage === tab.id ? 'active' : ''}
            onClick={() => setActivePage(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {renderPage()}

      <footer className="menu-footer">
        <p>CRAVELY &middot; A College Project &middot; Work in Progress</p>
      </footer>
    </main>
  )
}
