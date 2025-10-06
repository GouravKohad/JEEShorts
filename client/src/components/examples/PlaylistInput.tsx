import PlaylistInput from '../PlaylistInput';

export default function PlaylistInputExample() {
  return (
    <PlaylistInput 
      onPlaylistLoad={(id) => console.log('Playlist loaded:', id)} 
    />
  );
}
