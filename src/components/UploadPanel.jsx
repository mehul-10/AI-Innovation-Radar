import { useState } from 'react'

function UploadPanel() {
  const [selectedFileName, setSelectedFileName] = useState('No file selected')

  const handleFileSelection = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setSelectedFileName(selectedFile.name)
    }
  }

  return (
    <article className="panel upload-panel">
      <div className="upload-symbol">UP</div>

      <div className="upload-copy">
        <span className="eyebrow">DATA INGESTION</span>
        <h2>Analyze a New Dataset</h2>

        <p>
          Upload customer reviews, support tickets, survey responses, meeting
          notes, or internal documents.
        </p>

        <span className="selected-file-name">{selectedFileName}</span>
      </div>

      <label className="upload-button">
        Select Dataset

        <input
          type="file"
          accept=".csv,.txt,.pdf,.doc,.docx"
          onChange={handleFileSelection}
        />
      </label>
    </article>
  )
}

export default UploadPanel
