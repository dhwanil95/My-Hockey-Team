import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, selectUsers, User } from "../redux/userslice";
import { Table, Button } from "react-bootstrap";
import UserForm from "./UserForm";
import ConfirmationModal from "./ConfirmationModal";

const UserTable: React.FC = () => {

  // Retrieve the users from the Redux store
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | undefined>(undefined);

  // Handle delete button click, open the delete confirmation modal
  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setDeleteModalOpen(true);
  };

  // Handle confirm delete button click, dispatch the delete action
  const handleConfirmDelete = () => {
    if (userToDelete !== undefined) {
      dispatch(deleteUser(userToDelete));
    }
    setDeleteModalOpen(false);
  };
  
  // Handle edit button click, open the user form for editing
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditFormOpen(true);
  };

   // Handle form close event, close the edit form
  const handleClose = () => {
    setEditFormOpen(false);
    setSelectedUser(undefined);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>Club</th>
            <th>Rank</th>
            <th>Achievements</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.gender}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.city}</td>
              <td>{user.club}</td>
              <td>{user.rank}</td>
              <td>{user.achievements}</td>
              <td>
                {" "}
                {typeof user.photo === "string"
                  ? user.photo // Display the photo URL if it is a string
                  : user.photo &&
                    user.photo
                      .name // Display the file name if it is a File object
                }
              </td>

              <td>
                <Button variant="primary" onClick={() => handleEdit(user)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isEditFormOpen && <UserForm user={selectedUser} onClose={handleClose} />}
      <ConfirmationModal
        show={isDeleteModalOpen}
        title="Delete user"
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default UserTable;
