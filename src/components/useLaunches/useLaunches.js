import React, { useState, useEffect } from 'react'

import FetchData from '../../service/FetchData';

const fetchData = new FetchData();

const useLaunches = () => {
    const [data, setData] = useState([]);

    useEffect(() => fetchData.getLaunches().then(launches => setData(launches)), []);

    const getLaunch = id => data.find(item => item.id === id);

    return { data, getLaunch };
}

export default useLaunches;