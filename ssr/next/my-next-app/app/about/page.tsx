// import { Button } from 'antd'
// import { useState } from 'react'
import LazyCom from './components/lazyCom'
import AsyncCom from './components/asyncCom';
import React, { Suspense,  } from 'react';

export default function About() {
    // const [count, setCount] = useState(0)
    // const handleClick = () => {
    //     setCount(count + 1)
    // }
    // const data = fetch('http://www.server.com/api/data');
    return <>
    <div style={{padding: '10px'}}>
        <div>
            lqy
        </div>
        <div style={{marginBottom: '10px'}}>
        <Suspense fallback={<div>Loading...</div>}>
            <LazyCom />
        </Suspense>
        </div>
        <Suspense fallback={<div>
            Loading....
        </div>}>
            <AsyncCom></AsyncCom>
        </Suspense>
        <div>
            到底的是什么原因？
        </div>
    </div>
    </>
}