import axios from 'axios';
import React, { useContext } from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import { AppContext } from '../context';
import { CoinGeckoObject } from '../types';
import { convertToUnixTime } from '../utils';
import parsedPrices from '../utils/parsePrices';

const DatePicker = () => {
  const { setDateRange, dateRange } = useContext(AppContext);
  const { setPriceList, setVolumeList } = useContext(AppContext);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDateRange({ ...dateRange, [name]: value });
  };

  const getCoinGeckoData = async () => {
    const uri = process.env.REACT_APP_API_URI;

    const from = convertToUnixTime(dateRange.from);
    const to = convertToUnixTime(`${dateRange.to}T23:59:59Z`);

    if (from > to) {
      return;
    }

    // eslint-disable-next-line
    const { data: { prices, total_volumes } } = await axios.get<CoinGeckoObject>(`${uri}range?vs_currency=eur&from=${from}&to=${to}`);

    if (!prices || prices.length === 0) {
      setPriceList(null);
    } else {
      const parsedPriceList = parsedPrices(prices, dateRange);
      setPriceList(parsedPriceList);
    }

    if (!total_volumes || total_volumes.length === 0) {
      setVolumeList(null);
    } else {
      setVolumeList(total_volumes);
    }
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFrom">
          <Form.Text id="fromHelp" muted>
            From
          </Form.Text>
          <Form.Control aria-describedby="fromHelp" type="date" name="from" onChange={handleDateChange} defaultValue={dateRange.from} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridTo">
          <Form.Text id="toHelp" muted>
            To
          </Form.Text>
          <Form.Control aria-describedby="toHelp" type="date" name="to" onChange={handleDateChange} defaultValue={dateRange.to} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridFetch">
          <Form.Text id="fetchHelp" muted>
            <br />
          </Form.Text>
          <Form.Control aria-describedby="fetchHelp" type="button" defaultValue="Fetch" onClick={getCoinGeckoData} />
        </Form.Group>
      </Row>
    </Form>
  );
};

export default DatePicker;
