import PropTypes from 'prop-types';
import cs from 'classnames';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }: { onClose: React.MouseEventHandler }) => {
    return <div onClick={onClose} className={cs(styles['modal-overlay'])} />;
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
