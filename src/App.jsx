import { useRef, useState } from 'react'

function App() {
  const [number, setNumber] = useState('0')
  const display = useRef(null)
  const input = useRef(null)

  const getDisplay = () => display.current.innerText
  const setDisplay = (value) => {
    display.current.innerText = value
  }

  const getInput = () => input.current.innerText
  const setInput = (value) => {
    input.current.innerText = value
  }

  const handleCalc = (value) => {
    const displayNow = getDisplay()
    const inputNow = getInput()
    if (displayNow == 0 && value == 0) {
      setInput('0')
      return
    }
    if (number.includes('.') && value == '.') return
    switch (value) {
      case "AC":
        setDisplay( 0)
        setInput('')
        setNumber('0')
        break;
      case "=":
        if (inputNow != 0 && !inputNow.includes('=')) {
          if (!['/', 'x'].includes(inputNow[0])) {
            const eva = eval(inputNow.replaceAll('--', '+').replaceAll('x', '*'))
            setDisplay(eva)
            setInput(inputNow + '=' + eva)
          }
          setNumber('0')
        }
        break;
      default:
        if (['/', 'x', '+', '-'].includes(value)) {
          setNumber('0')
          if (inputNow.includes('=')) {
            setInput(display.current.innerText + value)
            setDisplay(value)
          } else {
            if (inputNow.length > 1 && ['/', 'x', '+'].includes(inputNow[inputNow.length - 1]) && value != '-') {
              setDisplay(value)
              setInput(inputNow.substring(0, inputNow.length - 1) + value)
            } else if (inputNow.length > 1 && inputNow[inputNow.length - 2] == '-' && ['/', 'x', '+'].includes(inputNow[inputNow.length - 1])) {

            } else if (inputNow.length > 1 && inputNow[inputNow.length - 1] == '-' && ['/', 'x', '+'].includes(inputNow[inputNow.length - 2])) {
              setDisplay(value)
              setInput(inputNow.substring(0, inputNow.length - 2) + value)
            }
            else {
              setDisplay(value)
              setInput(inputNow + value)
            }
          }
        } else {
          if (!['/', 'x', '+', '-'].includes(inputNow[inputNow.length - 1])) {
            if (number != '0') {
              setDisplay(number + value)
              setInput(inputNow + value)
            } else {
              setDisplay(inputNow + value)
              setInput(inputNow + value)
            }
          } else if (value == '.' && displayNow == 0) {
            setDisplay(displayNow + value)
            setInput(inputNow + value)
          }
          else {
            setDisplay(value)
            setInput(inputNow + value)
          }
          if (value != '.' && number == '0') {
            setNumber(value)
          } else {
            setNumber(number + value)
          }
        }
        break;
    }
  }

  return (
    <div className="App">
      <h1 className='text-center text-3xl font-bold my-20 uppercase'>Calculator</h1>
      <div className='calculator flex flex-col justify-center items-center mb-28'>
        <div className='w-3/4 md:w-1/2 text-right bg-black '>
          <div className='p-2 font h-5 text-yellow-400 text-xl' ref={input}>
          </div>
          <div className='p-2 font text-green-600 text-[50px]' id="display" ref={display}>
          0
          </div>
        </div>
        <div className='grid grid-cols-4 border-8 border-black w-3/4 md:w-1/2 bg-[#4D4D4D] text-white font text-2xl font-semibold'>
          <button onClick={() => handleCalc('AC')} value="AC" className='hover:text-black hover:border-white h-20 col-span-2 border border-black bg-red-500' id="clear">AC</button>
          <button onClick={() => handleCalc('/')} value='/' className='hover:text-black hover:border-white h-20 border border-black bg-[#787B82]' id="divide" >/</button>
          <button onClick={() => handleCalc('x')} value='x' className='hover:text-black hover:border-white h-20 border border-black bg-[#787B82]' id="multiply" >x</button>
          <button onClick={() => handleCalc('7')} value='7' className='hover:text-black hover:border-white h-20 border border-black' id="seven">7</button>
          <button onClick={() => handleCalc('8')} value='8' className='hover:text-black hover:border-white h-20 border border-black' id="eight">8</button>
          <button onClick={() => handleCalc('9')} value='9' className='hover:text-black hover:border-white h-20 border border-black' id="nine">9</button>
          <button onClick={() => handleCalc('-')} value="-" className='hover:text-black hover:border-white h-20 border border-black bg-[#787B82]' id="subtract" >-</button>
          <button onClick={() => handleCalc('4')} value='4' className='hover:text-black hover:border-white h-20 border border-black' id="four">4</button>
          <button onClick={() => handleCalc('5')} value='5' className='hover:text-black hover:border-white h-20 border border-black' id="five">5</button>
          <button onClick={() => handleCalc('6')} value='6' className='hover:text-black hover:border-white h-20 border border-black' id="six">6</button>
          <button onClick={() => handleCalc('+')} value='+' className='hover:text-black hover:border-white h-20 border border-black bg-[#787B82]' id="add">+</button>
          <button onClick={() => handleCalc('1')} value='1' className='hover:text-black hover:border-white h-20 border border-black' id="one">1</button>
          <button onClick={() => handleCalc('2')} value='2' className='hover:text-black hover:border-white h-20 border border-black' id="two">2</button>
          <button onClick={() => handleCalc('3')} value='3' className='hover:text-black hover:border-white h-20 border border-black' id="three">3</button>
          <button onClick={() => handleCalc('=')} value='=' className='hover:text-black hover:border-white h-40 row-span-2 border border-black bg-[#345995]' id='equals' >=</button>
          <button onClick={() => handleCalc('0')} value="0" className='hover:text-black hover:border-white h-20 col-span-2 border border-black' id="zero">0</button>
          <button onClick={() => handleCalc('.')} value='.' className='hover:text-black hover:border-white h-20 border border-black' id="decimal">.</button>
        </div>
      </div>
    </div>
  )
}

export default App
