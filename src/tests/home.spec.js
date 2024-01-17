import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Home from '../pages/Home';
import api from '../services/api';
import { addReserveRequest } from '../store/modules/reserve/actions';

// Mocking useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mocking api.get
jest.mock('../services/api');

describe('Home Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useDispatch.mockClear();
  });

  test('renders Home component with trips', async () => {
    // Mocking api.get to return sample data
    api.get.mockResolvedValue({ data: [{ id: 1, title: 'Trip 1', status: true, image: 'trip1.jpg' }] });

    // Render the component
    const { getByText } = render(<Home />);

    // Wait for useEffect to complete
    await act(async () => {});

    // Check if the trip is rendered
    expect(getByText('Trip 1')).toBeInTheDocument();
  });

  test('dispatches addReserveRequest when button is clicked', async () => {
    // Mocking api.get to return sample data
    api.get.mockResolvedValue({ data: [{ id: 1, title: 'Trip 1', status: true, image: 'trip1.jpg' }] });

    // Mocking useDispatch
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Render the component
    const { getByText } = render(<Home />);

    // Wait for useEffect to complete
    await act(async () => {});

    // Click the reserve button
    fireEvent.click(getByText('SOLICITAR RESERVA'));

    // Check if dispatch is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(addReserveRequest(1));
  });
});
