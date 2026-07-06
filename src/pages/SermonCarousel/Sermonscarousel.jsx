import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Sermonscarousel.css'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UC2sj_jlpxpaR1lbUKZpirRg'
const MAX_RESULTS = 8

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function SkeletonCard() {
  return (
    <div className="sc-card sc-skeleton">
      <div className="sc-thumb sc-skel-block" />
      <div className="sc-meta">
        <div className="sc-skel-line sc-skel-line--title" />
        <div className="sc-skel-line sc-skel-line--date" />
      </div>
    </div>
  )
}

export default function SermonsCarousel() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        // Derive uploads playlist ID from channel ID
        const playlistId = 'UU' + CHANNEL_ID.slice(2)

        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${API_KEY}`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`YouTube API error: ${res.status}`)
        const data = await res.json()

        if (!data.items?.length) throw new Error('No videos found.')

        const mapped = data.items
          .filter(item => item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
          .map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            date: item.snippet.publishedAt,
            thumbnail:
              item.snippet.thumbnails?.maxres?.url ||
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url,
          }))

        setVideos(mapped)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = el.querySelector('.sc-card')?.offsetWidth || 320
    el.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' })
  }

  return (
    <div className="sc-root">
      {/* Nav arrows */}
      {/* <div className="sc-controls">
        <button
          className="sc-arrow"
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="sc-arrow"
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div> */}

      {/* Track */}
      <div
        className="sc-track"
        ref={trackRef}
        onScroll={updateScrollState}
      >
        {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}

        {error && (
          <div className="sc-error">
            <p>Could not load sermons.</p>
            <small>{error}</small>
          </div>
        )}

        {!loading && !error && videos.map((video) => (
          <a
            key={video.id}
            className="sc-card"
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sc-thumb">
              <img src={video.thumbnail} alt={video.title} loading="lazy" />
              <div className="sc-play">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="sc-meta">
              <p className="sc-title">{video.title}</p>
              <p className="sc-date">{formatDate(video.date)}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}