import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import Output from "./components/Output";

// styles
import './styles/_container.scss';
import './styles/_keys.scss';

const App = () => {

  const [inputList, setInputList] = useState(['0']);
  const [output, setOutput] = useState('0');
  const [themeNumber, setThemeNumber] = useState(1);

  const handleNumInput = (e) => {
    let value = e.target.value;
    let newArr = inputList;

    if (isFinite(newArr[newArr.length - 1])) {
      //    console.log('if final array item is finite');
      if ((newArr.length === 1 && newArr[0] === '0') || (newArr.length === 1 && newArr[0] === '') || (newArr.length === 1 && !isFinite(newArr[0]))) {
        //    console.log('--> if length of array is 1 and first elem is 0 or blank');
        if (value === '.') {
          //    console.log('--> if value is a decimal');
          newArr[0] = '0.';
        }
        else {
          newArr[0] = value;
        }
      }
      else if (value === '.') {
        //  console.log('if value pressed is .');
        if (!newArr[newArr.length - 1].includes('.')) {
          //  console.log('if final array elem doesnt contain .');
          newArr[newArr.length - 1] = newArr[newArr.length - 1].concat(value);
        }
      }
      else {
        newArr[newArr.length - 1] = newArr[newArr.length - 1].concat(value);
      }
    }
    else {
      //  console.log('if final array item is not finite')
      if (value === '.') {
        newArr.push('0.');
      }
      else {
        newArr.push(value);
      }
    }

    setInputList(newArr);
    setOutput(inputList.join(''))
    // handleInput();
  }

  const handleArithInput = (e) => {

    let value = e.target.value;
    let newArr = inputList;

    if (isNaN(newArr[newArr.length - 1])) {
      //    console.log('if last arr item is NaN');
      newArr[newArr.length - 1] = value;
    }
    else {
      if (newArr[0] === '') {
        //    console.log('if first elem is blank');
        newArr.splice(0, 1, '0', value);
      }
      else {
        //  console.log('new value added');
        newArr.push(value);
      }
    }
    setInputList(newArr);
    setOutput(inputList.join(''));
  }

  const handleDelete = () => {
    let newArr = inputList;
    //  console.log('delete function');

    if (newArr[newArr.length - 1].length === 1) {
      //  console.log('if final elem of arr has a length of 1');
      if (newArr.length === 1) {
        //  console.log('if only one elem with single char left in newArr');
        newArr[0] = '0';
        newArr = ['0'];
      }
      else {
        newArr[newArr.length - 1] = newArr[newArr.length - 1].slice(0, -1);
        newArr = newArr.slice(0, newArr.length - 1);
      }
    }
    else {
      newArr[newArr.length - 1] = newArr[newArr.length - 1].slice(0, -1);
    }
    setInputList(newArr);
    setOutput(inputList.join(''));
  }

  const handleReset = () => {
    let newArr = inputList;
    // console.log('reset function');
    newArr = ['0'];
    setInputList(newArr);
    setOutput(newArr.join(''));
  }

  const handleResult = () => {
    // console.log('Equal sign pressed');
    let newArr = inputList;
    let result = [];
    let getOut = false;

    if (isNaN(newArr[newArr.length - 1])) {
      newArr.pop();
    }
    while (newArr.length > 1) {
      const foundDiviIndex = newArr.findIndex(elem => elem === '/');
      const foundMultiIndex = newArr.findIndex(elem => elem === 'x');
      const foundPlusIndex = newArr.findIndex(elem => elem === '+');
      const foundMinusIndex = newArr.findIndex(elem => elem === '-');
      if (foundDiviIndex !== -1) {
        if (Number(newArr[foundDiviIndex + 1]) === 0) {
          alert(`can't divide by zero`);
          console.log('n/0 result = newArr :', result);
          getOut = true;
          break;
        }
        result = outCome(newArr, foundDiviIndex, '/');
      }
      else if (foundMultiIndex !== -1) {
        result = outCome(newArr, foundMultiIndex, 'x');
      }
      else if (foundMinusIndex !== -1) {
        result = outCome(newArr, foundMinusIndex, '-');
      }
      else if (foundPlusIndex !== -1) {
        result = outCome(newArr, foundPlusIndex, '+');
      }
    }
    if (getOut) {
      return
    }
    result = newArr.toString();
    console.log('result', result);
    setInputList([result])
    console.log('inputList', inputList);
    setOutput(result.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  const outCome = (currArr, arithSymbolIndex, arithSymbol) => {
    let beforeNumber = Number(currArr[arithSymbolIndex - 1]);
    let afterNumber = Number(currArr[arithSymbolIndex + 1]);
    let outcome = 0;
    console.log(currArr);
    if (arithSymbol === '/') {
      outcome = beforeNumber / afterNumber;
    }
    else if (arithSymbol === 'x') {
      outcome = beforeNumber * afterNumber;
    }
    else if (arithSymbol === '-') {
      outcome = beforeNumber - afterNumber;
    }
    else if (arithSymbol === '+') {
      outcome = beforeNumber + afterNumber;
    }
    currArr.splice(arithSymbolIndex - 1, 3, outcome)
    return currArr;
  }

  document.onkeydown = function (e) {
    switch (e.key) {
      case 'Backspace': handleDelete();
        break;
      case 'Delete': handleDelete();
        break;
      case '7': handleNumInput({ target: { value: '7' } });
        break;
      case '8': handleNumInput({ target: { value: '8' } });
        break;
      case '9': handleNumInput({ target: { value: '9' } });
        break;
      case '4': handleNumInput({ target: { value: '4' } });
        break;
      case '5': handleNumInput({ target: { value: '5' } });
        break;
      case '6': handleNumInput({ target: { value: '6' } });
        break;
      case '1': handleNumInput({ target: { value: '1' } });
        break;
      case '2': handleNumInput({ target: { value: '2' } });
        break;
      case '3': handleNumInput({ target: { value: '3' } });
        break;
      case '0': handleNumInput({ target: { value: '0' } });
        break;
      case '.': handleNumInput({ target: { value: '.' } });
        break;
      case '+': handleArithInput({ target: { value: '+' } });
        break;
      case '-': handleArithInput({ target: { value: '-' } });
        break;
      case '*': handleArithInput({ target: { value: 'x' } });
        break;
      case '/': handleArithInput({ target: { value: '/' } });
        break;
      case 'Enter': handleResult();
        break;
      case '=': handleResult();
        break;

      default: return;
    }
    e.preventDefault();
  };

  return (
    <>
      <div className={`container theme_${themeNumber}`}>
        
        <Header setTheme={setThemeNumber}/>
        <Output output={output} />
        <div className="key-container">
          <Button name={'7'} handleInput={handleNumInput} />
          <Button name={'8'} handleInput={handleNumInput} />
          <Button name={'9'} handleInput={handleNumInput} />
          <Button name={'DEL'} handleInput={handleDelete} />
          <Button name={'4'} handleInput={handleNumInput} />
          <Button name={'5'} handleInput={handleNumInput} />
          <Button name={'6'} handleInput={handleNumInput} />
          <Button name={'+'} handleInput={handleArithInput} />
          <Button name={'1'} handleInput={handleNumInput} />
          <Button name={'2'} handleInput={handleNumInput} />
          <Button name={'3'} handleInput={handleNumInput} />
          <Button name={'-'} handleInput={handleArithInput} />
          <Button name={'.'} handleInput={handleNumInput} />
          <Button name={'0'} handleInput={handleNumInput} />
          <Button name={'/'} handleInput={handleArithInput} />
          <Button name={'x'} handleInput={handleArithInput} />

          <Button name={'RESET'} handleInput={handleReset} />
          <Button name={'='} handleInput={handleResult} />
        </div>
      </div>
    </>
  );
}

export default App;