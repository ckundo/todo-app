import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test("renders heading", () => {
  render(<App items={[]} />);
  const headingEl = screen.getByText(/To Do/i);
  expect(headingEl).toBeInTheDocument();
});

describe("list view", () => {
  test("renders a list of items", () => {
    render(<App items={['hello', 'world']} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2)
  });

  test("add an item to the list", () => {
    render(<App items={[]} />);
    const addButton = screen.getByText('Add item');
    const itemText = screen.getByLabelText('New item');

    fireEvent.change(itemText, { value: 'Create an example todo!' })
    fireEvent.click(addButton);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1)
  });

  test("edits an item in the list", () => {});
  test("deletes an item in the list", () => {});
});

describe("detail view", () => {
  test("shows an item detail", () => {});
});
