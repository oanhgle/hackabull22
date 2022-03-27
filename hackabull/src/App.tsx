import React, {useEffect, useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { light, dark, GlobalStyles } from './theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SendNote from './SendNote';
import lightimg from './assets/light.png';
import darkimg from './assets/dark.png';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [colorMode, setColorMode] = useState("light");
  const isDark = colorMode === "dark";
  const colorModeToggle = () => {
    const theme = isDark ? "light" : "dark";
    setColorMode(theme);
    localStorage.setItem("colorMode", theme);
  };

  useEffect(() => {
    const currentColorMode = localStorage.getItem("colorMode")
    const preferColorMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if(currentColorMode && ["dark", "light"].includes(currentColorMode)) 
    {
      setColorMode(currentColorMode);
    } 
    else if(preferColorMode) 
    {
      setColorMode("dark");
    }
  }, []);
  return(
    <ThemeProvider theme={isDark ? dark : light}>
      <>
        <GlobalStyles />
        <div style={{backgroundImage: 'url('+ (isDark ? darkimg : lightimg) +')', backgroundSize: "cover", height: "100vh" }}>
          <nav className="navbar navbar-expand-sm m-3">
            <div className="container">
              <Header />
              <ul className="navbar-nav ml-lg-auto">
                <div className="ml-lg-4">
                    <div className="color-mode d-lg-flex justify-content-center align-items-center">
                      <a onClick={colorModeToggle}>
                        {isDark ? 
                          <span aria-label="Light mode"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="45" height="45" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M12 3V2m0 20v-1m9-9h1M2 12h1m15.5-6.5L20 4M4 20l1.5-1.5M4 4l1.5 1.5m13 13L20 20"/><circle cx="12" cy="12" r="4"/></g></svg></span> :
                          <span aria-label="Dark mode">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="40" height="40" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93a9.93 9.93 0 0 0 7.07-2.929a10.007 10.007 0 0 0 2.583-4.491a1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343a7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483a10.027 10.027 0 0 0 2.89 7.848a9.972 9.972 0 0 0 7.848 2.891a8.036 8.036 0 0 1-1.484 2.059z"/></svg>
                          </span>}
                      </a>
                    </div>
                  </div>
                </ul>
              </div>
          </nav>
          <SendNote />
          <Footer/>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;