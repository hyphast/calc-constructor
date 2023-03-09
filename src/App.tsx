import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CalculatorPreview, DesignSidebar, ModeSwitch } from './components'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.root}>
      <DndProvider backend={HTML5Backend}>
        <DesignSidebar className={styles.sidebar} />
        <div className={styles.leftSide}>
          <ModeSwitch className={styles.modeSwitch} />
          <CalculatorPreview />
        </div>
      </DndProvider>
    </div>
  )
}

export default App
