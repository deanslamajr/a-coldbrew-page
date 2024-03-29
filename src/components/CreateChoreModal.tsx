import { useMemo, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { DateSingleInput } from '@datepicker-react/styled';
import { RiCheckLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Node } from 'slate';
import useKey from '@rooks/use-key';

import { BackButton, NavButton, NavButtonPositions } from './NavButton';
import { Modal } from './Modal';
import {
  BorderlessTextInput,
  FormFieldContainer,
  InvalidFieldMessage,
  SummaryContainer,
} from './Forms';
import { Editor } from './RichText';
import { formFieldStyles, formFieldBorder } from './layouts';
import { Spinner } from './Spinner';

import { useAddChore } from '../hooks/useAddChore';
import { useUpdateChore } from '../hooks/useUpdateChore';

import { cssTheme } from '../helpers/constants';
import { transformDueDateToDate } from '../helpers/dueDates';

import { ChoreInterface } from '../types';

import { ChoreInput } from '../graphql-client/mutations/createChore.graphql';
import { ChoreUpdate } from '../graphql-client/mutations/updateChore.graphql';

export interface ChoreFormValuesInterface {
  summary: string;
  dueDate: Date;
  description: Node[];
}

interface CreateChoreModalProps {
  chore: ChoreInterface | null;
  handleHideCreateChoreModal: () => void;
}

const initialDescription: Node[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const initialValuesForNewChore: ChoreFormValuesInterface = {
  summary: 'new chore',
  dueDate: new Date(Date.now()),
  description: initialDescription,
};

const getBoxShadow = (color: string): string =>
  `1px 0 0 0 ${color},
  0 1px 0 0 ${color},
  1px 1px 0 0 ${color},
  1px 0 0 0 ${color} inset,
  0 1px 0 0 ${color} inset`;

const DueDateContainer = styled.div`
  ${formFieldStyles()}
  ${formFieldBorder()}
  padding: 0 0.5rem 0 !important;
`;

const DatePickerStylesOverride = styled.div`
  width: 100%;

  /* override @datepicker-react/styled input styles */
  & label {
    border: inherit;
  }
  /* override @datepicker-react/styled input styles */
  & input {
    border: none;
    font-weight: inherit;
    width: 100%;
  }

  /* Date Picker Modal */
  /* Center horizontally and vertically */
  /* @see https://stackoverflow.com/questions/3157372/css-horizontal-centering-of-a-fixed-div#answer-32694476 */
  & > div > div {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(1.15);
    z-index: ${({ theme }) => theme.zIndex.highest};
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

const deserializeDescription: (chore: ChoreInterface) => Node[] = chore => {
  if (chore.version < 3) {
    return [
      {
        type: 'paragraph',
        children: [{ text: chore.description }],
      },
    ];
  }

  return JSON.parse(chore.description) as Node[];
};

const required = (value: string | Date) => (value ? undefined : 'Required');

export const CreateChoreModal: React.FC<CreateChoreModalProps> = ({
  chore,
  handleHideCreateChoreModal,
}) => {
  const [showDueDatePicker, toggleShowDueDatePicker] = useState(false);
  useKey(['Escape'], () => toggleShowDueDatePicker(false));

  const [addChore, isAddChoreLoading] = useAddChore();
  const [updateChore, isUpdateChoreLoading] = useUpdateChore();

  const handleSubmit = async (values: ChoreFormValuesInterface) => {
    if (!chore) {
      const createChoreInput: ChoreInput = {
        summary: values.summary,
        description: JSON.stringify(values.description),
        dueDate: values.dueDate,
      };

      await addChore(createChoreInput);
    } else {
      const updateChoreInput: ChoreUpdate = {
        id: chore.id,
        summary: values.summary,
        description: JSON.stringify(values.description),
        dueDate: values.dueDate,
      };

      await updateChore(updateChoreInput);
    }

    handleHideCreateChoreModal();
  };

  const initialValues = useMemo(() => {
    if (!chore) {
      return initialValuesForNewChore;
    }

    return {
      summary: chore.summary,
      description: deserializeDescription(chore),
      dueDate: transformDueDateToDate(chore.dueDate),
    };
  }, [chore]);

  return (
    <Modal>
      {isAddChoreLoading || isUpdateChoreLoading ? (
        <Spinner />
      ) : (
        <Form
          onSubmit={values => handleSubmit(values)}
          initialValues={initialValues}
          render={({ form, valid }) => (
            <form>
              <div>
                <Field<string> name="summary" validate={required}>
                  {({ input, meta }) => {
                    return (
                      <FormFieldContainer>
                        <label>Summary</label>
                        <SummaryContainer>
                          <BorderlessTextInput
                            {...input}
                            type="text"
                            onChange={input.onChange}
                            value={input.value}
                          />
                        </SummaryContainer>
                        <InvalidFieldMessage>
                          {meta.error && meta.touched ? meta.error : ''}
                        </InvalidFieldMessage>
                      </FormFieldContainer>
                    );
                  }}
                </Field>

                <Field<Date> name="dueDate" validate={required}>
                  {({ input, meta }) => {
                    return (
                      <FormFieldContainer>
                        <label>Due Date</label>
                        <DueDateContainer>
                          <DatePickerStylesOverride>
                            <DateSingleInput
                              onDateChange={data => {
                                if (data.date) {
                                  input.onChange(data.date);
                                }
                                toggleShowDueDatePicker(false);
                              }}
                              onFocusChange={focusedInput =>
                                toggleShowDueDatePicker(focusedInput)
                              }
                              onClose={() => toggleShowDueDatePicker(false)}
                              date={input.value}
                              showDatepicker={showDueDatePicker}
                              showCalendarIcon={false}
                              showResetDate={false}
                            />
                          </DatePickerStylesOverride>
                        </DueDateContainer>
                        <InvalidFieldMessage>
                          {meta.error && meta.touched ? meta.error : ''}
                        </InvalidFieldMessage>
                      </FormFieldContainer>
                    );
                  }}
                </Field>

                <FormFieldContainer>
                  <label>Description</label>
                  <Field<Node[]> name="description">
                    {props => {
                      return (
                        <Editor
                          editorState={props.input.value}
                          handleStateChange={props.input.onChange}
                        />
                      );
                    }}
                  </Field>
                </FormFieldContainer>

                {!showDueDatePicker && (
                  <BackButton
                    position={NavButtonPositions.BottomLeft}
                    onClick={() => handleHideCreateChoreModal()}
                  />
                )}
                {!showDueDatePicker && valid && (
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
      )}
    </Modal>
  );
};
