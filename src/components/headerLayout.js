import React from 'react'
import Cookies from 'js-cookie'

const Header = ({ children }) => {
    return (
        <>
            <div className='flex flex-col'>
                <button onClick={() => { Cookies.remove("token") }}>Logout</button>
                {children}
            </div>
        </>
    )
}

export default Header