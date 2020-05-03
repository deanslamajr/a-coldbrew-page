import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { DateSingleInput } from '@datepicker-react/styled';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

import { NavButton, NavButtonPositions } from './NavButton';

import { theme } from '../theme';

interface ChoreFormInterface {
  summary: string;
  dueDate: Date;
  description: string;
}

interface ChoreFormPropsInterface {
  handleHideCreateChoreModal: () => void;
}

const initialValues: ChoreFormInterface = {
  summary: '',
  dueDate: new Date(),
  description: '',
};

export const ChoreForm: React.FC<ChoreFormPropsInterface> = ({
  handleHideCreateChoreModal,
}) => {
  const [showDueDatePicker, toggleShowDueDatePicker] = useState(false);

  const onSubmit = (data: ChoreFormInterface): void => {
    console.log('onSubmit, data:', data);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ form }) => (
        <form>
          <div>
            <label>Summary</label>
            <Field
              name="summary"
              component="input"
              type="text"
              placeholder="summary"
            />
            <label>Due Date</label>
            <Field name="dueDate">
              {props => {
                return (
                  <DateSingleInput
                    onDateChange={data => {
                      if (data.date) {
                        props.input.onChange(data.date);
                      }
                    }}
                    onFocusChange={focusedInput =>
                      toggleShowDueDatePicker(focusedInput)
                    }
                    onClose={() => toggleShowDueDatePicker(false)}
                    date={props.input.value}
                    showDatepicker={showDueDatePicker}
                    showCalendarIcon={false}
                  />
                );
              }}
            </Field>
            <label>Description</label>
            <Field
              name="description"
              component="textarea"
              type="text"
              placeholder="description"
            />
            {/* Also need a dropdown input that can select a recurring  */}
            {/* None, daily, weekly, monthly, yearly */}
            {/* every setting but 'None' should create an additional input defaulted to 1 */}
            {/* but can set higher numbers e.g. every 1 day OR 2 days OR 3 days etc.*/}

            <NavButton
              position={NavButtonPositions.BottomLeft}
              clickHandler={() => handleHideCreateChoreModal()}
              icon={
                <RiCloseLine
                  color={theme.colors.red}
                  size={theme.sizes.navbarButtonIconSize}
                />
              }
            />
            <NavButton
              position={NavButtonPositions.BottomRight}
              clickHandler={() => form.submit()}
              icon={
                <RiCheckLine
                  color={theme.colors.green}
                  size={theme.sizes.navbarButtonIconSize}
                />
              }
            />
          </div>
        </form>
      )}
    />
  );
};
