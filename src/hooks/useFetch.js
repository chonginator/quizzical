import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        async function fetchMyAPI() {
            try {
                setLoading(true)
                const res = await fetch(url)
                const data = await res.json()
                setData(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMyAPI()
    }, [url])

    return {data, error, loading}
}

export default useFetch;