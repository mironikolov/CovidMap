import React from 'react'
import { Chart } from 'react-charts'

export const ChartPresenter = (props) => {
    const data = React.useMemo(
        () => [
            {
            label: 'Cases',
            data: props.newCases
            }
        ],
        [props.newCases]
    )
    
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const series = React.useMemo(
        () => ({
          showPoints: true
        }),
        []
      )
     
    return (
        <div style={{
            width: '100vw',
            height: '200px',
            position: 'absolute',
            zIndex: 10,
            background: 'white',
            bottom: 0
        }}>
            
            <Chart data={data} axes={axes} series={series} />
        </div>
    )
}
