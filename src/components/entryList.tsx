import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ResultObject } from '../types';
import generateEntries from './config/generateEntries';
import Entry from './entry';

const EntryList = () => {
  const entries = generateEntries();

  if (entries[0].title === '') {
    return (
      <Container>
        Nothing to show. Try selecting a different date range and re-fetch.
      </Container>
    );
  }

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          {entries.map((entry: ResultObject) => (
            <Entry
              key={entry.title}
              title={entry.title}
              textArray={entry.textArray}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default EntryList;
