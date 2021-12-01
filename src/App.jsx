import React, {useState, useEffect} from 'react';
import styles from './App.module.scss'
import axios from 'axios'
import { Modes } from './components/Modes'

function App() {
  const [boxes, setBoxes] = useState([])
  const [mode, setMode] = useState(0);
  const [started, setStarted] = useState(false);
  const [cells, setCells] = useState([]);

  useEffect (() => {
    const apiUrl = 'https://demo1030918.mockable.io/';
    axios.get(apiUrl).then((resp) => {
      const levelsObj = resp.data;

      const levels = Object.keys(levelsObj).map((key) => {
        return {
          mode: key,
          value: levelsObj[key].field
        }
      });
      setBoxes(levels)
    })
  }, [])

  useEffect(() => {
    if (!mode && boxes.length > 0) {
      setMode(boxes[0].value)
    }
  }, [boxes])

  useEffect(() => {
  }, [cells])

  const modeChangeHandler = (event) => {
    setMode(event.target.value)
  }

  const starthandler = () => {
    setStarted(true);
  }

  return (
    <div className={styles.App}>
      <div className={styles.box}>
          <select name="options" disabled={started} onChange={modeChangeHandler}>
            <option disabled>Choose</option>
            {boxes.map(mode => {
              return <option value={mode.value} key={mode.value}> {mode.mode}</option>
            })}
          </select>
      </div>
      <div className={styles.Button} onClick={starthandler}>
        <button disabled={started}>START</button>
      </div>
      <div className={styles.hover}>
          <h2>Hover squares</h2>
          {cells.map(cell => {
            return <div className={styles.hovered} key={cell.row + '' + cell.column }>
                      <p>row {cell.row} col {cell.column}</p>
                    </div>
          })}
      </div>
      <div className={styles.Box}>
            <Modes mode={mode} startFlag={started} broadcastCells={setCells}/>

            </div>
    </div>
  );
}

export default App;