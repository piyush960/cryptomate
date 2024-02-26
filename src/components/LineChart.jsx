import React from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
import { Col, Row, Typography } from 'antd';
import { current } from '@reduxjs/toolkit';

const { Title: TypoTitle } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for(let i=0; i<coinHistory?.data?.history?.length; i += 1){
    coinPrice.push(coinHistory?.data?.history[i].price)
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString())

  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <TypoTitle level={2} className='chart-title'>
          { coinName } Price Chart
        </TypoTitle>
        <Col className='price-container'>
          <TypoTitle level={5} className='price-change'>{coinHistory?.data?.change}%</TypoTitle>
          <TypoTitle level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</TypoTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart