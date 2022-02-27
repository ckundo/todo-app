import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe("list view", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders heading", () => {
    render(<App items={[]} />);
    jest.runAllTimers();

    const headingEl = screen.getByText(/To Do/i);
    expect(headingEl).toBeInTheDocument();
  });

  test("renders a list of items", () => {
    render(<App items={["hello", "world"]} />);
    jest.runAllTimers();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  test("add an item to the list", async () => {
    render(<App items={[]} />);
    jest.runAllTimers();

    const addButton = screen.getByText("Add item");
    const itemText = screen.getByLabelText("New item");

    fireEvent.change(itemText, { value: "Create an example todo!" });
    fireEvent.click(addButton);
    jest.runAllTimers();

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(1);
    });
  });

  test("edits an item in the list", () => {});
  test("deletes an item in the list", () => {});
});

describe("detail view", () => {
  test("shows an item detail", () => {});
});
