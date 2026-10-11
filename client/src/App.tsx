import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

import Header from './components/Header';
import FileUpload from './components/FileUpload';
import { readExport } from './utils/ReadExport';
import { compareResult, type Account } from './utils/CompareResult';
import ResultList from './components/ResultList';
import Footer from './components/Footer';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [screen, setScreen] = useState<'upload' | 'loading' | 'result' | 'error'>('upload');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultList, setResultList] = useState<Account[] | null>(null);

  async function handleSubmit() {
    if (!file)
      return;
    
    setScreen('loading');

    try {
      const result = await readExport(file);
      const list = compareResult(result);

      setResultList(list);
      setErrorMessage(null);
      setScreen('result');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred while reading the export.');
      setScreen('error');
    }
  }

  function checkAgain() {
    setFile(null);
    setErrorMessage(null);
    setScreen('upload');
  }

  return (
    <>
      <Header />
      <div className='main'>
        {screen === 'upload' && (
          <>
            <FileUpload onFileSelected={setFile}/>
            <button className='submit-btn' onClick={handleSubmit}>Who Unfollowed Me?</button>
          </>
        )}

        {screen === 'loading' && <h2>Loading...</h2>}

        {screen === 'result' && (
          <>
            <h2>Result</h2>
            <ResultList accounts={resultList ?? []}/>
            <button className='submit-btn' onClick={checkAgain}>Check Again</button>
          </>
        )}

        {screen === 'error' && (
          <>
            <h2 className='error'>Error</h2>
            <p>{errorMessage}</p>
            <button className='submit-btn' onClick={checkAgain}>Try Again</button>
          </>
        )}
      </div>
      <Footer />

      <Analytics />
    </>
  )
}

export default App
