import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals';


const Button = styled.button`
  color: red;
`


test('it works', () => {
    const SendButton = () => <Button>Send</Button>;
    const tree = renderer.create(React.createElement(SendButton)).toJSON();
    
    expect(tree).toMatchInlineSnapshot(snapshot);
});
export const snapshot = `
.c0 {
  color: red;
}


<button
  className="c0"
/>
`

// Removed custom expect function to use Jest's built-in expect
