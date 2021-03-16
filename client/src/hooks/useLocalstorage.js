import React, { useEffect, useState } from 'react';

const PREFIX = 'whatsapp-clone-';

export default function useLocalStorage(key, initialValue) {
    const PREFIXED_KEY = PREFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(PREFIXED_KEY);
        if (jsonValue !== null) return JSON.parse(jsonValue);

        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        value && localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
    }, [value, PREFIXED_KEY]);

    return [value, setValue];
}
