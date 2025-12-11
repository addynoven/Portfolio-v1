import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const Song = ({ onClose }) => {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${import.meta.env.VITE_LASTFM_USERNAME}&api_key=${import.meta.env.VITE_LASTFM_API_KEY}&format=json&limit=5`
        const res = await fetch(url)
        const data = await res.json()
        
        const trackList = data.recenttracks?.track || []
        const formattedTracks = trackList.map(t => ({
          nowPlaying: t['@attr']?.nowplaying === 'true',
          name: t.name,
          artist: t.artist['#text'],
          album: t.album['#text'],
          image: t.image?.[3]?.['#text'] || t.image?.[2]?.['#text'],
          url: t.url,
          date: t.date?.['#text'] || null
        }))
        
        setTracks(formattedTracks)
        setError(false)
      } catch (err) {
        console.error('Error fetching Last.fm data:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTracks()
  }, [])

  useGSAP(() => {
    gsap.from('.song-modal', {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
    gsap.from('.song-overlay', {
      opacity: 0,
      duration: 0.3
    })
  })

  const nowPlaying = tracks.find(t => t.nowPlaying)
  const recentTracks = tracks.filter(t => !t.nowPlaying).slice(0, 4)

  return createPortal(
    <div className="song-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm [&_*]:scrollbar-none [&_*]:[-ms-overflow-style:none] [&_*]:[scrollbar-width:none] [&_*::-webkit-scrollbar]:hidden" onClick={onClose}>
      <div className="song-modal bg-black rounded-2xl border border-[#c8c8c8]/20 w-full max-w-sm m-4 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        
        <div className="flex justify-between items-center p-4 border-b border-[#4ade80]/10">
          <h2 className="text-lg font-bold text-[#4ade80] font-[font1]">🎵 Music</h2>
          <button 
            onClick={onClose}
            className="text-[#c8c8c8] hover:text-[#4ade80] transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse text-[#c8c8c8]/60">Loading...</div>
            </div>
          ) : error ? (
            <div className="text-red-400 font-[font2] text-sm py-4">Failed to load music data</div>
          ) : (
            <>

              {nowPlaying && (
                <div className="mb-4">
                  <p className="text-[#4ade80]/60 text-xs font-[font2] uppercase mb-3">Now Playing</p>
                  <a 
                    href={nowPlaying.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-xl border border-[#4ade80]/20 hover:border-[#4ade80]/40 transition-colors group"
                  >
                    {nowPlaying.image ? (
                      <img 
                        src={nowPlaying.image} 
                        alt={nowPlaying.album}
                        className="w-16 h-16 rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-2xl">
                        🎵
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></span>
                        <span className="text-[#4ade80] text-xs font-[font2]">Playing</span>
                      </div>
                      <p className="text-white font-[font1] truncate group-hover:text-[#4ade80] transition-colors">
                        {nowPlaying.name}
                      </p>
                      <p className="text-[#c8c8c8]/60 text-sm truncate">{nowPlaying.artist}</p>
                      <p className="text-[#c8c8c8]/40 text-xs truncate">{nowPlaying.album}</p>
                    </div>
                  </a>
                </div>
              )}


              <div>
                <p className="text-[#4ade80]/60 text-xs font-[font2] uppercase mb-3">
                  {nowPlaying ? 'Recently Played' : 'Last Played'}
                </p>
                <div className="space-y-2">
                  {recentTracks.length > 0 ? recentTracks.map((track, index) => (
                    <a
                      key={index}
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#0a0a0a] p-2 rounded-lg border border-[#4ade80]/10 hover:border-[#4ade80]/30 transition-colors group"
                    >
                      {track.image ? (
                        <img 
                          src={track.image} 
                          alt={track.album}
                          className="w-10 h-10 rounded-md"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-[#1a1a1a] flex items-center justify-center text-lg">
                          🎵
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[#c8c8c8] text-sm font-[font1] truncate group-hover:text-[#4ade80] transition-colors">
                          {track.name}
                        </p>
                        <p className="text-[#c8c8c8]/50 text-xs truncate">{track.artist}</p>
                      </div>
                      {track.date && (
                        <span className="text-[#c8c8c8]/30 text-xs shrink-0">
                          {new Date(track.date).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </a>
                  )) : (
                    <div className="text-[#c8c8c8]/40 text-sm font-[font2]">
                      No recent tracks
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#4ade80]/10">
                <a 
                  href={`https://www.last.fm/user/${import.meta.env.VITE_LASTFM_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-[#c8c8c8]/50 hover:text-[#4ade80] text-xs font-[font2] transition-colors"
                >
                  <span>View on Last.fm</span>
                  <span>→</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Song