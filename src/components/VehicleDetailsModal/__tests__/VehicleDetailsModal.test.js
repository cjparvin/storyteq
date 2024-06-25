/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import VehicleDetailsModal from '..';

const testDetailsData = {
  id: 'ipace',
  meta: {
    passengers: 2,
    drivetrain: [
      'AWD',
      'RWD'
    ],
    bodystyles: [
      'COUPÉ',
      'CONVERTIBLE'
    ],
    emissions: {
      template: 'CO2 Emissions $value g/km',
      value: 234
    }
  }
};

function getDialogElement(queryByTestId) {
  const showBtnElement = queryByTestId('show-details');
  userEvent.click(showBtnElement);

  const dialogElement = queryByTestId('details-modal');

  return dialogElement;
}

describe('<VehicleDetailsModal /> Tests', () => {
  it('Should show dialog when button clicked', () => {
    const { queryByTestId } = render(<VehicleDetailsModal {...testDetailsData} />);

    const dialogElement = getDialogElement(queryByTestId);

    expect(dialogElement).not.toBeNull();
    expect(dialogElement).toHaveAccessibleName(`${testDetailsData.id.toUpperCase()} Details`);
  });

  it('Displays passenger count correctly', () => {
    const { queryByTestId } = render(<VehicleDetailsModal {...testDetailsData} />);

    const dialogElement = getDialogElement(queryByTestId);

    const passengerElement = within(dialogElement).queryByTestId('passengers');
    expect(passengerElement).toHaveTextContent(testDetailsData.meta.passengers);
  });

  it('Displays drive type correctly', () => {
    const { queryByTestId } = render(<VehicleDetailsModal {...testDetailsData} />);

    const dialogElement = getDialogElement(queryByTestId);
    const driveElement = within(dialogElement).queryByTestId('drive-types');
    expect(driveElement).toHaveTextContent(testDetailsData.meta.drivetrain.join(', '));
  });

  it('Displays body types correctly', () => {
    const { queryByTestId } = render(<VehicleDetailsModal {...testDetailsData} />);

    const dialogElement = getDialogElement(queryByTestId);
    const bodyStyleElement = within(dialogElement).queryByTestId('body-styles');
    expect(bodyStyleElement).toHaveTextContent(testDetailsData.meta.bodystyles.join(', '));
  });

  it('Displays emissions text correctly', () => {
    const { queryByTestId } = render(<VehicleDetailsModal {...testDetailsData} />);

    const dialogElement = getDialogElement(queryByTestId);
    const emissionsElement = within(dialogElement).queryByTestId('emissions');

    const expectedText = testDetailsData.meta.emissions.template.replace('$value', testDetailsData.meta.emissions.value);
    expect(emissionsElement).toHaveTextContent(expectedText);
  });
});
