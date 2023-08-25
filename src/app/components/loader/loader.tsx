import { styles } from './style.ts';
import SyncLoader from 'react-spinners/SyncLoader';

export default function Loader() {
  return (
    <SyncLoader
      color='#4481c3'
      loading
      cssOverride={ styles }
      size={ 15 }
    />
  );
}
