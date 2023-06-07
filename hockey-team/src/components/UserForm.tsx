import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser, User } from "../redux/userslice";
import { Modal, Button, Form } from "react-bootstrap";
import "../App.css";
interface UserFormProps {
  user?: User; // An optional user prop that would hold data when editing an existing user
  onClose: () => void; // Callback function to close the form modal
}

// Define the UserForm component
const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [gender, setGender] = useState(user ? user.gender : "");
  const [dateOfBirth, setDateOfBirth] = useState(user ? user.dateOfBirth : "");
  const [city, setCity] = useState(user ? user.city : "");
  const [club, setClub] = useState(user ? user.club : "");
  const [rank, setRank] = useState<number>(user ? user.rank : 0);
  const [achievements, setAchievements] = useState(
    user ? user.achievements : ""
  );
  const [photo, setPhoto] = useState<File | string | null>(user ? user.photo : null);
  const [photoName, setPhotoName] = useState(user ? user.photo : "");

  // set photoName when photo changes
  useEffect(() => {
    if (photo instanceof File) {
      setPhotoName(photo.name);
    }
  }, [photo]);
  
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [cityError, setCityError] = useState("");
  const [clubError, setClubError] = useState("");
  const [rankError, setRankError] = useState("");
  const [achievementsError, setAchievementsError] = useState("");
  
  const isEditing = Boolean(user);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("Please enter a valid first name.");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (lastName.trim() === "") {
      setLastNameError("Please enter a valid last name.");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (gender.trim() === "") {
      setGenderError("Please select a gender.");
      isValid = false;
    } else {
      setGenderError("");
    }

    if (dateOfBirth.trim() === "") {
      setDateOfBirthError("Please enter a valid date of birth.");
      isValid = false;
    } else {
      setDateOfBirthError("");
    }

    if (city.trim() === "") {
      setCityError("Please enter a valid city.");
      isValid = false;
    } else {
      setCityError("");
    }

    if (club.trim() === "") {
      setClubError("Please select a club.");
      isValid = false;
    } else {
      setClubError("");
    }

    if (rank <= 0) {
      setRankError("Please enter a valid rank.");
      isValid = false;
    } else {
      setRankError("");
    }

    if (achievements.trim() === "") {
      setAchievementsError("Please enter valid achievements.");
      isValid = false;
    } else {
      setAchievementsError("");
    }

    if (!isValid) {
      return;
    }

    const userData = {
      id: isEditing ? user!.id : Date.now(),
      firstName,
      lastName,
      gender,
      dateOfBirth,
      city,
      club,
      rank,
      achievements,
      photo: typeof photo === 'string' ? photo : photo instanceof File ? photo.name : null,
    };

    // Dispatch action to Redux store based on whether the form is for adding a new user or editing an existing user
    if (isEditing) {
      dispatch(editUser(userData));
    } else {
      dispatch(addUser(userData));
    }

    onClose();
  };

  // Define the current date for later use in form validation
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>{user ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>
              <strong>First Name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>
              <strong>Last Name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGender" className="mb-3">
            <Form.Label>
              <strong>Gender</strong>
            </Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              id="maleRadio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              id="femaleRadio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDateOfBirth" className="mb-3">
            <Form.Label>
              <strong>Date of Birth</strong>
            </Form.Label>
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              isInvalid={dateOfBirthError !== "" || dateOfBirth > currentDate} // Check if the selected date is in the future
            />
            <Form.Control.Feedback type="invalid">
              {dateOfBirth > currentDate
                ? "Birthdate cannot be in the future"
                : dateOfBirthError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formCity" className="mb-3">
            <Form.Label>
              <strong>City</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formClub" className="mb-3">
            <Form.Label>
              <strong>Club</strong>
            </Form.Label>
            <Form.Control
              as="select"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              required
            >
              <option value="">Select Club</option>
              <option value="Calgary Flames">Calgary Flames</option>
              <option value="Edmonton Oilers">Edmonton Oilers</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formRank" className="mb-3">
            <Form.Label>
              <strong>Rank</strong>
            </Form.Label>
            <Form.Control
              type="number"
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAchievements" className="mb-3">
            <Form.Label>
              <strong>Achievements</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhoto" className="mb-3">
          <Form.Label>
            <strong>Photo</strong>
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                setPhoto(file);
              }
            }}
          />
          {photo && <p>Selected File: {typeof photo === 'string' ? photo : photo.name}</p>}
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {user ? "Save Changes" : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;
