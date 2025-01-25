import React, { useState } from "react";

function UjTermek({ postData }) {
  const [termek, setTermek] = useState({
    title: "",
    price: 10,
    description: "",
    category: "",
    image: "",
  });

  function handleChange(event) {
    const stermek = { ...termek };
    stermek[event.target.id] =
      event.target.id === "price"
        ? parseFloat(event.target.value) || 0
        : event.target.value;
    setTermek({ ...stermek });
  }

  function handleSubmit(event) {
    event.preventDefault();
    postData("/products", termek);
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Név
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          required
          placeholder="Termék neve"
          onChange={(event) => {
            handleChange(event);
          }}
          value={termek.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Ár
        </label>
        <input
          type="number"
          min="10"
          max="100000"
          required
          className="form-control"
          id="price"
          value={termek.price}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Kategória
        </label>
        <input
          type="text"
          className="form-control"
          id="category"
          placeholder="Kategória megadása"
          onChange={(event) => {
            handleChange(event);
          }}
          value={termek.category}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Leírás
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={termek.description}
          onChange={(event) => {
            handleChange(event);
          }}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Válassz képet!
        </label>
        <input
          className="form-control"
          type="file"
          id="image"
          value={termek.image}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Küld
      </button>
    </form>
  );
}

export default UjTermek;






/* import React, { useContext, useState } from "react";
import { ApiContext } from "../../contexts/ApiContext";

function UjTermek() {
  const { postData, kategoriaData } = useContext(ApiContext);
  console.log(kategoriaData)
  const [termek, setTermek] = useState({
    title: "",
    price: 10,
    description: "",
    category: "",
    image: "",
  });

  function handleChange(event) {
    console.log(event.target.id);
    const stermek = { ...termek };
    stermek[event.target.id] =
      event.target.id === "price"
        ? parseFloat(event.target.value) || 0
        : event.target.value;
    setTermek({ ...stermek });
   
  }
  function handleSubmit(event) {
    event.preventDefault();
    postData("/products", termek);
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Név
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          required
          placeholder="Termék neve"
          onChange={(event) => {
            handleChange(event);
          }}
          value={termek.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Ár
        </label>
        <input
          type="number"
          min="10"
          max="100000"
          required
          className="form-control"
          id="price"
          value={termek.price}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Kategória
        </label>
        <select
        required
          id="category"
          className="form-select"
          value={termek.category}
          onChange={handleChange}
        >
          <option value="">Válassz kategóriát!</option>
          {
             kategoriaData.map((elem, index)=>{
              return (<option value={elem} key={index}>{elem}</option>)
            })
          } 
          
          
        
       
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Leírás
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={termek.description}
          onChange={(event) => {
            handleChange(event);
          }}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Válassz képet!
        </label>
        <input
          className="form-control"
          type="file"
          id="image"
          value={termek.image}
          onChange={(event) => {
            handleChange(event);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Küld
      </button>
    </form>
  );
}

export default UjTermek; */