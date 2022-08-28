
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AcountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useEffect, useState, useRef } from 'react';
import * as searchService from '~/services/searchService'
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebound } from '~/hooks';

const cx = classNames.bind(styles)
function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()
    const deboundedValue = useDebound(searchValue, 500)
    useEffect(() => {
        if (!deboundedValue.trim()) {
            setSearchResult([])
            return
        }
        setLoading(true)
        const fetch = async () => {
            setLoading(true)
            const result = await searchService.search(deboundedValue)
            setSearchResult(result)
            setLoading(false)
        }
        fetch()

    }, [deboundedValue])
    const handleHideResult = () => {
        setShowResult(false)
    }
    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. 
        <div>
            <HeadlessTippy
                // appendTo={() => document.body}
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Acounts
                            </h4>
                            {searchResult.map(result => (
                                <AcountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search acounts and videos'
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('search-clear')} onClick={() => {
                            setSearchValue('')
                            inputRef.current.focus()
                            setSearchResult([])
                        }}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </
            HeadlessTippy>
        </div>
    );
}

export default Search;