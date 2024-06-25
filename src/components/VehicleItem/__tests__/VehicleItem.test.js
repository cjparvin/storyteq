/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VehicleItem from '..';

const testSummaryData = {
  id: 'ipace',
  description: "Introducing Jaguar's first all-electric performance SUV.",
  price: '£65,100',
  apiUrl: '/api/vehicle_ipace.json',
  media: [
    {
      name: 'vehicle',
      url: '/images/16x9/ipace_k21.jpg'
    },
    {
      name: 'vehicle',
      url: '/images/1x1/ipace_k21.jpg'
    }
  ]
};

describe('<VehicleItem /> Tests', () => {
  it('Should show title', () => {
    const { queryByTestId } = render(<VehicleItem {...testSummaryData} />);

    const titleElement = queryByTestId('title');
    expect(titleElement).toHaveTextContent(testSummaryData.id.toUpperCase());
  });

  it('Should show price', () => {
    const { queryByTestId } = render(<VehicleItem {...testSummaryData} />);

    const priceElement = queryByTestId('price');
    expect(priceElement).toHaveTextContent(testSummaryData.price);
  });

  it('Should show description', () => {
    const { queryByTestId } = render(<VehicleItem {...testSummaryData} />);

    const descriptionElement = queryByTestId('description');
    expect(descriptionElement).toHaveTextContent(testSummaryData.description);
  });

  it('Should show image', () => {
    const { queryByTestId } = render(<VehicleItem {...testSummaryData} />);

    const imageElement = queryByTestId('image');
    expect(imageElement).not.toBeNull();
    expect(imageElement).toHaveAccessibleName(testSummaryData.id);
  });
});
