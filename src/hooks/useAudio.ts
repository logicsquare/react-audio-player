import { useCallback, useEffect, useState } from "react";

interface Audio {
  url: string;
  title: string;
  artist?: string;
  thumbnail?: string;
  album?: string;
}

const useAudio = (audioElement: HTMLAudioElement, media: Audio[]) => {
  // states
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  // constants
  const isPlaylist = Array.isArray(media) && media.length > 1;
  const currentAudio = media[currentAudioIndex];

  // play or pause
  const togglePlayPause = useCallback(
    (play: boolean) => {
      setIsPlaying(play);

      if (play) {
        // Pause all other audio elements on the page
        document.querySelectorAll("audio").forEach((audio) => {
          if (audio !== audioElement && !audio.paused) {
            audio.pause();
          }
        });
        audioElement?.play();
      } else audioElement?.pause();
    },
    [audioElement]
  );

  // play next song
  const playNextSong = () => {
    setCurrentAudioIndex((prev) => (prev === media?.length - 1 ? 0 : prev + 1));
  };

  // play previous song
  const playPreviousSong = () => {
    setCurrentAudioIndex((prev) => (prev === 0 ? media?.length - 1 : prev - 1));
  };

  // skip forward or backward
  const skipAudio = (time: number) => {
    audioElement.currentTime += time;
  };

  // handle seek progress
  const handleSeekProgress = (progress: number) => {
    const time = (progress / 100) * audioElement?.duration;
    audioElement.currentTime = time;
    setCurrentTime(time);
  };

  // handle volume change
  const handleChangeVolume = (volume: number) => {
    audioElement.volume = volume / 100;
    setVolume(volume);
  };

  // toggle mute/unmute
  const toggleMuteUnmute = (mute: boolean) => {
    audioElement.muted = mute;
    setIsMuted(mute);
  };

  // handle change playback rate
  const handleChangePlaybackRate = (playbackRate: number) => {
    audioElement.playbackRate = playbackRate;
    setPlaybackRate(playbackRate);
  };

  const handleKeyShortcuts = (
    e: React.KeyboardEvent<HTMLDivElement>,
    hasDefaultKeyShortcuts: boolean,
    container: React.RefObject<HTMLDivElement>,
    skipTime: number
  ) => {
    if (hasDefaultKeyShortcuts) {
      switch (e.key) {
        case " ":
          if (e.target === container.current) {
            e.preventDefault(); // Prevent scrolling page by pressing Space key
            togglePlayPause(!isPlaying);
          }
          break;
        case "ArrowLeft":
          skipAudio(-skipTime);
          break;
        case "ArrowRight":
          skipAudio(skipTime);
          break;
        case "ArrowUp":
          e.preventDefault(); // Prevent scrolling page by pressing arrow key
          volume + 10 > 100
            ? handleChangeVolume(100)
            : handleChangeVolume(volume + 10); // if increasing volume goes beyound 100 then set it to 100 else increase it by 10
          break;
        case "ArrowDown":
          e.preventDefault(); // Prevent scrolling page by pressing arrow key
          volume - 10 < 0
            ? handleChangeVolume(0)
            : handleChangeVolume(volume - 10); // if decreasing volume goes below 0 then set it to 0 else decrease it by 10
          break;
        case "m":
          toggleMuteUnmute(!isMuted);
          break;
      }
    }
  };

  // set duration of audio element after metadata loads
  const handleMetaData = (audio: HTMLAudioElement) => {
    setDuration(audio?.duration);
  };

  useEffect(() => {
    if (isPlaying) togglePlayPause(true);
  }, [currentAudioIndex, isPlaying, togglePlayPause]);

  return {
    isPlaying,
    isMuted,
    isPlaylist,
    currentTime,
    currentAudio,
    duration,
    volume,
    playbackRate,
    handleMetaData,
    handleKeyShortcuts,
    handleSeekProgress,
    handleChangeVolume,
    handleChangePlaybackRate,
    togglePlayPause,
    toggleMuteUnmute,
    skipAudio,
    setCurrentTime,
    playNextSong,
    playPreviousSong,
  };
};

export default useAudio;
