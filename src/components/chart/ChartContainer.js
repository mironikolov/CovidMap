import React, {useState, useEffect} from 'react'
import {ChartPresenter} from './ChartPresenter';

export function ChartContainer(props) {
    const [newCases, setNewCases] = useState([]);

    useEffect(() => {
        setNewCases([]);
        fetch(`https://disease.sh/v3/covid-19/historical/${props.countryInfo || 'bgr'}?lastdays=7`)
        .then(res => res.json())
        .then(res => {  
            const x = Object.keys(res.timeline.cases)
            .map( key => {
                return { 
                    x: Date.parse([key]),
                    y: res.timeline.cases[key]
                };
            });
            setNewCases(x);
        }, err => console.log(err));
    }, [props]);

    return (
        <div >
            <ChartPresenter newCases={newCases} />
        </div>
    )
}
