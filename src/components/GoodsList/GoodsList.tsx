import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Button, Row, Col, Form, ListGroup } from 'react-bootstrap';

type Props = {
  goods: string[];
};

type State = {
  isReversed: boolean;
  sortBy: string;
  allLengths: string[];
  minLength: string;
};

export class GoodsList extends React.PureComponent<Props, State> {
  state: State = {
    isReversed: false,
    sortBy: 'default',
    allLengths: ['1', '2', '3', '5', '6', '7', '8', '9', '10'],
    minLength: '1',
  };

  reverseList = () => {
    this.setState((state) => (
      { isReversed: !state.isReversed }
    ));
  };

  sortByAlphabet = () => {
    this.setState({ sortBy: 'alphabet' });
  };

  sortByLength = () => {
    this.setState({ sortBy: 'length' });
  };

  defaultSort = () => {
    if (this.state.isReversed) {
      this.reverseList();
    }

    this.setState({
      sortBy: 'default',
      minLength: '1',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ minLength: value });
  };

  render() {
    const { goods } = this.props;
    const {
      minLength,
      sortBy,
      isReversed,
      allLengths,
    } = this.state;
    const newGoods = [...goods].filter(item => item.length >= +minLength);

    newGoods.sort((g1, g2) => {
      switch (sortBy) {
        case 'alphabet':
          return g1.localeCompare(g2);
        case 'length':
          return g1.length - g2.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      newGoods.reverse();
    }

    return (
      <>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Goods</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-4">
          <Col md="auto">
            <ListGroup>
              {newGoods.map(item => (
                <ListGroup.Item key={item}>
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>

        <Row className="justify-content-md-center mb-4">
          <Col md="auto">
            <Button
              variant="primary"
              type="button"
              onClick={this.reverseList}
            >
              Reverse
            </Button>
          </Col>

          <Col md="auto">
            <Button
              variant="primary"
              type="button"
              onClick={this.sortByAlphabet}
            >
              Sort alphabetically
            </Button>
          </Col>

          <Col md="auto">
            <Button
              variant="primary"
              type="button"
              onClick={this.defaultSort}
            >
              Reset
            </Button>
          </Col>

          <Col md="auto">
            <Button
              variant="primary"
              type="button"
              onClick={this.sortByLength}
            >
              Sort by length
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <p>Min length of good</p>
          </Col>

          <Col md="auto">
            <Form.Select
              size="sm"
              name="select"
              id="select"
              value={this.state.minLength}
              onChange={this.handleChange}
            >
              {allLengths.map(item => (
                <option value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </>
    );
  }
}
