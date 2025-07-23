import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getValidIndexFromParam, indexToParam } from '../utils/pagination';

export const usePaginatedResponses = (responsesLength: number) => {
  const { id, responseIndex } = useParams<{
    id: string;
    responseIndex?: string;
  }>();
  const navigate = useNavigate();

  const currentIndex = useMemo(
    () => getValidIndexFromParam(responseIndex, responsesLength),
    [responseIndex, responsesLength],
  );

  useEffect(() => {
    const idx = Number(responseIndex);
    const isInvalid = isNaN(idx) || idx < 1 || idx > responsesLength;
    if (isInvalid) {
      navigate(`/forms/${id}/responses/1`, { replace: true });
    }
  }, [responseIndex, responsesLength, navigate, id]);

  const goToIndex = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(newIndex, responsesLength - 1));
    navigate(`/forms/${id}/responses/${indexToParam(clamped)}`);
  };

  return {
    currentIndex,
    goToIndex,
    onPrev: () => goToIndex(currentIndex - 1),
    onNext: () => goToIndex(currentIndex + 1),
  };
};
