
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

function generateExpression(expression){

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
        if(!(firstOperand))
        if(button.classList.contains("operator")){
            if(!expression_Half_Complete){
                expression_Half_Complete = true;
                firstOperand = parseInt(expression);
                operator = button.textContent;
                expression = expression + button.textContent;

            }else if(expression_Half_Complete){
                lastOperand = parseInt(expression.split(operator)[1]);
                let result = operate(firstOperand, lastOperand, operator);
                
                firstOperand = result;
                operator = button.textContent;

                expression = result.toString();
                expression = expression + button.textContent;
            }
        }

        if(button.classList.contains("equals")){
            lastOperand = parseInt(expression.split(operator)[1]);
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

        display.textContent = expression;
    })
});

