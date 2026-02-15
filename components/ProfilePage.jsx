"use client"

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <div className="page-content">Loading profile...</div>;
  if (error) return <div className="page-content">Error: {error}</div>;
  if (!profile) return <div className="page-content">No profile found.</div>;

  return (
    <div className="page-content" key="profile">
      <div className="section-label">Profile</div>

      <div className="profile-header-section">
        <div className="profile-avatar">{profile.name ? profile.name.split(' ').map(n => n[0]).join('') : ''}</div>
        <div className="profile-name">{profile.name}</div>
        <div className="profile-college">{profile.college}</div>
      </div>

      <div className="points-card">
        <div className="points-label">Cravely Points</div>
        <div className="points-value">{profile.points}</div>
        <div className="points-sub">Earn more by writing reviews</div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-number">{profile.reviews}</div>
          <div className="stat-label">Reviews</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{profile.upvotes}</div>
          <div className="stat-label">Upvotes</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">{profile.photos}</div>
          <div className="stat-label">Photos</div>
        </div>
      </div>

      <div className="section-label">Redeem Rewards</div>
      <div className="rewards-grid">
        {profile.rewards && profile.rewards.length > 0 ? (
          profile.rewards.map((r, i) => (
            <div className="reward-card" key={i}>
              <div className="reward-info">
                <h4>{r.title}</h4>
                <p>{r.desc} &middot; {r.cost} pts</p>
              </div>
              <button className={'reward-btn' + (r.canAfford ? '' : ' disabled')}>
                {r.canAfford ? 'Redeem' : 'Need more'}
              </button>
            </div>
          ))
        ) : (
          <div>No rewards available.</div>
        )}
      </div>

      <div className="divider"></div>

      <div style={{ marginBottom: '12px' }}>
        <span className="wip-badge">Settings and edit profile coming soon</span>
      </div>

      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
        <p>Profile editing, order history, and settings are not built yet.</p>
      </div>
    </div>
  )
}
