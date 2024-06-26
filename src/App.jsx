import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [item, setItem] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedItems = localStorage.getItem('items');

    if (savedItems) {
      setItem(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(item));
  }, [item]);

  const getInput = () => {
    const inputVal = inputRef.current.value;
    if (inputVal.trim() === "") {
      alert("Please enter the value");
      return;
    }
    setItem((prev) => [...prev, { name: inputVal, checked: false }]);
    notify("item has been added");
    inputRef.current.value = '';
  };

  const addItem = (e) => {
    if (e.key === "Enter") {
      getInput();
    }
  };

  const toggleCheckbox = (index) => {
    setItem((prev) => {
      const updatedItems = [...prev];
      updatedItems[index].checked = !updatedItems[index].checked;
      return updatedItems;
    });
  };

  const deleteItem = (index) => {
    setItem((prev) => {
      const updatedItems = [...prev];
      updatedItems.splice(index, 1);
      notify("item has been deleted")
      return updatedItems;
    });
  };

  function notify(e) {
    toast(e)
  };
  

  return (
    <>
      <div className='container'>
        <h1 style={{ padding: '20px 0' }}> Grocerry Bud </h1>
        <div>
          <div className="for-input">
            <input
              type="text"
              ref={inputRef}
              onKeyDown={addItem}
              style={{ padding: '10px', outline: 'none' }}
              className='input'
              placeholder='//write the item name to add'
            />
            <button onClick={getInput} style={{ padding: '10px', backgroundColor: '#06B6D4', color: 'white', outline: 'none', border: 'none' }}>Add</button>
          </div>
          <div className='items'>
            {item.map((prod, index) => {
              return (
                <div key={index} className='single-item'>
                  <input
                    type="checkbox"
                    checked={prod.checked}
                    onChange={() => toggleCheckbox(index)}
                  />
                  <span style={{ textDecoration: prod.checked ? 'line-through' : 'none' }}>{prod.name}</span>
                  <span>
                    <button
                      onClick={() => deleteItem(index)}
                      style={{ backgroundColor: 'black', color: 'white' }}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
    </>
  );
};

export default App;



