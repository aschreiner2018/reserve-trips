import React from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import Reservas from '../pages/Reservas';

// Mocking useSelector and useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Reservas Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  test('renders Reservas component with reserves', () => {
    // Mocking useSelector to return sample Reserva data
    useSelector.mockReturnValue([{ id: 1, title: 'Reserva 1', amount: 2, image: 'reserva1.jpg' }]);

    // Render the component
    const { getByText, getByAltText } = render(<Reservas />);

    // Check if the reserve is rendered
    expect(getByText('Você solicitou 1 reservas')).toBeInTheDocument();
    expect(getByText('Reserva 1')).toBeInTheDocument();
    expect(getByAltText('Reserva 1')).toBeInTheDocument();
  });
});
