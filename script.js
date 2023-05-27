
function add(num1, num2){return num1+num2;}

function subtract(num1, num2){return num1-num2;}

function multiply(num1, num2){return num1*num2;}

function divide(num1, num2){return num1/num2;}

function operate(num1, num2, operation){
    if(operation == '+'){
        return add(num1, num2);
    } else if(operation == '-'){
        return subtract(num1, num2);
    } else if(operation == '*'){
        return multiply(num1, num2);
    } else if(operation == '/'){
        return divide(num1, num2);
    }else{
        return 'ERROR, unsupported operand';
    }
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

var firstOperand = NaN;
var operator = NaN;
var lastOperand = NaN;

var expression_Half_Complete = false;
// var expression_Complete = false;

var expression = '';

buttons.forEach((button) => {
    button.addEventListener('click', ()=> {

        //Error detection (doesn't really work, NaN shows up in the display)
        if(typeof(firstOperand)!='number' || typeof(lastOperand)!='number'){
            expression = 'ERROR! Incorrect operands';
            display.textContent = expression;
            return;
        }

        //if the button pressed is an operator then either expression already has an operator or it doesn't
        if(button.classList.contains("operator")){
            if(!expression_Half_Complete){ //if it doesn't (i.e. expression_Half_Complete == false)
                                            //then we know that expression only has
                                            //the first operand so far, 
                                            //therefore we can assign the firstOperand to the expression
                expression_Half_Complete = true; //we set expression_Half_Complete to true 
                                                //because now the expression is half complete
                firstOperand = parseFloat(expression);
                operator = button.textContent;
                expression = expression + button.textContent;

            }else if(expression_Half_Complete){
                lastOperand = parseFloat(expression.split(operator)[1]); //secondoperand is the part of the expression 
                                                                        //after the operator thus we can split the string
                                                                        //and assign the second slice to lastOperand 
                let result = operate(firstOperand, lastOperand, operator); //result will be calculated and it will become
                                                                            //the firstOperand for the next operation
                firstOperand = result;
                operator = button.textContent;

                expression = result.toString();
                expression = expression + button.textContent;
            }
        }

        if(button.classList.contains("equals")){
            lastOperand = parseFloat(expression.split(operator)[1]);
            let result = operate(firstOperand, lastOperand, operator);
                
            expression = result.toString();
            expression_Half_Complete = false;
        }

        if(button.classList.contains("digit")){
            expression = expression + button.textContent;
        }

        if(button.classList.contains("clear")){
            expression = '';
        }

        if(button.classList.contains("delete")){
            expression = expression.slice(0, -1);
        }

        if(button.classList.contains("dot")){
            if(!expression_Half_Complete){
                if(!expression.includes('.')){ //expression only consists of the
                    // first operand so far therefore checking the entire expression for a dot.
                    expression = expression + button.textContent;
                }
            } else {
                if(!expression.split(operator)[1].includes('.')){ //checking the second operand in case 
                    //the expression is half complete
                    expression = expression + button.textContent;
                }
            }
        }

        display.textContent = expression;
    })
});

//keyboard support
window.addEventListener('keydown', (keypress) => {
    let k = keypress.key;
    if(k == 'Enter'){
        k = '=';
    }
    const btn = document.querySelector('button[data-key='+CSS.escape(k)+']');
    if(btn){
        btn.click();
    }
});

