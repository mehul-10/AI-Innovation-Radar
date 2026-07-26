import { useState } from "react";
import { uploadDataset } from "../api/uploadApi";

export default function UploadButton() {
  const [result, setResult] = useState(null);

  async function handleUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const data = await uploadDataset(file);

    setResult(data);
  }

  return (
    <>
      <input type="file" onChange={handleUpload} />

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </>
  );
}