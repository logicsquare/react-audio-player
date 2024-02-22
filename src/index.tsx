import { useRef } from "react";
import PlaybackControls from "./components/PlaybackControls";
import VolumeControl from "./components/VolumeControl";
import useAudio from "./hooks/useAudio";
import DefaultThumbnail from "./assets/img/audio-thumbnail.png";
import { formatDuration } from "./utils";
import ProgressBar from "./components/ProgressBar";
import useTheme from "./hooks/useTheme";
import "./assets/styles/styles.css";

interface Audio {
  url: string;
  title: string;
  artist?: string;
  thumbnail?: string;
  album?: string;
}

type AudioPlayerProps = React.ComponentPropsWithRef<"div"> & {
  theme?: string;
  skipTime?: number;
  media: Audio[];
  showSkipButtons?: boolean;
  showVolumeControl?: boolean;
  showPlaybackSpeedControls?: boolean;
  hasDefaultKeyShortcuts?: boolean;
};

const CustomAudioPlayer: React.FC<AudioPlayerProps> = (props) => {
  const {
    media,
    theme = "#000",
    skipTime = 10,
    showSkipButtons = true,
    showVolumeControl = true,
    showPlaybackSpeedControls = true,
    hasDefaultKeyShortcuts = true,
    style = {},
    className,
  } = props;

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    duration,
    isPlaying,
    isMuted,
    isPlaylist,
    currentAudio,
    currentTime,
    volume,
    handleMetaData,
    handleKeyShortcuts,
    handleSeekProgress,
    handleChangeVolume,
    skipAudio,
    togglePlayPause,
    toggleMuteUnmute,
    playNextSong,
    playPreviousSong,
    setCurrentTime,
  } = useAudio(audioRef.current as HTMLAudioElement, media);

  useTheme(theme);

  return (
    <div
      className={className ? `audioPlayerWrap ${className}` : "audioPlayerWrap"}
      ref={containerRef}
      style={style}
      tabIndex={0}
      onKeyDown={(e) =>
        handleKeyShortcuts(e, hasDefaultKeyShortcuts, containerRef, skipTime)
      }
    >
      {/* Audio thumbnail */}
      <div className="audioThumbnailWrap">
        <img
          src={currentAudio?.thumbnail || DefaultThumbnail}
          alt="Thumbnail"
        />

        <div className="audioInfo">
          <h5>{currentAudio?.title}</h5>
          {currentAudio?.artist ? <p>{currentAudio?.artist}</p> : null}
        </div>
      </div>

      <div className="audioControlsWrap">
        <ProgressBar
          theme={theme}
          audio={audioRef.current as HTMLAudioElement}
          onChangeProgress={handleSeekProgress}
        />

        {/* Playback Controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          isPlaylist={isPlaylist}
          showSkipButtons={showSkipButtons}
          skipAudio={skipAudio}
          skipTime={skipTime}
          audio={audioRef.current as HTMLAudioElement}
          togglePlayPause={togglePlayPause}
          nextSong={playNextSong}
          prevSong={playPreviousSong}
        />

        {/* Audio duration */}
        <div className="audioDuration">
          {formatDuration(currentTime)} /{" "}
          {!!duration && !isNaN(duration) && formatDuration(duration)}
        </div>

        {/* Playback rate */}
        {/* {showPlaybackSpeedControls && (
          <PlaybackRate
            playbackRate={playbackRate}
            onChangePlaybackRate={handleChangePlaybackRate}
          />
        )} */}

        {/* Volume Control */}
        {showVolumeControl && (
          <VolumeControl
            theme={theme}
            volume={volume}
            isMuted={isMuted}
            onChangeVolume={handleChangeVolume}
            toggleMute={toggleMuteUnmute}
          />
        )}

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={currentAudio?.url}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => handleMetaData(e.target as HTMLAudioElement)}
        />
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
