import Main from '../../pages/main/main.tsx';

type AppProps = {
  cardsCount: number;
}

function App({ cardsCount }: AppProps) {
  return (
    <Main cardsCount = { cardsCount }/>
  );
}

export default App;
