import { useEffect, useState } from "react";
import { fetchUserPlaces } from "../http";

function useFetch(fetchFn, initialValue){

    const [isFetching, setIsFetching] = useState();
    const [error, isError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);
    useEffect(()=> {
        async function fetchData(){
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data)
            }catch(error){
                setError({message: error.message || "Failed to fetch data"})
            }
        
            setIsFetching(false)
        }

        fetchData()
    }
    ,[fetchFn])
 
    return {
        isFetching, 
        fetchedData, 
        setFetchedData,
        error
    }
}

export default useFetch;