import React from 'react'
import ChartCard from './ChartCard'
import TopMovers from './TopMovers'
import CoinCards from './CoinCards'

const Dashboard = () => {
    return (
        <div className='mt-8'>
            <div className=' gap-6 lg:gap-0 md:flex '>
                <ChartCard />
                <TopMovers/>
            </div>
            <CoinCards/>
        </div>
    )
}

export default Dashboard