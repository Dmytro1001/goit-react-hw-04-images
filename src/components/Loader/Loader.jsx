import { Vortex } from 'react-loader-spinner';
import { WrapperLoader } from './Loader.styles';

export const Loader = () => {
  return (
    <WrapperLoader>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </WrapperLoader>
  );
};
