'use client'

import { useState } from 'react'
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
  const [activePage, setActivePage] = useState('home')

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
        <h1>
          Crave<span>ly</span>
        </h1>
        <p>Student Food Discovery</p>
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
