import React, { useState, useContext } from "react";
import "./CreateTicket.css";
import { useHistory } from "react-router-dom";
import TicketContext from "../TicketContext";

const CreateTicket = () => {
  let url = "https://60445d66c0194f00170bba02.mockapi.io/queries";
  let typeUrl = "https://60445d66c0194f00170bba02.mockapi.io/query-type";
  const history = useHistory();
  let { value1, value2 } = useContext(TicketContext);
  const [queryData, setQueryData] = value2;
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    qtype: ""
  });

  const getTypeData = async () => {
    const response = await fetch(typeUrl);
    const data = await response.json();
    setQueryData(data);
  };

  const saveData = async (newObj) => {
    if (newObj.option !== "") {
      const resp = await fetch(typeUrl, {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const result = await resp.json();
    }
    getTypeData();
  };

  const handleChange = (e) => {
    let type = e.target.name;
    let newVal = e.target.value;
    setTicketData((prevVal) => {
      return {
        ...prevVal,
        [type]: newVal
      };
    });
  };

  const handleSubmit = async () => {
    console.log(ticketData);
    if (ticketData.title !== "" && ticketData.description !== "") {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(ticketData),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const result = await resp.json();
    }

    history.push("/tickets");
  };
  return (
    <div className="create-ticket">
      <h2 className="create-ticket-heading">
        <strong>Create Ticket</strong>
      </h2>
      <div className="create-ticket-form">
        <div className="form-group">
          <label htmlFor="qtype">Query Type</label>

          <select
            className="form-control"
            id="qtype"
            name="qtype"
            onChange={handleChange}
          >
            <option>Select type</option>
            {queryData.map((type) => {
              return (
                <option key={type.id} value={type.option}>
                  {type.option}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={ticketData.title}
            onChange={handleChange}
            className="form-control"
            id="title"
            placeholder="Enter Title"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea
            className="form-control"
            id="desc"
            value={ticketData.description}
            name="description"
            onChange={handleChange}
            rows="4"
            placeholder="Put your description here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="create-btn btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateTicket;
