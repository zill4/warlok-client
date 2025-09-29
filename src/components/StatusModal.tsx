import { forwardRef, useImperativeHandle, useRef, useState } from 'preact/compat';
import '../styles/status-modal.css';

export type StatusModalHandle = {
  show: (title: string, message: string, progress?: number) => void;
  hide: () => void;
  updateTitle: (title: string) => void;
  updateMessage: (message: string) => void;
  updateProgress: (percent: number) => void;
  enableClose: (enable?: boolean) => void;
};

const StatusModal = forwardRef<StatusModalHandle>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('Processing');
  const [message, setMessage] = useState('Uploading image...');
  const [progress, setProgress] = useState(0);
  const [closeEnabled, setCloseEnabled] = useState(false);

  const hide = () => {
    setVisible(false);
    document.dispatchEvent(new CustomEvent('status-modal-closed', { detail: { status: title } }));
  };

  useImperativeHandle(ref, () => ({
    show(newTitle, newMessage, percent = 0) {
      setTitle(newTitle);
      setMessage(newMessage);
      setProgress(percent);
      setCloseEnabled(false);
      setVisible(true);
    },
    hide,
    updateTitle: setTitle,
    updateMessage: setMessage,
    updateProgress: setProgress,
    enableClose(enable = true) {
      setCloseEnabled(enable);
    },
  }));

  if (!visible) return null;

  return (
    <div className="status-modal">
      <div className="status-content">
        <h3>{title}</h3>
        <div className="status-message">{message}</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <button className="close-btn" onClick={hide} disabled={!closeEnabled}>
          Close
        </button>
      </div>
    </div>
  );
});

export default StatusModal;
