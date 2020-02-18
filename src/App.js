import React from 'react'
import './App.css'
import Area from './area'

/**
 * Root react component
 */
class App extends React.Component {
    /**
     * Main app render function renders Area component
     */
    render() {
        return (
            <div>
                <Area />

                <cite>
                    <a
                        style={{ marginLeft: '20px' }}
                        href="https://github.com/smycynek/area-under-curve-web"
                    >
                        https://github.com/smycynek/area-under-curve-web
                    </a>
                </cite>
            </div>
        )
    }
}
export default App
