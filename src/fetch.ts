import {useEffect, useState} from 'react';

const useFetch=(url:string)=>{
    const [data,setData]=useState<SoceityModel[]>();
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState();
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            fetch(url).then((res)=>{
                if(!res.ok){
                    throw Error(res.statusText)
                }
                return res.json()
            }).then((data:SoceityModel[])=>{
                setData(data)
                setLoading(false)
                setError(undefined);
            }).catch((error)=>{
                setError(error.message);
                setLoading(false);
            })
        },1000);
    },[url])
    return {data,loading,error}
}

export default useFetch;