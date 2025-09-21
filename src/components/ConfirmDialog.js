import "./ConfirmDialog.css";

function ConfirmDialog({ title, description, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="confirm-dialog-actions">
          <button onClick={onConfirm} className="confirm-btn">
            Delete
          </button>
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
