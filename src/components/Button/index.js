import classNames from 'classnames/bind';
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)
function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    rounded = false,
    className,
    leftIcon,
    rightIcon,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps
    };
    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }
    if (disabled) {
        delete props.onClick;
        // Object.keys(props).forEach(key => {
        //     if (key.startsWith('on') && props[key] === 'function') {
        //         delete props[key]
        //     }
        // })
    }
    const classes = cx('wrapper', {
        primary,
        outline,
        text,
        disabled,
        small,
        large,
        rounded,
        leftIcon,
        rightIcon,
        [className]: className
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;