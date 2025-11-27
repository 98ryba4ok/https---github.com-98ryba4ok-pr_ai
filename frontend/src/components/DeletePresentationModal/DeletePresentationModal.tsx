import React from "react";
import "./DeletePresentationModal.css";

interface DeletePresentationModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeletePresentationModal: React.FC<DeletePresentationModalProps> = ({
  title,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="delete-modal-backdrop" onClick={onCancel}>
      <div
        className="delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-modal-header">
          <h2>Удалить презентацию?</h2>
        </div>

        <p className="delete-modal-text">
          Вы уверены, что хотите удалить презентацию <strong>"{title}"</strong>? Это действие невозможно отменить.
        </p>

        <div className="delete-modal-actions">
          <button className="btn cancel" onClick={onCancel}>
            Отмена
          </button>
          <button className="btn confirm-delete" onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePresentationModal;
