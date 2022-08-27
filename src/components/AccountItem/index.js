import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'

const cx = classNames.bind(styles)

function AcountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/fac92301a36c2275c99f393061ef04ca~c5_100x100.jpeg?x-expires=1661691600&x-signature=weM9aIGNzjVrU%2BAUUQCCqO%2FmaAU%3D" alt="Hoa" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>Nguyễn Thị Ngọc Nhớ
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>
                    ngocnho
                </span>
            </div>
        </div>
    );
}

export default AcountItem;