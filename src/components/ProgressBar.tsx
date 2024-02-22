import React from "react";

type ProgressBarProps = {
  theme: string;
  audio: HTMLAudioElement;
  onChangeProgress: (progress: number) => void;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  theme,
  audio,
  onChangeProgress,
}) => {
  const progress = Math.floor((audio?.currentTime / audio?.duration) * 100);
  return (
    <div className="audioSeekBarWrap">
      {/* video length progress bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress || 0}
        onChange={(e) => onChangeProgress(+e.target.value)}
        style={{
          background: `linear-gradient(to right, ${theme} ${progress}%, #e5e5e5 ${progress}%)`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
