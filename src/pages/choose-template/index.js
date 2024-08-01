'use client'

import Header from 'components/components/headerLayout'
import React, { useEffect, useRef } from 'react'

const ChooseTemplate = () => {

    const ref = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            ref.current?.click()
        }, 2000);
    }, [])

    return (
        <div>
            <button onClick={() => { console.log("adjfbkb") }} ref={ref} type="button">Click me!</button>
        </div>
    )
}

export default ChooseTemplate