# React Audio Player

<a href="https://www.npmjs.com/package/@logicsquare/react-audio-player" title="MIT License">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="MIT License" />
</a>

- Custom audio player component with support for different browsers.
- Written in TypeScript
- Highly customizable layout
- Mobile responsive

Supported browsers: Chrome, Firefox, Safari, Edge

## Installation

`$ npm i @logicsquare/react-audio-player`

OR

`$ yarn add @logicsquare/react-audio-player`

## Usage

```jsx
import CustomAudioPlayer from "@logicsquare/react-audio-player";

const Player = () => (
  <CustomAudioPlayer
    theme="#ff9900"
    media={[
      {
        title: "Some Title 1",
        url: "http://example.com/audio1.mp3",
        thumbnail: "http://example.com/thumbnail1.jpg",
        artist: "Artist Name 1",
      },
      {
        title: "Some Title 2",
        url: "http://example.com/audio2.mp3",
        thumbnail: "http://example.com/thumbnail2.jpg",
        artist: "Artist Name 2",
      },
    ]}
    // other props here
  />
);
```

## Keyboard shortcuts (When audio player focused)

They can be turned off by setting `hasDefaultKeyShortcuts` prop to `false`

| Key binding | Action        |
| ----------- | ------------- |
| Space       | Play/Pause    |
| ←           | Skip Backward |
| →           | Skip Forward  |
| ↑           | Volume up     |
| ↓           | Volume down   |
| M           | Toggle mute   |

## Player Props

| Props                                | Type           | Default   | Note                                                              |
| ------------------------------------ | -------------- | --------- | ----------------------------------------------------------------- |
| theme (optional)                     | string         | #000000   | Set theme of the player                                           |
| media                                | Array<object\> | undefined | Pass an array of objects where each object contains audio details |
| skipTime (optional)                  | number         | 10        | Set the time in seconds for skipping audio forward or backward    |
| showSkipButtons (optional)           | boolean        | true      | Show skip buttons for skipping forward and backward               |
| showVolumeControl (optional)         | boolean        | true      | Show volume control for adjusting volume                          |
| showPlaybackSpeedControls (optional) | boolean        | true      | Show playback speed controls for adjusting playback speed         |
| hasDefaultKeyShortcuts (optional)    | boolean        | true      | Wheather to have default keyboard shortcuts                       |

## How to contribute

Issues and PR's are welcome.
