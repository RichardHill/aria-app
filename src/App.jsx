import './App.css'
import { Tree } from "./components/tree";
import { treeData } from "./assets/treenodes"; // Assuming treeData is defined in data.js


function App() {

  return (
    <>
      <h1>Bentley Systems - Tree Component with Aria</h1>
      <div className="card">
        <p>Simple example of a Tree Component</p>   
           
           <Tree data={treeData} className="tree-container"/>

      </div>
    </>
  )
}

export default App
