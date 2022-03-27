import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }
`;

export const light = {
    background: '#fafafa',
    text: '#00000',
}

export const dark = {
    background: '#23272A',
    text: '#f3f3f3',
}
