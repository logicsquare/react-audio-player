import React from "react";

type PlaybackRateProps = {
  playbackRate: number;
  onChangePlaybackRate: (value: number) => void;
};
const PlaybackRate: React.FC<PlaybackRateProps> = ({
  playbackRate,
  onChangePlaybackRate,
}) => {
  return (
    <select
      value={playbackRate}
      onChange={(e) => onChangePlaybackRate(+e.target.value)}
      className="playbackRate"
    >
      <option value="0.25">0.25x</option>
      <option value="0.5">0.5x</option>
      <option value="0.75">0.75x</option>
      <option value="1">1x</option>
      <option value="1.25">1.25x</option>
      <option value="1.5">1.5x</option>
      <option value="1.75">1.75x</option>
      <option value="2">2x</option>
    </select>
  );
};

export default PlaybackRate;
