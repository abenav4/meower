import './App.css';
import { useState } from 'react';
import Axios from 'axios'


function App() {

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [deletionMessage, setDeletionMessage] = useState(0);
  const [deletedText, setDeletedText] = useState("")
  const [currentText, setCurrentText] = useState("")
  const [newQuantity, setNewQuantity] = useState(0)

  const addItem = () => {
    Axios.post(
      'http://localhost:3001/create', 
      {name: name, quantity: quantity})
      .then(() => {
        setItemList([...itemList, {name: name, quantity: quantity}])
      })
  }

  const getItems = () => {
    Axios.get(
      'http://localhost:3001/items')
      .then((response) => {
        setItemList(response.data)
      })
      setCurrentText("Current inventory")
      setDeletedText("Deleted items")
  }

  const updateItemQuantity = (id) => {
    Axios.put("http://localhost:3001/update", { quantity: newQuantity, id: id }).then(
      (response) => {
        setItemList(
          itemList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  deletedText: val.deletedText,
                  deleted: val.deleted,
                  quantity : newQuantity,
                }
              : val
          })
        );
      }
    );
  };

  const deleteOrRestoreItem = (id, newQuantity2) => {
    console.log(deletionMessage)
    Axios.put("http://localhost:3001/update", { quantity: newQuantity2, id: id }).then(
      (response) => {
        setItemList(
          itemList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  deletedText: deletionMessage,
                  deleted: val.deleted,
                  quantity : newQuantity2,
                }
              : val
          })
        );
      }
    );
  };

  return (
    <div className="App">
      <div className="itemContainer">

        <label>Name:</label>
        <input type = "text" onChange={(event) => {
          setName(event.target.value)
        }} />
        
        <label>Quantity:</label>
        <input type = "number" onChange={(event) => {
          setQuantity(event.target.value)
        }} />

        <button onClick={addItem}>Add item</button>
        <button onClick={getItems}>Show full item list</button>

      </div>
        
      <div className = "items">

      <h3 id = "deletedText">{currentText}</h3>

        {itemList
        .filter(val => val.quantity>0)
        .map((val, key) => 
         <div className ="item" key={key}>
              <h3>Name: {val.name}</h3> 
              <h3>Quantity: {val.quantity}</h3>
              <div className='centeredDiv'>
                <input type = "text" 
                placeholder = "Update Quantity" onChange={(event)=>setNewQuantity(event.target.value)}/>
                <button className ="smallButton" 
                onClick={()=>updateItemQuantity(val.id)}>Update</button>
              </div>
              <div className='centeredDiv'>
                <input type = "text" 
                placeholder = "Deletion message" onChange={(event)=>setDeletionMessage(event.target.value)}/>
                <button className ="smallButton" 
                onClick={()=>deleteOrRestoreItem(val.id, 0)}>Delete</button>
              </div>
          </div>
        )}
        
      <h3 id = "deletedText">{deletedText}</h3>
        {itemList
        .filter(val => val.quantity==0)
        .map((val, key) => 
         <div className ="item" key={key}>
            <h3>Name: {val.name}</h3> 
            <h3>Quantity: {val.quantity}</h3>
            <button className='mediumButton'
            onClick={()=>deleteOrRestoreItem(val.id, 1)}>Undelete</button>
            <p>Message: {val.deletedText}</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default App;
