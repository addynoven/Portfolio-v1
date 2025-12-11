import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'

const Commit = ({ onClose }) => {
  const [commitData, setCommitData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expandedFiles, setExpandedFiles] = useState({})

  const hasExpandedFiles = Object.values(expandedFiles).some(v => v)

  useEffect(() => {
    const fetchCommitDetails = async () => {
      try {
        const commitsResponse = await axios.get(import.meta.env.VITE_GITSTATUS_URL)
        const latestCommit = commitsResponse.data[0]
        console.log(latestCommit.sha)
        
        const detailResponse = await axios.get(
          `https://api.github.com/repos/ikeshav26/me/commits/${latestCommit.sha}`
        )
        
        setCommitData({
          sha: latestCommit.sha.substring(0, 7),
          fullSha: latestCommit.sha,
          message: latestCommit.commit.message,
          author: latestCommit.commit.author.name,
          date: new Date(latestCommit.commit.author.date).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          files: detailResponse.data.files || [],
          stats: detailResponse.data.stats || { additions: 0, deletions: 0, total: 0 },
          url: latestCommit.html_url
        })
        setLoading(false)
      } catch (err) {
        console.error('Error fetching commit details:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchCommitDetails()
  }, [])

  useGSAP(() => {
    gsap.from('.commit-modal', {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
    gsap.from('.commit-overlay', {
      opacity: 0,
      duration: 0.3
    })
  })

  const toggleFile = (index) => {
    setExpandedFiles(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const getFileIcon = (status) => {
    switch (status) {
      case 'added': return '+'
      case 'removed': return '-'
      case 'modified': return '~'
      case 'renamed': return '→'
      default: return '•'
    }
  }

  const getFileColor = (status) => {
    switch (status) {
      case 'added': return 'text-[#4ade80]'
      case 'removed': return 'text-red-400'
      case 'modified': return 'text-yellow-400'
      case 'renamed': return 'text-[#4ade80]/70'
      default: return 'text-[#c8c8c8]'
    }
  }

  const renderPatch = (patch) => {
    if (!patch) return <div className="text-[#c8c8c8]/40 text-xs p-3">No diff available (binary file or too large)</div>
    
    const lines = patch.split('\n')
    return lines.map((line, i) => {
      let bgColor = ''
      let textColor = 'text-[#c8c8c8]/70'
      
      if (line.startsWith('+') && !line.startsWith('+++')) {
        bgColor = 'bg-[#4ade80]/10'
        textColor = 'text-[#4ade80]'
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        bgColor = 'bg-red-500/10'
        textColor = 'text-red-400'
      } else if (line.startsWith('@@')) {
        textColor = 'text-[#4ade80]/50'
        bgColor = 'bg-[#4ade80]/5'
      }
      
      return (
        <div key={i} className={`${bgColor} ${textColor} font-mono text-xs px-3 py-0.5 whitespace-pre overflow-x-auto border-l-2 ${line.startsWith('+') && !line.startsWith('+++') ? 'border-[#4ade80]' : line.startsWith('-') && !line.startsWith('---') ? 'border-red-400' : 'border-transparent'}`}>
          {line || ' '}
        </div>
      )
    })
  }

  return createPortal(
    <div className="commit-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className={`commit-modal bg-black p-6 rounded-2xl border border-[#c8c8c8]/20 w-[95vw] max-w-4xl m-4 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col [&_*]:scrollbar-none [&_*]:[-ms-overflow-style:none] [&_*]:[scrollbar-width:none] [&_*::-webkit-scrollbar]:hidden ${hasExpandedFiles ? 'max-h-[90vh]' : 'max-h-fit'}`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#4ade80] font-[font1]">📝 Latest Commit</h2>
          <button 
            onClick={onClose}
            className="text-[#c8c8c8] hover:text-[#4ade80] transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse text-[#c8c8c8]/60">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-red-400 font-[font2]">Failed to load commit details</div>
        ) : commitData && (
          <div className="flex-1 overflow-y-auto">
            {/* Commit Info */}
            <div className="mb-4 pb-4 border-b border-[#4ade80]/20">
              <div className="text-[#c8c8c8] font-[font1] text-sm mb-2">
                {commitData.message}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#c8c8c8]/60 font-[font2]">
                <a 
                  href={commitData.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#4ade80] hover:underline font-mono"
                >
                  {commitData.sha}
                </a>
                <span className="text-[#4ade80]/40">•</span>
                <span>{commitData.author}</span>
                <span className="text-[#4ade80]/40">•</span>
                <span>{commitData.date}</span>
              </div>
            </div>


            <div className="flex gap-4 mb-4 text-xs font-[font2] bg-[#0a0a0a] p-3 rounded-lg border border-[#4ade80]/10">
              <span className="text-[#4ade80]">+{commitData.stats.additions}</span>
              <span className="text-red-400">-{commitData.stats.deletions}</span>
              <span className="text-[#c8c8c8]/60">{commitData.files.length} file{commitData.files.length !== 1 ? 's' : ''} changed</span>
            </div>


            <div className="space-y-2">
              <div className="text-[#4ade80]/60 text-xs font-[font2] mb-2">Changed Files (click to expand):</div>
              {commitData.files.map((file, index) => (
                <div key={index} className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#4ade80]/10">
                  <div 
                    className="flex items-center gap-2 text-sm p-3 cursor-pointer hover:bg-[#4ade80]/5 transition-colors"
                    onClick={() => toggleFile(index)}
                  >
                    <span className={`font-mono font-bold ${getFileColor(file.status)}`}>
                      {getFileIcon(file.status)}
                    </span>
                    <span className="text-[#c8c8c8] truncate flex-1 font-mono text-xs">
                      {file.filename}
                    </span>
                    <span className="text-xs text-[#c8c8c8]/40">
                      <span className="text-[#4ade80]">+{file.additions}</span>
                      {' '}
                      <span className="text-red-400">-{file.deletions}</span>
                    </span>
                    <span className="text-[#4ade80]/60 text-xs">
                      {expandedFiles[index] ? '▼' : '▶'}
                    </span>
                  </div>
                  {expandedFiles[index] && (
                    <div className="border-t border-[#4ade80]/10 max-h-[50vh] overflow-y-auto bg-black">
                      {renderPatch(file.patch)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default Commit