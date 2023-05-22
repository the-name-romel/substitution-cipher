import { useState } from "react";

const SubstitutionCipher = () => {
  const [file, setFile] = useState(null);
  const [encodedFile, setEncodedFile] = useState(null);
  const [decodedFile, setDecodedFile] = useState(null);
  const [key, setKey] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const encodeFile = () => {
    if (!file || !key) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const encodedText = encode(text, key);
      const blob = new Blob([encodedText], { type: "text/plain" });
      setEncodedFile(URL.createObjectURL(blob));
    };
    reader.readAsText(file);
  };

  const decodeFile = () => {
    if (!encodedFile || !key) return;

    fetch(encodedFile)
      .then((res) => res.text())
      .then((text) => {
        const decodedText = decode(text, key);
        const blob = new Blob([decodedText], { type: "text/plain" });
        setDecodedFile(URL.createObjectURL(blob));
      });
  };

  const encode = (text, key) => {
    // Define your substitution cipher here using the key
    let cipher = {};
    for (let i = 0; i < 26; i++) {
      cipher[String.fromCharCode(97 + i)] = String.fromCharCode(
        97 + ((i + parseInt(key)) % 26)
      );
    }
    let encodedText = "";
    for (let char of text) {
      encodedText += cipher[char] || char;
    }
    return encodedText;
  };

  const decode = (text, key) => {
    // Define your substitution cipher here using the key
    let cipher = {};
    for (let i = 0; i < 26; i++) {
      cipher[String.fromCharCode(97 + ((i + parseInt(key)) % 26))] =
        String.fromCharCode(97 + i);
    }
    let decodedText = "";
    for (let char of text) {
      decodedText += cipher[char] || char;
    }
    return decodedText;
  };

  return (
    <div>
      <input
        type="file"
        className="file:border-solid "
        onChange={handleFileChange}
      />
      <input
        type="number"
        className="number:border-solid border-black border-2 w-10"
        onChange={handleKeyChange}
      />
      <button className="" onClick={encodeFile}>
        Encode
      </button>
      <button onClick={decodeFile}>Decode</button>
      {encodedFile && (
        <a href={encodedFile} download="encoded.txt">
          Download Encoded File
        </a>
      )}
      {decodedFile && (
        <a href={decodedFile} download="decoded.txt">
          Download Decoded File
        </a>
      )}
    </div>
  );
};

export default SubstitutionCipher;
