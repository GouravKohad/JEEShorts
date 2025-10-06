import ShortsViewer from '../ShortsViewer';

export default function ShortsViewerExample() {
  return (
    <ShortsViewer 
      playlistId="PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf"
      onBack={() => console.log('Back clicked')}
    />
  );
}
