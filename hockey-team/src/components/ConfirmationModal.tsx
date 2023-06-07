import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface ConfirmationModalProps {
  show: boolean; // Controls the visibility of the modal
  title: string; // Ttile of the modal
  message: string; // Message displayed in the modal
  onConfirm: () => void; //Confirm button is clicked
  onCancel: () => void; //Cancel button is clicked
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, title, message, onConfirm, onCancel }) => (
  <Modal show={show} onHide={onCancel}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationModal;
