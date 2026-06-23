import { useState, useEffect, useRef } from 'react'
import './sermonStyles.css'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

// ─── YouTube config (set these in your .env) ──────────────────────────────────
const API_KEY     = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_ID  = import.meta.env.VITE_YOUTUBE_CHANNEL_ID
const MAX_RESULTS = 12

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchSermons() {
  // 1. Get the channel's uploads playlist ID
  const chRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
  )
  if (!chRes.ok) throw new Error('Could not reach YouTube. Check your API key.')
  const chData = await chRes.json()
  const uploadsId = chData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsId) throw new Error('Uploads playlist not found for this channel.')

  // 2. Get latest videos from that playlist
  const plRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsId}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
  )
  if (!plRes.ok) throw new Error('Failed to fetch playlist.')
  const plData = await plRes.json()

  // 3. Get durations via the videos endpoint
  const ids = plData.items.map(i => i.contentDetails.videoId).join(',')
  const vRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${API_KEY}`
  )
  const vData = await vRes.json()
  const durMap = {}
  vData.items?.forEach(v => { durMap[v.id] = parseDuration(v.contentDetails.duration) })

  return plData.items.map(item => {
    const id      = item.contentDetails.videoId
    const snippet = item.snippet
    return {
      id,
      title:       snippet.title,
      description: snippet.description,
      publishedAt: snippet.publishedAt,
      thumbnail:
        snippet.thumbnails?.maxres?.url ||
        snippet.thumbnails?.high?.url   ||
        snippet.thumbnails?.medium?.url,
      duration: durMap[id] || '',
    }
  })
}

function parseDuration(iso = '') {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = parseInt(m[1] || 0, 10)
  const min = parseInt(m[2] || 0, 10)
  return h > 0 ? `${h}h ${min}m` : `${min}m`
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ─── Video Card ───────────────────────────────────────────────────────────────

function SermonCard({ video, featured = false }) {
  return (
    <a
      className={`sermon-card ${featured ? 'sermon-card--featured' : ''}`}
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${video.title}`}
    >
      <div className="sermon-card__thumb">
        {video.thumbnail
          ? <img src={video.thumbnail} alt={video.title} loading="lazy" />
          : <div className="sermon-card__thumb-placeholder" />
        }
        <div className="sermon-card__play">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        {video.duration && <span className="sermon-card__duration">{video.duration}</span>}
      </div>

      <div className="sermon-card__body">
        <span className="sermon-card__date">{formatDate(video.publishedAt)}</span>
        <h3 className="sermon-card__title">{video.title}</h3>
        {featured && video.description && (
          <p className="sermon-card__desc">
            {video.description.slice(0, 140).trim()}{video.description.length > 140 ? '…' : ''}
          </p>
        )}
        <span className="sermon-card__link">
          Watch sermon
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </a>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard({ featured = false }) {
  return (
    <div className={`sermon-card sermon-card--skeleton ${featured ? 'sermon-card--featured' : ''}`}>
      <div className="sermon-card__thumb sermon-skeleton" />
      <div className="sermon-card__body">
        <div className="sermon-skeleton sermon-skeleton--short" />
        <div className="sermon-skeleton sermon-skeleton--long" />
        {featured && <div className="sermon-skeleton sermon-skeleton--med" />}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SermonsPage() {
  const [sermons,  setSermons]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [query,    setQuery]    = useState('')

  useEffect(() => {
    fetchSermons()
      .then(setSermons)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Client-side search filter
  const filtered = query.trim()
    ? sermons.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      )
    : sermons

  const [featured, ...rest] = filtered

  return (
    <>
      <Navbar />

      <main className="sermons-page">

        {/* ── Hero intro ── */}
        <section className="sermons-intro">
          <div className="sermons-intro__inner">
            <span className="sermons-eyebrow">The Archives</span>
            <h1 className="sermons-heading">Sermons</h1>
            <p className="sermons-subheading">
              Every message is a step forward. Dive into our library and find the
              word that meets you where you are.
            </p>

            {/* Search */}
            <div className="sermons-search">
              <svg className="sermons-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                className="sermons-search__input"
                placeholder="Search sermons, speakers, series…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search sermons"
              />
              {query && (
                <button className="sermons-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                  ×
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Sermon grid ── */}
        <section className="sermons-grid-section">

          {/* Error */}
          {error && (
            <div className="sermons-state sermons-state--error">
              <p>Could not load sermons.</p>
              <span>{error}</span>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && !error && (
            <div className="sermons-grid">
              <SkeletonCard featured />
              {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Search: no results */}
          {!loading && !error && filtered.length === 0 && query && (
            <div className="sermons-state">
              <p>No sermons match "<strong>{query}</strong>".</p>
              <button className="sermons-reset" onClick={() => setQuery('')}>Clear search</button>
            </div>
          )}

          {/* Empty channel */}
          {!loading && !error && sermons.length === 0 && !query && (
            <div className="sermons-state">
              <p>No sermons uploaded yet. Check back soon.</p>
            </div>
          )}

          {/* Results */}
          {!loading && !error && filtered.length > 0 && (
            <div className="sermons-grid">
              {featured && <SermonCard video={featured} featured />}
              {rest.map(video => <SermonCard key={video.id} video={video} />)}
            </div>
          )}

          {/* YouTube CTA */}
          {!loading && !error && sermons.length > 0 && (
            <div className="sermons-cta">
              <a
                href={`https://www.youtube.com/channel/@TheActiveChurch`}
                target="_blank"
                rel="noopener noreferrer"
                className="sermons-cta__link"
              >
                View all sermons on YouTube
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  )
}

export default SermonsPage