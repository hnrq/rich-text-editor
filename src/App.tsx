import {FC} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import theme from 'theme';
import Editor from 'containers/Editor';

const AppContainer = styled.div`
  height: 100vh;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <AppContainer>
      <Editor />
    </AppContainer>
  </ThemeProvider>
);

export default App;
