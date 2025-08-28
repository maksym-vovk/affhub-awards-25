import {useEffect} from "react";

function useClickOutside(ref, isOpen, onClose) {
    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, ref, onClose]);
}

export default useClickOutside
