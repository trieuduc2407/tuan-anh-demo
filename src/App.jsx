import React from 'react'
import World from './pages/World'
import { Routes, Route } from 'react-router-dom'
import SubMap from './pages/SubMap'
import MarkerProvider from './context/MarkerContext'

const App = () => {
    return (
        <MarkerProvider>
            <Routes>
                <Route path="/" element={<World />} />
                <Route path="/submap/:countryId" element={<SubMap />} />
            </Routes>
        </MarkerProvider>
    )
}

export default App
