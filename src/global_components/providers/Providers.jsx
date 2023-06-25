import React from 'react'
import Redux from './Redux'
import MUI from './MUI'
import Router from './Router'


function Providers({ children }) {
    return (
        <Redux>
            <MUI>
                <Router>
                    {children}
                </Router>
            </MUI>
        </Redux>
    )
}

export default Providers