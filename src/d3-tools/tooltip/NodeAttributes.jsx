import React, { Component } from 'react';
import { Form, Row } from 'react-bootstrap';

export default class NodeAttributes extends Component {
  constructor(props) {
    super(props);

    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }

  handleAttributeChange(e) {
    const key = e.target.parentElement.getAttribute('attribute');
    const value = e.target.value;
    this.props.updateValues(key, value);
  }

  cleanAttributes() {
    return Object.keys(this.props.attributes).reduce((prev, k) => {
      if (!(k === 'vy' || k === 'vx' || k === 'index' || k === 'y' || k === 'x')) {
        prev.push(k);
      }
      return prev;
    }, []);
  }

  render() {
    const attributes = this.cleanAttributes();
    return (
      <Form>
        {attributes.map(k => ( // Having the key include the props.attribute.id means that changing ID value is not fluid
          <Form.Group key={`${k}_${this.props.attributes.id}`} as={Row} controlId='formPlaintextPassword' attribute={k}>
            <Form.Label>
              {k}
            </Form.Label>
            <Form.Control size='sm' onChange={this.handleAttributeChange} readOnly={!this.props.editMode} defaultValue={this.props.attributes[k]} />
          </Form.Group>
        ))}
      </Form>
    );
  }
}
