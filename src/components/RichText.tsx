/* eslint-disable @typescript-eslint/no-empty-function */
// @refresh reset
// prevents state related errors on fast refresh
// @see https://reactnative.dev/docs/fast-refresh#tips
import { FC, useMemo } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor, Node } from 'slate';
import styled from 'styled-components';
import { withHistory } from 'slate-history';

import { formFieldStyles, formFieldBorder, viewerStyles } from './layouts';

interface EditorProps {
  editorState: Node[];
  handleStateChange: (event: any) => void;
}

interface ViewerProps {
  serializedEditorState: string;
}

const StyledContainer = styled.div`
  ${formFieldBorder()}
  ${formFieldStyles()}
  padding: 0.5rem !important;
`;

export const Editor: FC<EditorProps> = ({ editorState, handleStateChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <StyledContainer>
      <Slate
        editor={editor}
        value={editorState || []}
        onChange={newEditorState => {
          handleStateChange(newEditorState);
        }}>
        <Editable />
      </Slate>
    </StyledContainer>
  );
};

const StyledViewerContainer = styled.div`
  ${viewerStyles()}
`;

export const Viewer: FC<ViewerProps> = ({ serializedEditorState }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const value = useMemo(() => {
    return JSON.parse(serializedEditorState);
  }, [serializedEditorState]);

  return (
    <StyledViewerContainer>
      <Slate editor={editor} value={value} onChange={() => {}}>
        <Editable readOnly />
      </Slate>
    </StyledViewerContainer>
  );
};
