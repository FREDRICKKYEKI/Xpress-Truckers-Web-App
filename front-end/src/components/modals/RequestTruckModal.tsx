import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export function RequestTruckModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="container">
        <h3>Request Truck:</h3>
        <p>Do you wish to start the trip ?</p>
        <div className="row">
          <div className="col-6">
            <button className="w-100 bg-dark btn btn-success m-auto">
              Yes
            </button>
          </div>
          <div className="col-6">
            <button className="w-100 btn btn-danger">No</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
