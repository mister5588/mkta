import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/buy');
  }, []);

  return (
    <div>
      <p>Redirecting to the buy page...</p>
    </div>
  );
};

export default IndexPage;