import React from "react";
import Button from "react-bootstrap/Button";

const List = ({ data, handleEdit, handleDelete }) => {
    return (
        <tbody>
            {data.map((contact, index) => {
                return (
                    <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.telp}</td>
                        <td>
                            <Button
                                onClick={() => handleEdit(contact.id)}
                                variant="warning"
                                size="sm">
                                Edit
                            </Button>{" "}
                            <Button
                                onClick={() => handleDelete(contact.id)}
                                variant="danger"
                                size="sm">
                                <i class="ri-delete-bin-line"></i>
                            </Button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default List;
