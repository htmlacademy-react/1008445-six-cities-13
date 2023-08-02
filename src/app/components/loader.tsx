import { CSSProperties } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

type LoaderProps = {
  isLoading: boolean;
}

const override: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
};

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <SyncLoader
      color='#4481c3'
      loading={ isLoading }
      cssOverride={ override }
      size={ 15 }
    />
  );
}
