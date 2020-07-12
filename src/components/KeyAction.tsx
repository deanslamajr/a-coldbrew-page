import useKey from '@rooks/use-key';

interface Props {
  keys: string[];
  onKeyPress: () => void;
}

export const KeyAction: React.FC<Props> = ({ keys, onKeyPress }) => {
  useKey(keys, onKeyPress);
  return null;
};
