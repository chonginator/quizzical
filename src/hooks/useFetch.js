import { useState } from 'react';

function useFetch() {
    const [data, setData] = useState()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchMyAPI = async endpoint => {
        try {
            setLoading(true)
            const res = await fetch(endpoint)
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