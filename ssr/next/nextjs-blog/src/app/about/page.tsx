"use client"
import { useState } from "react"
import { Button } from 'antd'
const About = () => {
    const [name, setName] = useState<string>('帅气');
    const handleClick = () => {
        setName(name + '1')
    }
    return <>
        <div style={{marginBottom: '5px'}}>
            {name}
        </div>
        <Button onClick={handleClick}>
            点我
        </Button>
    </>
}
export default About