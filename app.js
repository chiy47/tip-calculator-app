const tipPerPerson = document.querySelector('#tip-per-person')
const totalPerPerson = document.querySelector('#total-per-person')
const customTip = document.querySelector('#input-tip-custom')
const tipsOptions = document.querySelectorAll('.tip')
const tipsSelector = document.querySelector('.people-container')
const billAmount = document.querySelector('#input-bill')
const numOfPeople = document.querySelector('#input-people')
const resetBtn = document.querySelector('button')
const tip15 = document.querySelector('#tip15')

var bill = 0,
  tip = 0,
  people = 0

billAmount.addEventListener('input', (e) => {
  const { value } = e.target
  bill = parseFloat(value)
  calculateTip()
})

tipsOptions.forEach((tipsOption) => {
  tipsOption.addEventListener('click', () => {
    resetCustomTip()
    tip = parseFloat(tipsOption.value)
    calculateTip()
  })
})

customTip.addEventListener('input', (e) => {
  const { value } = e.target
  if (value !== '') {
    resetTipsOptions()
    tip = parseFloat(value)
    calculateTip()
  }
})

const resetCustomTip = () => {
  customTip.value = ''
}

const resetTipOptions = () => {
  tipsOptions.forEach((tipsOption) => {
    tipsOption.checked = false
  })
}

numOfPeople.addEventListener('input', (e) => {
  const { value } = e.target
  people = parseFloat(value)
  if (!people || people === 0) {
    setError()
    return
  }
  calculateTip()
})

const calculateTip = () => {
  enableResetButton()
  if (!people || people === 0) {
    setError()
    return
  }
  removeError()
  const tipAmount = bill * (tip / 100)
  const finalAmountPerPerson = (bill + tipAmount) / people
  const finalTipPerPerson = tipAmount / people
  setValues(finalTipPerPerson, finalAmountPerPerson)
}

const disableResetButton = () => {
  resetBtn.disabled = true
}

const enableResetButton = () => {
  resetBtn.disabled = false
}

const setError = () => {
  tipsSelector.classList.add('error')
}

const removeError = () => {
  tipsSelector.classList.remove('error')
}

const setValues = (tip, bill) => {
  tipPerPerson.textContent = tip.toFixed(2)
  totalPerPerson.textContent = bill.toFixed(2)
}

const resetValues = () => {
  tip = 15
  people = 0
  bill = 0
  setValues(0, 0)
  billAmount.value = ''
  numOfPeople.value = ''
  resetCustomTip()
  resetTipOptions()
  tip15.checked = true
  removeError()
  disableResetButton()
}

resetValues()
