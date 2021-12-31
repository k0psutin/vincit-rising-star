import React from 'react';
import { Card } from 'react-bootstrap';
import { ResultObject } from '../types';

const Entry: React.FC<ResultObject> = ({ title, textArray }) => {
  if (title === '' || textArray.length === 0) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        { textArray.map((text) => <Card.Text key={text}>{text}</Card.Text>) }
      </Card.Body>
    </Card>
  );
};

export default Entry;
