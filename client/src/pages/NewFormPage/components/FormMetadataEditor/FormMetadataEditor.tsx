import { ContentBlock } from '../../../../components';
import { Input, Textarea } from '../../../../components/ui';

import styles from './FormMetadataEditor.module.scss';

type Props = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  titleError?: string;
  descriptionError?: string;
};

export const FormMetadataEditor: React.FC<Props> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  titleError,
  descriptionError,
}) => {
  return (
    <ContentBlock className={styles.meta}>
      <div className={styles.meta__decor}></div>
      <div className={styles.meta__block}>
        <Input
          type="text"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          placeholder="Form Title"
          className={styles.meta__input}
          autoFocus
        />
        {titleError && <p className={styles.meta__error}>{titleError}</p>}
      </div>
      <div className={styles.meta__block}>
        <Textarea
          value={description}
          onChange={e => onDescriptionChange(e.target.value)}
          placeholder="Form Description"
          rows={1}
        />
        {descriptionError && (
          <p className={styles.meta__error}>{descriptionError}</p>
        )}
      </div>
    </ContentBlock>
  );
};
