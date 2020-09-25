import React from 'react'
import { CodepenOutlined } from '@ant-design/icons';

function LandingPage() {
    return (
        <>
            <div className="app">
                <CodepenOutlined style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>sample</div>
        </>
    )
}

export default LandingPage
