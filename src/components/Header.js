const Header = ({ setTheme }) => {

    const handleTheme = (e) => {
        const value = e.target.value;
        const body = document.querySelector('body');
        if (value === '1') {
            body.style.backgroundColor = 'hsl(222, 26%, 31%)';
        }
        else if (value === '2') {
            body.style.backgroundColor = 'hsl(0, 0%, 90%)';
        }
        else if (value === '3') {
            body.style.backgroundColor = 'hsl(268, 75%, 9%)';
        }
        setTheme(value);
    }

    return (
        <header>
            <div className="logo">
                <p>calc</p>
            </div>
            <div className="theme-switch-container">
                <p>THEME</p>
                <div className="theme-btn-container">
                    <div className="ball-container">
                        <div className="ball"></div>
                    </div>
                    <div className="theme-number-container">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                    <button onClick={handleTheme} value='1'>1</button>
                    <button onClick={handleTheme} value='2'>2</button>
                    <button onClick={handleTheme} value='3'>3</button>
                </div>
            </div>
        </header>
    );
}

export default Header;