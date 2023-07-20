import 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/home-screen';

import { it, expect } from '@jest/globals';

// Test for create a Todo item
it('Should create an item', () => {
  const { getByText, getByPlaceholderText } = render(<HomeScreen />);
  const textInput = getByPlaceholderText('Enter here');
  const addButton = getByText('ADD');
  const createdItemText = 'First Item';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addButton);

  const createdItem = getByText(createdItemText);
  expect(createdItem).not.toBeNull();
})

// Test for select a Todo item to edit
it('Should select an item to edit', () => {
  const { getByText, getByPlaceholderText } = render(<HomeScreen />);
  const textInput = getByPlaceholderText('Enter here');
  const addButton = getByText('ADD');
  const createdItemText = 'Second Item';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addButton);

  const createdItem = getByText(createdItemText);
  fireEvent.press(createdItem);
  const updateButton = getByText('UPDATE');
  expect(updateButton).not.toBeNull();
  expect(textInput.props.value).toBe(createdItemText);
})

// Test for update a selected Todo item
it('Should update an item', () => {
  const { getByText, getByPlaceholderText } = render(<HomeScreen />);
  const textInput = getByPlaceholderText('Enter here');
  const addButton = getByText('ADD');
  const createdItemText = 'Third Item';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addButton);

  const createdItem = getByText(createdItemText);
  fireEvent.press(createdItem);
  const updateButton = getByText('UPDATE');
  const updatedItemText = 'Third Item Updated'
  fireEvent.changeText(textInput, updatedItemText);
  fireEvent.press(updateButton);
  const updatedItem = getByText(updatedItemText);
  expect(updatedItem).not.toBeNull();
})

// Test for delete a Todo item
it('Should delete an item', () => {
  const { getByText, getByPlaceholderText } = render(<HomeScreen />);
  const textInput = getByPlaceholderText('Enter here');
  const addButton = getByText('ADD');
  const createdItemText = 'Fourth Item';

  fireEvent.changeText(textInput, createdItemText);
  fireEvent.press(addButton);

  const createdItem = getByText(createdItemText);
  const removeButton = getByText('REMOVE');

  fireEvent.press(removeButton);
  expect(createdItem).toBeNull();
})