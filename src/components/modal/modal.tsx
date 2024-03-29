import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from './modal-overlay/modal-overlay';

import styles from './modal.module.css';

const Modal = ({ children, header, onClose }: { children: React.ReactNode; header?: string; onClose: () => void }) => {
    const modalRoot = document.getElementById('modal-root') as HTMLElement;
    const modalElementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const escapeHandler = (event: any) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', escapeHandler);
        if (modalElementRef.current) {
            modalElementRef.current.focus();
        }
        return () => {
            document.removeEventListener('keydown', escapeHandler);
        };
    });
    return ReactDOM.createPortal(
        <>
            <div className={cs(styles['modal'])}>
                <ModalOverlay onClose={onClose} />
                <div
                    className={cs(styles['modal__container'], 'pr-10 pl-10 pt-10 pb-15')}
                    ref={modalElementRef}
                    tabIndex={0}
                >
                    <div className={cs(styles['modal__header-container'])}>
                        <h2 className={cs(styles['modal__header'], 'text text_type_main-large')}>{header}</h2>
                        <button
                            className={cs(styles['modal__close-button'])}
                            aria-label="Закрыть форму"
                            type="button"
                            onClick={onClose}
                        >
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>,
        modalRoot,
    );
};

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
