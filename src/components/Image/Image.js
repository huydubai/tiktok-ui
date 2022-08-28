import { forwardRef, useState } from "react";
import { images } from "~/assets/images";
import styles from './Image.module.scss'
import classNames from "classnames";
import PropTypes from 'prop-types';
const Image = forwardRef(({ className, src, alt, fallback: customFallback = images.errorImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(customFallback)
    }
    return (
        <img className={classNames(styles.wrapper, className)} ref={ref} alt={alt} src={fallback || src} {...props} onError={handleError} />
    );
});
Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}
export default Image;