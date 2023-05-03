import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
// import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

let api = axios.create({ baseURL: "http://localhost:3000" });

function App() {
    return (
        <div>
            <div
                className="fixed-top bg-white pb-3 mx-auto"
                style={{ width: 600 }}>
                <h1 className="px-3 d-flex justify-content-center py-3">
                    My Contact List
                </h1>
                <Form>
                    <Form.Group
                        className="mb-3 form-group"
                        controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Enter a name"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>No. Telp</Form.Label>
                        <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Enter a number"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div style={{ marginTop: 50 }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>No Telp.</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default App;
