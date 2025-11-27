import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router';
import { useStore } from '../../../store/StoreProvider.tsx';
import { SectionContent, SectionTitle } from '../Section.tsx';
import withLazy from '../../../WithLazy.tsx';

const LoadForm = withLazy(() => import('./LoadForm.tsx'));
const LoadWarning = withLazy(() => import('./LoadWarning.tsx'));

const Load = observer(() => {
  const { saveStore } = useStore();
  const { states } = saveStore;

  if (!states.areAvailableToLoad && !states.corrupted) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <SectionTitle title="Saved quizzes" />
      <SectionContent>
        {states.areAvailableToLoad && <LoadForm />}
        {states.corrupted && states.corrupted.length > 0 && <LoadWarning />}
      </SectionContent>
    </>
  );
});

export default Load;
