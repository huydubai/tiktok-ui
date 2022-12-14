import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem';
import Header from './Header';
import PropTypes from 'prop-types';
import { useState } from 'react';

const cx = classNames.bind(styles)
const defaultFn = () => {

}
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory(prev => [...prev, item.children])
                } else {
                    onChange(item)
                }
            }} />
        })
    }
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-poper')}>
                {history.length > 1 && <Header title={current.title} onBack={() => {
                    setHistory(prev => prev.slice(0, prev.length - 1))
                }} />}
                <div className={cx(('menu-body'))}>{renderItem()}</div>
            </PopperWrapper>
        </div>
    )
    // Reset to first
    const handleBack = () => setHistory(prev => prev.slice(0, 1))
    return (
        <Tippy
            interactive
            // visible // để ẩn hiện
            delay={[0, 800]} // delay bật tắt
            placement='bottom-end' // vị trí nằm
            offset={[12, 8]} // khoảng cách
            hideOnClick={hideOnClick} // set về false
            render={renderResult}
            onHide={handleBack}
        >
            {children}
        </Tippy>
    );
}
Menu.propTypes = {
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
}
export default Menu;