import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
const NodeRSA = require("node-rsa");

const TYPES = ["rsa", "aes", "des"];
const rsaKey = new NodeRSA({ b: 512 });

export default App = () => {
  const [cipher, setCipher] = useState("rsa");
  const [plainText, setPlainText] = useState("");
  const [operation, setOperation] = useState("encrypt");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const prcoessCipher = () => {
    if (cipher == "aes") {
      if (operation == "encrypt") {
        setResult(CryptoJS.AES.encrypt(plainText, key).toString());
      } else {
        const bytes = CryptoJS.AES.decrypt(plainText, key);
        setResult(bytes.toString(CryptoJS.enc.Utf8));
      }
    } else if (cipher == "des") {
      if (operation == "encrypt") {
        setResult(CryptoJS.DES.encrypt(plainText, key).toString());
      } else {
        const bytes = CryptoJS.DES.decrypt(plainText, key);
        setResult(bytes.toString(CryptoJS.enc.Utf8));
      }
    } else if (cipher == "rsa") {
      if (operation == "encrypt") {
        setResult(rsaKey.encrypt(plainText, "base64"));
      } else {
        const res = rsaKey.decrypt(plainText, "utf8");
        setResult(res);
      }
    }
  };

  useEffect(() => {
    if (cipher == "rsa") {
      document.getElementById("cipherKey").value = "";
      document.getElementById("cipherKey").disabled = true;
    } else document.getElementById("cipherKey").disabled = false;
  }, [cipher]);

  return (
    <div>
      <h1>Cryptography Project 🧾</h1>
      By Youssef Fadel & Mo'men Shaban ✨
      <form
        className="cipher-form"
        onSubmit={(e) => {
          e.preventDefault();
          prcoessCipher();
        }}
      >
        <label htmlFor="cipher">
          Cipher Method{" "}
          <select value={cipher} onChange={(e) => setCipher(e.target.value)}>
            {TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        <label htmlFor="operation">
          operation{" "}
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option key="encrypt">encrypt</option>
            <option key="decrypt">decrypt</option>
          </select>
        </label>

        <label htmlFor="plainText">
          Text{" "}
          <input
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
          ></input>
        </label>

        <label htmlFor="key">
          Key{" "}
          <input
            id="cipherKey"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          ></input>
        </label>

        <button type="submit">Submit</button>
      </form>
      <div className="output">
        <h3>Result</h3>
        {result}
      </div>
    </div>
  );
};
