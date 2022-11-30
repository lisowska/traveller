import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  screen,
  fireEvent,
  waitFor,
  getByLabelText,
} from '@testing-library/react';
import { render } from './test-utils';
import { Home } from './Home';
import { useToast } from '@chakra-ui/react';
import { waitForNextTick } from './utils';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';

// jest.mock('useToast', () => ({ useToast: jest.fn() }));
// const showToastMock = jest.fn();
// const useToastMock = useToast as jest.Mock;

// useToastMock.mockImplementation(() => ({
//   toast: showToastMock,
// }));

const defaultQueryData = {
  cities: {
    cities: {
      country: 'United Kingdom',
      name: 'London',
      id: 1,
      visited: false,
      wishlist: false,
    },
  },
};

describe('<Home /> component', () => {
  const mutationMock = jest.fn(() => Promise.resolve());

  it('should fire mutation when user click "Add city to visit list" button', async () => {
    const wrapper = render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
    );

    const inputEl = screen.getByTestId('cityInput');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'text');

    const password = screen.getByLabelText(/cityInput/i);
    fireEvent.change(password, { target: { value: 'London' } });

    await waitFor(() => expect(password).toHaveValue('London'));

    userEvent.type(inputEl, 'London');

    const iconButton = screen.getByRole('button', {
      name: 'inputButton',
    });
    expect(iconButton).toBeInTheDocument();
    // const cityInput = wrapper.getByLabelText(/cityInput/).toBeInTheDocument;
    // userEvent.type(cityInput, 'London');
    // expect(cityInput).toHaveValue(/London/);
    //await waitFor(() => expect(cityInput).toHaveValue(/London/));

    // const { getByText } = render(<Home />);

    userEvent.click(iconButton);
    const searchItems = jest.fn();
    const spy = jest.fn();
    // fireEvent.click(getByText(/Add city to visit list/));

    await waitForNextTick();

    await waitFor(() => {
      expect(searchItems).toBeCalled();
    });
    expect(searchItems).toBeCalled();
    // expect(searchItems).toBeCalledTimes(2);

    // expect(showToastMock).toHaveBeenCalled({
    //   description: 'We have added London to your visit list.',
    //   status: 'success',
    // });
  });
});
