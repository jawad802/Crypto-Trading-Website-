import React from 'react'
import ChartCard from './ChartCard'
import TopMovers from './TopMovers'
import CoinCards from './CoinCards'

const Dashboard = () => {
    return (
        <div className='mt-8'>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart takes up 2 columns on large screens */}
                <div className="lg:col-span-2 lg:mt-30">
                    <ChartCard />
                </div>

                {/* Top mover small cards take up 1 column on large screens */}
                <div className="lg:col-span-1">
                    <TopMovers />
                </div>
            </div>
            <div className='mt-5 p-8'>
                <h1 className='font-bold text-2xl '>Top Coins</h1>
                <CoinCards />
            </div>
        </div>
    )
}

export default Dashboard