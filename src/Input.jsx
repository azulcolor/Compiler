import { jump } from './expressions';
import './App.css';

const readFile = (e, setText, setTextArray) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = () => {
    setText(reader.result);
    setTextArray(reader.result.split(jump));
  };

  reader.onerror = () => {
    console.log(reader.error);
  };
};

export default function Input({ setText, setTextArray, setCompile, text }) {
  return (
    <div style={{display: 'flex'}}>
      <input
        type="file"
        name='file'
        id='file'
        className="inputfile"
        onChange={(e) => readFile(e, setText, setTextArray)}
      />
      <label htmlFor="file"> Select a file</label>
      <button onClick={() => text !== '' ? setCompile(true) : null}>Compile</button>
    </div>
  );
}
