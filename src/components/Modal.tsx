import { Portal } from './Portal';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { children, isOpen, setIsOpen } = props;

  const handleClose = () => {
    setIsOpen(false);
  };

  // onMouseDown event is used to prevent closing on mouse release.
  return (
    <>
      {isOpen && (
        <Portal>
          <div className="modal" onMouseDown={handleClose}>
            <div
              className="modal__window"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="modal__header">
                <button className="modal__close" onMouseDown={handleClose}>
                  X
                </button>
              </div>
              <div className="modal__content">{children}</div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
