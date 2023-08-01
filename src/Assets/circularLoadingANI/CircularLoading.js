import React from 'react'
import './circularLoading.css';
export default function CircularLoading() {
    return (
        <div className="loading" style={{ fontSize: '35px', '--duration': '2s', '--numDot': '10' }}>
            <div style={{ '--index': 0 }}></div>
            <div style={{ '--index': 1 }}></div>
            <div style={{ '--index': 2 }}></div>
            <div style={{ '--index': 3 }}></div>
            <div style={{ '--index': 4 }}></div>
            <div style={{ '--index': 5 }}></div>
            <div style={{ '--index': 6 }}></div>
            <div style={{ '--index': 7 }}></div>
            <div style={{ '--index': 8 }}></div>
            <div style={{ '--index': 9 }}></div>
        </div >
    )
}
