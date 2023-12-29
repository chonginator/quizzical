import styled from 'styled-components';

import yellowBlob from '../../yellow-blob.svg';
import blueBlob from '../../blue-blob.svg';

function AppWrapper({ children }) {
  return (
    <Wrapper>
      <MaxWidthWrapper>
        {children}
      </MaxWidthWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-image:
    url(${yellowBlob}),
    url(${blueBlob});
  background-repeat: no-repeat;
  background-position:
    top right,
    bottom left;
`

const MaxWidthWrapper = styled.div`
  max-width: 840px;
  margin: 0 auto;
  padding: 1em;
`

export default AppWrapper;