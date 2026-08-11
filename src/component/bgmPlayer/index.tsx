import { useEffect, useRef, useState } from "react"
import bgmUrl from "../../music/bgm.mp3"

/**
 * 배경음악 재생 상태를 제어하는 고정 버튼 컴포넌트입니다.
 *
 * 브라우저 자동재생 정책에 막힐 수 있으므로 실패 시 사용자의 버튼 클릭으로 재생합니다.
 */
export const BgmPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    audio.volume = 0.35

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }, [])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio || loadFailed) {
      return
    }

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
      return
    }

    audio.pause()
    setIsPlaying(false)
  }

  return (
    <div className="bgm-player">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={bgmUrl}
        onEnded={() => setIsPlaying(false)}
        onError={() => setLoadFailed(true)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        aria-label={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
        className={"bgm-player-button" + (isPlaying ? " playing" : "")}
        disabled={loadFailed}
        onClick={togglePlayback}
        type="button"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 5h3v14H7z" />
            <path d="M14 5h3v14h-3z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 4v11.2a3.2 3.2 0 1 1-2-3V6.5l6-1.3V9l-4 .9V4z" />
          </svg>
        )}
      </button>
    </div>
  )
}
