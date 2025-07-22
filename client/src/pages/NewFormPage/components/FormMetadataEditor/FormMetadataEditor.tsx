import { ContentBlock } from '../../../../components';
import { Input, Textarea } from '../../../../components/ui';

import styles from './FormMetadataEditor.module.scss';

type Props = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

export const FormMetadataEditor: React.FC<Props> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => {
  return (
    <ContentBlock className={styles.formmeta}>
      <div className={styles.formmeta__decor}></div>
      <Input
        type="text"
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        placeholder="Form Title"
        className={styles.formmeta__input}
        autoFocus
      />

      <Textarea
        value={description}
        onChange={e => onDescriptionChange(e.target.value)}
        placeholder="Form Description"
        rows={1}
      />
    </ContentBlock>
  );
};
