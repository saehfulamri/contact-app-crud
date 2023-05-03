import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

let api = axios.create({ baseURL: "http://localhost:3000" });

function App() {
    const [contacts, setContacts] = useState([]);

    const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

    const [formData, setFormData] = useState({
        name: "",
        telp: "",
    });

    useEffect(() => {
        api.get("/contacts").then((res) => {
            setContacts(res.data);
        });
    }, []);

    function handleChange(e) {
        let newFormState = { ...formData };
        newFormState[e.target.name] = e.target.value;
        setFormData(newFormState);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let data = [...contacts];

        if (formData.name === "") {
            return false;
        }
        if (formData.telp === "") {
            return false;
        }

        if (isUpdate.status) {
            data.forEach((contact) => {
                if (contact.id === isUpdate.id) {
                    contact.name = formData.name;
                    contact.telp = formData.telp;
                }
            });
        } else {
            let toSave = {
                id: uid(),
                name: formData.name,
                telp: formData.telp,
            };

            data.push(toSave);
        }

        setContacts(data);
        setIsUpdate(false);
        setFormData({ name: "", telp: "" });
        <Alert variant="success">Data berhasil ditambahkan!</Alert>;
    }

    function handleEdit(id) {
        let data = [...contacts];
        let foundData = data.find((contact) => contact.id === id);
        setIsUpdate({ status: true, id: id });
        setFormData({ name: foundData.name, telp: foundData.telp });
        <Alert variant="success">Data berhasil diupdate!</Alert>;
    }

    function handleDelete(id) {
        let data = [...contacts];
        let filteredData = data.filter((contact) => contact.id !== id);

        api.delete("/contacts" + id).then(() => alert("Data berhasil dihapus"));
        setContacts(filteredData);
        <Alert variant="success">Data berhasil dihapus!</Alert>;
    }

    return (
        <div>
            <div className="bg-white pb-3 mx-auto" style={{ width: 600 }}>
                <h1 className="px-3 d-flex justify-content-center py-3">
                    My Contact List
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 form-group">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            onChange={handleChange}
                            placeholder="Enter a name"
                            name="name"
                            value={formData.name}
                        />
                    </Form.Group>
                    <Form.Group className="form-group mb-3">
                        <Form.Label>No. Telp</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter a number"
                            name="telp"
                            value={formData.telp}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
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
                        <List
                            data={contacts}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default App;
