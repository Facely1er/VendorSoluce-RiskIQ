import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useApp } from './AppContext';
import './Toast.css';

const Toast = () => {
  const { toast } = useApp();
  
  if (!toast) return null;
  
  const icons = {
    success: <CheckCircle size={24} />,
    error: <XCircle size={24} />,
    warning: <AlertTriangle size={24} />,
    info: <Info size={24} />
  };
  
  return (
    <div className={`toast toast-${toast.type}`}>
      <div className="toast-icon">
        {icons[toast.type]}
      </div>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        <div className="toast-message">{toast.message}</div>
      </div>
    </div>
  );
};

export default Toast;
