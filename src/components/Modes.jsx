import React, {useState, useEffect} from 'react';
import styles from './Modes.module.scss'

export const Modes = ({mode, startFlag, broadcastCells}) => {
    const [cells, setCells] = useState([]);

    const cellHoverChange = (row, column) => {
        const present = cells.find(cell => {
            return cell.row === row && cell.column === column;
        })

        if (present) {
            setCells(cells.filter(c => c !== present))
        } else {
            setCells(cells.concat({ row, column }))
        }
    }

    const isCellHovered = (row, column) => {
        return !!cells.find(cell => {
            return cell.row === row && cell.column === column;
        })
    }

    useEffect(() => {
        broadcastCells(cells);
    }, [cells])

    const renderCell = (row, column) => {
        
        return <div className={isCellHovered(row, column) ? styles.squaresHover + ' ' + styles.squares : styles.squares} key={column}
        
            onMouseEnter={() => cellHoverChange(row, column)}

        >
        </div>
    }

    const renderRow = (size, row) => {
        const cells = [];
        for (let i = 1; i <= size; i++) {
            cells.push(renderCell(row, i));
        }
       return  <div className={styles.Boxes} key={row}>
           {cells}
       </div>
    }

    const render = (size) => {
        const rows = [];
        for (let i = 1; i <= size; i++) {
            rows.push(renderRow(size, i));
        }

       return  <div>
           {rows}
       </div>
    }
    return (
        <>
            {
                startFlag ? render(mode) : null
            }      
        </>
    )
}
