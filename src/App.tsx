import React from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from './components/datePicker';
import EntryList from './components/entryList';

document.title = 'Scrooge\'s cryptoanalyzer';

const App = () => (
  <Container className="my-auto">
    <h1 className="text-center" style={{ padding: 20 }}>Scrooge`s cryptoanalyzer</h1>
    <br />
    <DatePicker />
    <EntryList />
  </Container>
);

export default App;
