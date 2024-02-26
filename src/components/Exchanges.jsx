import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import Loader from './Loader';
import { useGetExchangesQuery } from '../services/cryptoExchangesApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{marginBottom: '10px'}}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Rank</Col>
      </Row>
      <Row gutter={[0, 10]}>
        {data?.slice(0, 100).map((exchange) => (
          <Col span={24} >
            <Collapse>
              <Panel
                key={exchange?.id}
                showArrow={false}
                header={(
                  <Row key={exchange?.id}>
                    <Col span={6}>
                      <Text><strong>{exchange?.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange?.quotes?.USD?.adjusted_volume_24h)}</Col>
                    <Col span={6}>{millify(exchange?.markets)}</Col>
                    <Col span={6}>{millify(exchange?.reported_rank)}</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange?.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;