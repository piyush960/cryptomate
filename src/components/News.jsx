import React, { useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('cryptocurrency')
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, newsCount : simplified ? 1 : 2 })
  const { data } = useGetCryptosQuery(100);

  if(isFetching) return <Loader />;
  
  const news = cryptoNews?.news;

  const demoImage = 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      { news?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news?.url} target='_blank' rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={4}>
                  {news?.title.length > 60 ? `${news?.title.substring(0, 60)}...` : news?.title}
                </Title>
                <img style={{ maxWidth: '150px', maxHeight: '100px', paddingLeft: '10px' }} src={news?.top_image || demoImage} alt="news" />
              </div>
              <p>
                {news?.short_description.length > 100 ? `${news?.short_description.substring(0, 100)}...` : news?.short_description}
              </p>
              <div className="provider-container">
                <div>
                  <Text>{ news?.publisher?.title }</Text>
                </div>
                <Text>{moment(news?.date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}

    </Row>
  )
}

export default News