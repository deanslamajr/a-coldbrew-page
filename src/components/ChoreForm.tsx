import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { DateSingleInput } from '@datepicker-react/styled';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import styled from 'styled-components';

import { NavButton, NavButtonPositions } from './NavButton';

import { theme } from '../theme';

export interface ChoreFormValuesInterface {
  summary: string;
  dueDate: Date;
  description: string;
}

interface ChoreFormPropsInterface {
  handleHideCreateChoreModal: () => void;
  handleSubmit: (values: ChoreFormValuesInterface) => void;
}

const initialValues: ChoreFormValuesInterface = {
  summary: 'some new chore',
  dueDate: new Date(),
  description: '',
};

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  align-items: center;
`;

export const ChoreForm: React.FC<ChoreFormPropsInterface> = ({
  handleHideCreateChoreModal,
  handleSubmit,
}) => {
  const [showDueDatePicker, toggleShowDueDatePicker] = useState(false);

  return (
    <Form
      onSubmit={values => handleSubmit(values)}
      initialValues={initialValues}
      render={({ form }) => (
        <form>
          <div>
            <FormFieldContainer>
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
            </FormFieldContainer>
            <FormFieldContainer>
              <label>Summary</label>
              <Field
                name="summary"
                component="input"
                type="text"
                placeholder="summary"
              />
            </FormFieldContainer>
            <FormFieldContainer>
              <label>Description</label>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder="description"
              />
            </FormFieldContainer>
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
