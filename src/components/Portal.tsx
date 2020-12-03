import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const Portal: React.FC = ({ children }) => {
  const el = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
};
