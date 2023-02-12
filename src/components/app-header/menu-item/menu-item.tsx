import cs from 'classnames';

import PropTypes from 'prop-types';

const MenuItem = ({
    className,
    text,
    icon,
    isActive = false,
}: {
    className: string;
    text: string;
    isActive?: boolean;
    icon: Function;
}) => {
    const Icon = icon;
    return (
        <li className={className} role="button">
            <Icon type={isActive ? 'primary' : 'secondary'} />
            <span className={cs('text text_type_main-default', { text_color_inactive: !isActive }, 'pl-2')}>
                {text}
            </span>
        </li>
    );
};

MenuItem.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    icon: PropTypes.func.isRequired,
};

export default MenuItem;
