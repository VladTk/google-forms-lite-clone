import { InlineMessage } from '../../../../components';

export const ErrorOrEmptyState: React.FC<{
  isError: boolean;
  hasData: boolean;
  isLoading: boolean;
  onRetry: () => void;
}> = ({ isError, hasData, isLoading, onRetry }) => {
  if (isError)
    return (
      <InlineMessage
        title="Failed to load data"
        description="An error occurred while loading the form or responses. Please try again."
        actionLabel="Retry"
        onAction={onRetry}
      />
    );

  if (!isLoading && !hasData)
    return (
      <InlineMessage
        title="No responses yet"
        description="Once users submit responses, you'll see them here."
      />
    );

  return null;
};
