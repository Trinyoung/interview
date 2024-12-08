"use client"
import { Button } from 'antd'
import { useState } from 'react'
export default function About() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count + 1)
    }
    return <>
    <div style={{padding: '10px'}}>
        <div style={{marginBottom: '10px'}}>
            { count }
        </div>
        <Button onClick={handleClick} type='primary'>
            点击
        </Button>
    </div>
    </>
}