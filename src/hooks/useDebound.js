import { useState, useEffect } from "react";
function useDebound(value, delay) {
    const [deboundValue, setDeboundValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDeboundValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return deboundValue;
}
export default useDebound;

// 1. searchValue: '' -> value = '' -> initState = '' -> deboundValue = '' -> return
// 2. searchValue: 'h' -> value = 'h' -> initState = '' (vì chỉ nhận lần đầu) -> deps = 'h' sau 500ms thì set lại value -> deboundValue = 'h' 