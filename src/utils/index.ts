// format audio duration to HH:MM:SS
export const formatDuration = (secs: number) => {
  let hours = `${Math.floor(secs / 3600)}`;
  let minutes = `${Math.floor((secs % 3600) / 60)}`;
  let seconds = `${Math.floor(secs % 60)}`;

  hours = +hours > 9 ? hours : `0${hours}`;
  minutes = +minutes > 9 ? minutes : `0${minutes}`;
  seconds = +seconds > 9 ? seconds : `0${seconds}`;

  if (+hours > 0) return `${hours}:${minutes}:${seconds}`;
  else return `${minutes}:${seconds}`;
};
