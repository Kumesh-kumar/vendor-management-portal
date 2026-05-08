import React from 'react'

const Card = ({ title, value }) => {
    return (
        <div>
            <h2 className='text-3xl font-bold mt-2'>{value}</h2>
            <div className='bg-white p-5 rounded-xl shadow-md'>
                <h3 className='text-gray-400'>
                    {title}
                </h3>
            </div>
        </div>
    )
}

export default Card