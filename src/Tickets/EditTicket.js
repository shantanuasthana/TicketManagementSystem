import React, { useEffect, useState, useContext } from "react";
import TicketContext from "../TicketContext";
import { useHistory } from "react-router-dom";
import "./EditTicket.css";

function EditTicket(props) {
  const history = useHistory();
  let url = "https://60445d66c0194f00170bba02.mockapi.io/queries";
  let userId = props.match.params.id;
  let { value1, value2 } = useContext(TicketContext);
  const [data, setData] = value1;
  const [queryData, setQueryData] = value2;
  const [updateTicket, setUpdateTicket] = useState({
    title: "",
    description: "",
    qtype: ""
  });

  useEffect(() => {
    console.log(queryData);
    let editTicket = data.find((obj) => obj.id === userId);
    setUpdateTicket({
      title: editTicket.title,
      description: editTicket.description,
      qtype: editTicket.qtype
    });
  }, []);

  const handleChange = (e) => {
    let type = e.target.name;
    let newVal = e.target.value;
    setUpdateTicket((prevVal) => {
      return {
        ...prevVal,
        [type]: newVal
      };
    });
  };

  const handleSubmit = async () => {
    const resp = await fetch(url + "/" + userId, {
      method: "PUT",
      body: JSON.stringify(updateTicket),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await resp.json();
    history.push("/tickets");
  };
  return (
    <div className="edit-ticket">
      <h2 className="edit-ticket-heading">
        <strong>Edit Ticket</strong>
      </h2>
      <div className="edit-ticket-form">
        <div className="form-group">
          <label htmlFor="qtype">Query Type</label>

          <select
            className="form-control"
            id="qtype"
            name="qtype"
            onChange={handleChange}
          >
            <option value={updateTicket.qtype}>{updateTicket.qtype}</option>;
            {queryData.map((type) => {
              if (type.option !== updateTicket.qtype) {
                return (
                  <option key={type.id} value={type.option}>
                    {type.option}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={updateTicket.title}
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
            value={updateTicket.description}
            name="description"
            onChange={handleChange}
            rows="4"
            placeholder="Put your description here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="edit-btn btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditTicket;
