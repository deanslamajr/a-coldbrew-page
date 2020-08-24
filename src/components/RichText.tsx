import { FC, useMemo } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor, Node } from 'slate';
import styled from 'styled-components';
// import { withHistory } from 'slate-history';

import { formFieldStyles, viewerStyles } from './layouts';

interface EditorProps {
  editorState: Node[];
  handleStateChange: (event: any) => void;
}

const StyledContainer = styled.div`
  ${formFieldStyles()}
`;

export const Editor: FC<EditorProps> = ({ editorState, handleStateChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <StyledContainer>
      <Slate
        editor={editor}
        value={editorState || []}
        onChange={newEditorState => {
          console.log('newEditorState', newEditorState);
          handleStateChange(newEditorState);
        }}>
        <Editable />
      </Slate>
    </StyledContainer>
  );
};

interface ViewerProps {
  serializedEditorState: string;
}

const StyledViewerContainer = styled.div`
  ${viewerStyles()}
`;

export const Viewer: FC<ViewerProps> = ({ serializedEditorState }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

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
