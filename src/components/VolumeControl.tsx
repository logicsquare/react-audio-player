import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

type VolumeControlProps = {
  theme: string;
  volume: number;
  isMuted: boolean;
  onChangeVolume: (volume: number) => void;
  toggleMute: (mute: boolean) => void;
};

const VolumeControl: React.FC<VolumeControlProps> = ({
  theme,
  volume,
  isMuted,
  onChangeVolume,
  toggleMute,
}) => {
  const volumeValue = isMuted ? 0 : volume;
  return (
    <div className="audioVolume">
      <div className="audioSeekBar">
        <div className="audioProgress" style={{ width: "80%" }} />

        {/* volume indicator / controller */}
        <input
          type="range"
          className="dragHandle"
          value={volumeValue}
          onChange={(e) => onChangeVolume(+e.target.value)}
          style={{
            background: `linear-gradient(to right, ${theme} ${volumeValue}%, #e5e5e5 ${volumeValue}%)`,
          }}
        />
      </div>

      {/* for full volume */}
      <button className="muteUnmuteBtn" onClick={() => toggleMute(!isMuted)}>
        {volumeValue > 40 ? (
          <FontAwesomeIcon icon={faVolumeHigh} className="icon" />
        ) : volumeValue > 0 ? (
          <FontAwesomeIcon icon={faVolumeLow} className="icon" />
        ) : null}

        {volumeValue === 0 && (
          <FontAwesomeIcon icon={faVolumeXmark} className="icon" />
        )}
      </button>
    </div>
  );
};

export default VolumeControl;
