import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

type PlaybackControlsProps = {
  isPlaylist: boolean;
  showSkipButtons: boolean;
  isPlaying: boolean;
  audio: HTMLAudioElement;
  skipTime: number;
  skipAudio: (time: number) => void;
  togglePlayPause: (val: boolean) => void;
  nextSong: () => void;
  prevSong: () => void;
};

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaylist,
  showSkipButtons,
  isPlaying,
  skipTime,
  audio,
  skipAudio,
  togglePlayPause,
  nextSong,
  prevSong,
}) => {
  const playing = isPlaying && !audio.paused;

  return (
    <>
      {/* Prev Song Button */}
      {isPlaylist && (
        <button className="prevNextBtn">
          <FontAwesomeIcon
            icon={faBackwardStep}
            className="icon"
            title="Previous Song"
            onClick={prevSong}
          />
        </button>
      )}

      {/* Skip backward */}
      {showSkipButtons && (
        <button className="prevNextBtn">
          <FontAwesomeIcon
            onClick={() => skipAudio(-skipTime)}
            icon={faRotateLeft}
            className="icon"
            title={`Skip ${skipTime} seconds`}
          />
        </button>
      )}

      <button
        className="playPauseBtn"
        onClick={() => togglePlayPause(!playing)}
      >
        {playing ? (
          <FontAwesomeIcon
            className="icon iconPause"
            icon={faPause}
            title="Pause"
          />
        ) : (
          <FontAwesomeIcon className="icon" icon={faPlay} title="Play" />
        )}
      </button>

      {/* Skip forward */}
      {showSkipButtons && (
        <button className="prevNextBtn">
          <FontAwesomeIcon
            onClick={() => skipAudio(skipTime)}
            icon={faRotateRight}
            className="icon"
            title={`Skip ${skipTime} seconds`}
          />
        </button>
      )}

      {/* Next Song Button */}
      {isPlaylist && (
        <button className="prevNextBtn">
          <FontAwesomeIcon
            icon={faForwardStep}
            className="icon"
            title="Next Song"
            onClick={nextSong}
          />
        </button>
      )}
    </>
  );
};

export default PlaybackControls;
