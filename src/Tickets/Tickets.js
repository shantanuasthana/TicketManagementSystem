import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import TicketContext from "../TicketContext";

import "./Tickets.css";

const Tickets = () => {
  let url = "https://60445d66c0194f00170bba02.mockapi.io/queries";
  let typeUrl = "https://60445d66c0194f00170bba02.mockapi.io/query-type";
  let { value1, value2 } = useContext(TicketContext);
  const [data, setData] = value1;
  const [queryData, setQueryData] = value2;

  const getData = async () => {
    const response = await fetch(url);
    const resData = await response.json();
    setData(resData);
  };
  const getTypeData = async () => {
    const response = await fetch(typeUrl);
    const data = await response.json();
    setQueryData(data);
  };

  useEffect(() => {
    getData();
    getTypeData();
  }, []);

  const deleteHandler = async (id) => {
    let deleteUrl = url + "/" + id;
    const resp = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await resp.json();
    getData();
  };
  return (
    <div className="tickets">
      <h2 className="tickets-heading">
        <strong>All Tickets</strong>
      </h2>
      <Link to="create-ticket" className="add-ticket btn btn-dark">
        Add +
      </Link>
      <div className="ticket-list card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold">Ticket List</h6>
        </div>
        <div className="card-body ticket-table">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th style={{ width: "300px" }}>Description</th>
                  <th style={{ width: "150px" }}>Query Type</th>
                  <th style={{ width: "150px" }}></th>
                </tr>
              </thead>
              <tbody>
                {data.map((ticket) => {
                  return (
                    <tr key={ticket.id}>
                      <td style={{ width: "300px" }}>{ticket.title}</td>
                      <td style={{ width: "500px" }}>{ticket.description}</td>
                      <td style={{ width: "150px" }}>{ticket.qtype}</td>
                      <td style={{ width: "150px" }}>
                        <Link to={`/edit-ticket/${ticket.id}`}>
                          <button className="btn btn-sm btn-primary mr-2">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            deleteHandler(ticket.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
