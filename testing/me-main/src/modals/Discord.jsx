import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'

const Discord = ({ onClose }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_STATUS_URL)
        if (response.data.success) {
          setUserData(response.data.data)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Discord data:', error)
        setLoading(false)
      }
    }
    fetchDiscordData()
  }, [])

  useGSAP(() => {
    gsap.from('.discord-modal', {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
    gsap.from('.discord-overlay', {
      opacity: 0,
      duration: 0.3
    })
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#23a55a'
      case 'idle': return '#f0b232'
      case 'dnd': return '#f23f43'
      default: return '#80848e'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online'
      case 'idle': return 'Idle'
      case 'dnd': return 'Do Not Disturb'
      default: return 'Offline'
    }
  }

  const getActivityIcon = (name) => {
    const lowerName = name?.toLowerCase() || ''
    if (lowerName.includes('visual studio code') || lowerName.includes('vscode')) return '💻'
    if (lowerName.includes('spotify')) return '🎵'
    if (lowerName.includes('youtube')) return '📺'
    if (lowerName.includes('chrome') || lowerName.includes('firefox')) return '🌐'
    return '🎮'
  }

  return createPortal(
    <div className="discord-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm [&_*]:scrollbar-none [&_*]:[-ms-overflow-style:none] [&_*]:[scrollbar-width:none] [&_*::-webkit-scrollbar]:hidden" onClick={onClose}>
      <div className="discord-modal bg-black rounded-2xl border border-[#c8c8c8]/20 w-full max-w-sm m-4 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        

        <div className="h-24 bg-gradient-to-r from-[#4ade80]/30 via-[#4ade80]/20 to-black relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors text-lg z-10"
          >
            ✕
          </button>
        </div>


        <div className="relative px-4 pb-4">
          <div className="absolute -top-12 left-4">
            <div className="relative">
              {loading ? (
                <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border-4 border-black animate-pulse"></div>
              ) : (
                <img
                  src={userData?.discord_user?.avatar 
                    ? `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png?size=128`
                    : 'https://cdn.discordapp.com/embed/avatars/0.png'
                  }
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-black object-cover"
                />
              )}

              {userData && (
                <div 
                  className="absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-black"
                  style={{ backgroundColor: getStatusColor(userData.discord_status) }}
                ></div>
              )}
            </div>
          </div>


          <div className="flex justify-end pt-2 pb-4">
            <div className="flex gap-1">
              <div className="w-6 h-6 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-xs">
                🎮
              </div>
            </div>
          </div>


          <div className="bg-[#0a0a0a] rounded-xl p-4 mt-2 border border-[#4ade80]/10">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-5 bg-[#1a1a1a] rounded w-32"></div>
                <div className="h-3 bg-[#1a1a1a] rounded w-24"></div>
              </div>
            ) : userData ? (
              <>
                <div className="mb-3 pb-3 border-b border-[#4ade80]/10">
                  <h2 className="text-xl font-bold text-white font-[font1]">
                    {userData.discord_user?.display_name || userData.discord_user?.username}
                  </h2>
                  <p className="text-[#c8c8c8]/60 text-sm font-[font2]">
                    @{userData.discord_user?.username}
                  </p>
                </div>


                <div className="mb-3 pb-3 border-b border-[#4ade80]/10">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(userData.discord_status) }}
                    ></div>
                    <span className="text-[#c8c8c8] text-sm font-[font2]">
                      {getStatusText(userData.discord_status)}
                    </span>
                  </div>
                </div>


                {userData.activities?.find(act => act.type === 4) && (
                  <div className="mb-3 pb-3 border-b border-[#4ade80]/10">
                    <p className="text-[#4ade80]/60 text-xs font-[font2] uppercase mb-1">Custom Status</p>
                    <div className="flex items-center gap-2">
                      {userData.activities.find(act => act.type === 4)?.emoji && (
                        <span>{userData.activities.find(act => act.type === 4).emoji.name}</span>
                      )}
                      <span className="text-[#c8c8c8] text-sm">
                        {userData.activities.find(act => act.type === 4)?.state}
                      </span>
                    </div>
                  </div>
                )}


                {userData.activities?.filter(act => act.type !== 4 && act.type !== 2).length > 0 && (
                  <div>
                    <p className="text-[#4ade80]/60 text-xs font-[font2] uppercase mb-2">Current Activity</p>
                    {userData.activities
                      .filter(act => act.type !== 4 && act.type !== 2)
                      .slice(0, 2)
                      .map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 mb-2 last:mb-0">
                          {activity.assets?.large_image ? (
                            <img 
                              src={
                                activity.assets.large_image.startsWith('mp:')
                                  ? activity.assets.large_image.replace('mp:', 'https://media.discordapp.net/')
                                  : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                              }
                              alt={activity.name}
                              className="w-12 h-12 rounded-lg"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-2xl">
                              {getActivityIcon(activity.name)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-[font1] truncate">{activity.name}</p>
                            {activity.details && (
                              <p className="text-[#c8c8c8]/60 text-xs truncate">{activity.details}</p>
                            )}
                            {activity.state && (
                              <p className="text-[#c8c8c8]/40 text-xs truncate">{activity.state}</p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {!userData.activities?.filter(act => act.type !== 4 && act.type !== 2).length && (
                  <div className="text-[#c8c8c8]/40 text-sm font-[font2]">
                    No current activity
                  </div>
                )}
              </>
            ) : (
              <div className="text-red-400 font-[font2] text-sm">Failed to load profile</div>
            )}
          </div>

          {userData?.discord_user?.id && (
            <div className="mt-3 bg-[#0a0a0a] rounded-xl p-3 border border-[#4ade80]/10">
              <p className="text-[#4ade80]/60 text-xs font-[font2] uppercase mb-1">Discord User</p>
              <p className="text-[#c8c8c8]/60 text-xs font-mono">{userData.discord_user.id}</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Discord
