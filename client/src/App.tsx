import { useState } from 'react';
import './App.css'

import Header from './components/Header';
import FileUpload from './components/FileUpload';
import { readExport } from './utils/ReadExport';
import Footer from './components/Footer';

function App() {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit() {
    if (!file)
      return;
    
    const result = await readExport(file);
    console.log(result);
  }

  return (
    <>
      <Header />
      <div className='main'>
        <FileUpload onFileSelected={setFile}/>
        <button className='submit-btn' onClick={handleSubmit}>Who Unfollowed Me?</button>
      </div>
      <Footer />
    </>
  )
}

export default App
