import './App.css'

import Header from './components/Header'
import FileUpload from './components/FileUpload';
import Footer from './components/Footer'

function App() {
  function HandleFileSelected(file: File) {
    console.log("Selection: ", file.name);
    // readExport(file) goes here in the next step
  }

  return (
    <>
      <Header />
      <div className='main'>
        <FileUpload onFileSelected={HandleFileSelected}/>
      </div>
      <Footer />
    </>
  )
}

export default App
