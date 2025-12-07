import React from "react";
import ReactDOM from "react-dom";
import "./LogoutModal.css";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="logout-modal-backdrop" onClick={onCancel}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="logout-modal-header">
          <h2>Выход из аккаунта</h2>
        </div>
        <p className="logout-modal-text">
          После выхода из аккаунта для доступа потребуется снова ввести логин и пароль
        </p>
        <div className="logout-modal-actions">
          <button className="btn cancel" onClick={onCancel}>Отмена</button>
          <button className="btn confirm" onClick={onConfirm}>Выйти</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;
