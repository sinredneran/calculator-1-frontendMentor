const Button = ({ name, handleInput }) => {
    let className = handleInput.name;
    
    return (
        <button className={`${className}`} onClick={handleInput} value={name}>{name}</button>
    );
}
Button.defaultProps = {
    name: 'no name assigned',
    handleInput: () => {
        console.log('no function assigned');
    }
}
export default Button;