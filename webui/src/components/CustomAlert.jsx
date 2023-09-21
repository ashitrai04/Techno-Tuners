import React from 'react'

const CustomAlert = () => {
    return (
        <>
            <div role="alert">
                <div className="bg-yellow-600 text-white font-bold rounded-t px-4 py-2">
                    Info
                </div>
                <div className="border border-t-0 border-yellow-400 rounded-b bg-red-100 px-4 py-3 text-yellow-700">
                    <p>Please keep your vechicle aside an ambulance is on the way.</p>
                    {/* <button className='my-2 p-2 border border-gray-300 bg-yellow-600 text-white rounded'>Contact Now</button> */}
                </div>
            </div>
        </>
    )
}

export default CustomAlert