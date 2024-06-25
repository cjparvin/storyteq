import React, { useState } from 'react';
import {
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useId,
  useFloating,
  FloatingOverlay,
  FloatingFocusManager
} from '@floating-ui/react';

import style from './style.module.scss';

function renderDetailRow(field, value, testId) {
  const displayText = Array.isArray(value) ? value.join(', ') : value;

  return (
    <tr>
      <td>{`${field}: `}</td>
      <td data-testid={testId}>{displayText && displayText !== '' ? displayText : '-'}</td>
    </tr>
  );
}

const VehicleDetailsModal = ({
  id,
  meta
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Floating UI dialog library hook/setup
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePress: false }); // Force close via button or escape key
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const labelId = useId();

  const {
    passengers, drivetrain, bodystyles, emissions
  } = meta;

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...getReferenceProps()}
        className={style.showBtn}
        data-testid="show-details"
      >
        Read More
      </button>
      {isOpen && (
      <FloatingOverlay
        lockScroll
        className={style.overlay}
      >
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getFloatingProps()}
            className={style.modal}
            aria-labelledby={labelId}
            data-testid="details-modal"
          >
            <div className={style.header}>
              <h2 id={labelId} data-testid="header">{`${id.toUpperCase()} Details`}</h2>
              <button
                type="button"
                className={style.closeBtn}
                aria-label="Close dialog"
                onClick={() => setIsOpen(false)}
                data-testid="hide-details"
              >
                X
              </button>
            </div>
            <table>
              <tbody>
                {renderDetailRow('Passengers', passengers, 'passengers')}
                {renderDetailRow('Drive Train', drivetrain, 'drive-types')}
                {renderDetailRow('Body Styles', bodystyles, 'body-styles')}
              </tbody>
            </table>
            {
              emissions
                && (
                <p data-testid="emissions">
                  {emissions.template.replace('$value', emissions.value)}
                </p>
                )
            }
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
      )}
    </>
  );
};
VehicleDetailsModal.displayName = 'VehicleDetailsModal';

export default VehicleDetailsModal;
