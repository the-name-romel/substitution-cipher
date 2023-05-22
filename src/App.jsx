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
    if (!file || !key) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const encodedText = decode(text, key);
      const blob = new Blob([encodedText], { type: "text/plain" });
      setDecodedFile(URL.createObjectURL(blob));
    };
    reader.readAsText(file);
  };

  const encode = (text, key) => {
    // encoding logic here
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
    // decoding logic here
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
    <div className="bg-[#e0e0e0] h-[100vh] mx-auto flex justify-center items-center p-5">
      <div
        id="neo"
        className="sm:max-w-[50%] max-h-[90%] w-full h-full flex flex- col rounded-[50px] bg-inherit p-4"
      >
        <div className="flex flex-col justify-center items-center w-full gap-5 relative">
          <h1
            className="text-3xl font-bold py-4 px-[32px] absolute top-2"
            id="neo"
          >
            CryptoCoder
          </h1>
          <input
            type="file"
            id="file"
            className="p-2 file:border-none file:bg-transparent file:border-black file:border-r-2 w-full max-w-[300px] file:cursor-pointer cursor-pointer"
            onChange={handleFileChange}
            placeholder="file"
          />
          <input
            type="number"
            id="key"
            className="number:border-solid  w-20 p-2"
            onChange={handleKeyChange}
            placeholder="key"
          />
          <div className="flex flex-row gap-3">
            <button
              className="px-[35px] py-[10px]"
              id="encode"
              onClick={encodeFile}
            >
              Encode
            </button>
            <button
              id="decode"
              className="px-[35px] py-[10px]"
              onClick={decodeFile}
            >
              Decode
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 duration-500">
            {encodedFile && (
              <a
                className="px-[35px] py-[10px]"
                id="encoded-file"
                href={encodedFile}
                download="encoded.txt"
                onClick={() => window.location.reload()}
              >
                Download Encoded File
              </a>
            )}
            {decodedFile && (
              <a
                className="px-[35px] py-[10px]"
                id="decoded-file"
                href={decodedFile}
                download="decoded.txt"
                onClick={() => window.location.reload()}
              >
                Download Decoded File
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstitutionCipher;
