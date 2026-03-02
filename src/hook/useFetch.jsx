import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    const [loading, setLoading] = useState(false);


    const httpConfig = (data, method) => {
        if(method === "POST") {
            setConfig({
                method,
                Headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setMethod(method);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setLoading(false);
        };
        fetchData();

    },[url , callFetch]);

    useEffect(() =>{
        const httpRequest = async () => {
            if(method === "POST") {
                let fetchOptions = [url, config];

                const res = await fetch(...fetchOptions);
                const json =  await res.json();
                setCallFetch(json);
            }
        };
        httpRequest();
    }, [config, method, url]);

    return{ data, httpConfig, loading };
};
