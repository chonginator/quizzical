import { useState, useEffect } from 'react';

const useWindowScrollSize = () => {
    const [windowScrollSize, setWindowScrollSize] = useState({
        width: null,
        height: null
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowScrollSize({
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight
            })
        }
        
        // Set window dimensions immediately
        handleResize()

        window.addEventListener("resize", handleResize)

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowScrollSize
}

export default useWindowScrollSize;