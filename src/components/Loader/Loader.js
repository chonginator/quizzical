import styled from 'styled-components';

import DotLoader from 'react-spinners/DotLoader';

import { COLOURS } from '../../constants';

const loaderCssOveride = {
    display: "block",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center"
}

const Loader = ({ ...delegated }) =>
    <LoaderWrapper>
        <DotLoader
            cssOverride={loaderCssOveride}
            size={40}
            color={COLOURS.button}
            {...delegated}
        />
    </LoaderWrapper>


const LoaderWrapper = styled.div`
    min-height: inherit;
    display: grid;
    place-content: center;
`

export default Loader;