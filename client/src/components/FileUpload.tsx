import { useRef, useState } from "react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

export default function FileUpload({ onFileSelected }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File | undefined) {
    if (!file)
      return;

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setError("Please select a .zip file.");
      setFileName(null);
      return;
    }

    setError(null);
    setFileName(file.name);
    onFileSelected(file);
  }

  return (
    <section className="upload">
      <h2>How to get your data</h2>
      <ol className="instructions">
        <li>Open Instagram and go to <strong>Accounts Center</strong>, then <strong>Your information and permissions</strong>.</li>
        <li>Choose <strong>Export your information</strong> and <strong>create a new export</strong>.</li>
        <li>Select <strong>Followers and following</strong> as the data to include.</li>
        <li>Set the format to <strong>JSON</strong> and date range to <strong>All time</strong>, then submit the request.</li>
        <li>When Instagram emails you, download the .zip file and upload it below.</li>
      </ol>
      {/* <p className="hint">Menu names change from time to time, so they may look slightly different.</p> */}

      <div
        className={`dropzone ${dragging ? "dragging" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <p>{fileName ?? "Drag and drop your .zip here, or click to browse"}</p>
        <input
          ref={inputRef}
          type="file"
          accept=".zip,application/zip"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && <p className="error">{error}</p>}
    </section>
  );
}