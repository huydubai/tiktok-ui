import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { images } from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faSignIn, faEllipsisVertical, faEarthAsia, faQuestionCircle, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AcountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles)
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                    type: 'language'
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt',
                    type: 'language'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Feedback and Help',
        to: '/feebback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keybroad shortcuts',
    },
]
function Header() {
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        setTimeout(() => {
            // set kêt quả khi có api
            setSearchResult([])
        }, 0)
    }, [])
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
        switch (menuItem.type) {
            case 'language':
                //  Handle change language
                break
            default:
        }
    }
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="TikTok" />
                </div>
                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>
                                    Acounts
                                </h4>
                                <AcountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder='Search acounts and videos' spellCheck={false} />
                        <button className={cx('search-clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    <Button text>Upload</Button>
                    <Button leftIcon={<FontAwesomeIcon icon={faSignIn} />} primary>Log in</Button>
                    <Menu
                        items={MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        <button className={cx('more-icon')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header >

    );
}
export default Header;