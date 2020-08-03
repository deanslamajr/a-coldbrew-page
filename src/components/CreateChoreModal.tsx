import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { DateSingleInput } from '@datepicker-react/styled';
import { RiCheckLine } from 'react-icons/ri';
import styled from 'styled-components';

import { BackButton, NavButton, NavButtonPositions } from './NavButton';
import { Modal } from './Modal';
import { FormFieldContainer } from './Forms';

import { useCreateChoreMutation } from '../graphql-client/mutations/createChore.graphql';

import { cssTheme } from '../helpers/constants';

export interface ChoreFormValuesInterface {
  summary: string;
  dueDate: Date;
  description: string;
}

interface ChoreFormPropsInterface {
  handleHideCreateChoreModal: () => void;
  hasSession: boolean;
  onAfterSubmit: () => Promise<void>;
}

interface CreateChoreModalProps {
  handleHideCreateChoreModal: () => void;
  hasSession: boolean;
  onAfterSubmit: () => Promise<void>;
}

const initialValues: ChoreFormValuesInterface = {
  summary: 'some new chore',
  dueDate: new Date(Date.now()),
  description: '',
};

const getBoxShadow = (color: string): string =>
  `1px 0 0 0 ${color},
  0 1px 0 0 ${color},
  1px 1px 0 0 ${color},
  1px 0 0 0 ${color} inset,
  0 1px 0 0 ${color} inset`;

const DatePickerStylesOverride = styled.div`
  width: 100%;

  /* override @datepicker-react/styled input styles */
  & label {
    border: inherit;
  }
  /* override @datepicker-react/styled input styles */
  & input {
    font-weight: inherit;
    width: 100%;
  }

  /* Center horizontally and vertically */
  /* @see https://stackoverflow.com/questions/3157372/css-horizontal-centering-of-a-fixed-div#answer-32694476 */
  & > div > div {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1.15);
  }

  & > div > div > div {
    background-color: ${({ theme }) => theme.colors.white};
  }

  /* day buttons */
  & button[data-testid='Day'],
  & button[data-testid='DatepickerNavButton'] {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    box-shadow: ${({ theme }) => getBoxShadow(theme.colors.clearBlack)};
  }
  & button:hover {
    background-color: ${({ theme }) => theme.colors.clearBlack};
  }
`;

export const ChoreForm: React.FC<ChoreFormPropsInterface> = ({
  handleHideCreateChoreModal,
  hasSession,
  onAfterSubmit,
}) => {
  const [createChore, { data, error, loading }] = useCreateChoreMutation();

  const [showDueDatePicker, toggleShowDueDatePicker] = useState(false);

  const handleSubmit = async (values: ChoreFormValuesInterface) => {
    if (hasSession) {
      await createChore({
        variables: {
          input: {
            chore: {
              summary: values.summary,
              description: values.description,
              dueDate: values.dueDate,
            },
          },
        },
      });
    }
    onAfterSubmit();
  };

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
                    <DatePickerStylesOverride>
                      <DateSingleInput
                        onDateChange={data => {
                          if (data.date) {
                            props.input.onChange(data.date);
                          }
                          toggleShowDueDatePicker(false);
                        }}
                        onFocusChange={focusedInput =>
                          toggleShowDueDatePicker(focusedInput)
                        }
                        onClose={() => toggleShowDueDatePicker(false)}
                        date={props.input.value}
                        showDatepicker={showDueDatePicker}
                        showCalendarIcon={false}
                        showResetDate={false}
                      />
                    </DatePickerStylesOverride>
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
              <Field name="description" component="textarea" type="text" />
            </FormFieldContainer>
            {/* Also need a dropdown input that can select a recurring  */}
            {/* None, daily, weekly, monthly, yearly */}
            {/* every setting but 'None' should create an additional input defaulted to 1 */}
            {/* but can set higher numbers e.g. every 1 day OR 2 days OR 3 days etc.*/}

            {!showDueDatePicker && (
              <BackButton
                position={NavButtonPositions.BottomLeft}
                onClick={() => handleHideCreateChoreModal()}
              />
            )}
            {!showDueDatePicker && (
              <NavButton
                position={NavButtonPositions.BottomRight}
                clickHandler={() => form.submit()}
                icon={
                  <RiCheckLine
                    color={cssTheme.colors.green}
                    size={cssTheme.sizes.navbarButtonIconSize}
                  />
                }
              />
            )}
          </div>
        </form>
      )}
    />
  );
};

export const CreateChoreModal: React.FC<CreateChoreModalProps> = ({
  handleHideCreateChoreModal,
  hasSession,
  onAfterSubmit,
}) => {
  return (
    <Modal>
      <ChoreForm
        handleHideCreateChoreModal={handleHideCreateChoreModal}
        hasSession={hasSession}
        onAfterSubmit={onAfterSubmit}
      />
    </Modal>
  );
};
