import { useState } from 'react';

function useFetch() {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchMyAPI = async url => {
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

    return { fetchMyAPI, data, error, loading }
}

export default useFetch;