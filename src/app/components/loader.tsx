import { CSSProperties } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const override: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default function Loader() {
  return (
    <SyncLoader
      color='#4481c3'
      loading
      cssOverride={ override }
      size={ 15 }
    />
  );
}
