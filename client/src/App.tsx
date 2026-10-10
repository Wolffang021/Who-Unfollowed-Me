import { useState } from 'react';
import './App.css'

import Header from './components/Header';
import FileUpload from './components/FileUpload';
import { readExport } from './utils/ReadExport';
import Footer from './components/Footer';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [screen, setScreen] = useState<'upload' | 'loading' | 'result' | 'error'>('upload');

  async function handleSubmit() {
    if (!file)
      return;
    
    setScreen('loading');

    const result = await readExport(file);

    setScreen('result');

    const followers = result.followers;
    const following = result.following;

    console.log(following);
    console.log(followers);
  }

  function checkAgain() {
    setFile(null);
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
            <p>The list will show here</p>
            <button className='submit-btn' onClick={checkAgain}>Check Again</button>
          </>
        )}

        {screen === 'error' && (
          <>
            <h2>Error</h2>
            <p>Error type will be shown here</p>
            <button className='submit-btn' onClick={checkAgain}>Try Again</button>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default App
