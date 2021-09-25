const tipPerPerson = document.querySelector('#tip-per-person')
const totalPerPerson = document.querySelector('#total-per-person')
const customTip = document.querySelector('#input-tip-custom')
const tipsOptions = document.querySelectorAll('.tip')
const billAmount = document.querySelector('#input-bill')
const numOfPeople = document.querySelector('#input-people')
const resetBtn = document.querySelector('.reset')
const billErr = document.querySelector('.bill-error')
const pplErr = document.querySelector('.people-error')

var bill = 0,
  tip = 0,
  people = 0

billAmount.addEventListener('input', (e) => {
  const { value } = e.target
  bill = parseFloat(value)
  if (bill <= 0) {
    billAmount.classList.add('error')
    billErr.style.visibility = 'visible'
    return
  } else {
    billAmount.classList.remove('error')
    billErr.style.visibility = 'hidden'
    calculateTip()
  }
})

tipsOptions.forEach((tipsOption) => {
  tipsOption.addEventListener('click', () => {
    resetCustomTip()
    if (tipsOption.classList.contains('selected')) {
      tip = 0
      tipsOption.classList.remove('selected')
      tipsOption.classList.add('unselected')
    } else {
      tip = tipsOption.value
      tipsOptions.forEach((tipsOption) =>
        tipsOption.classList.remove('selected')
      )
      tipsOption.classList.remove('unselected')
      tipsOption.classList.add('selected')
    }
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

const resetTipsOptions = () => {
  tipsOptions.forEach((tipsOption) => {
    tipsOption.checked = false
    tipsOption.classList.remove('selected')
  })
}

numOfPeople.addEventListener('input', (e) => {
  const { value } = e.target
  people = parseFloat(value)
  if (people <= 0) {
    numOfPeople.classList.add('error')
    pplErr.style.visibility = 'visible'
    return
  } else {
    numOfPeople.classList.remove('error')
    pplErr.style.visibility = 'hidden'
    calculateTip()
  }
})

const calculateTip = () => {
  enableResetButton()
  if (bill >= 0 && people >= 1) {
    const tipAmount = bill * (tip / 100)
    const finalAmountPerPerson = (bill + tipAmount) / people
    const finalTipPerPerson = tipAmount / people
    setValues(finalTipPerPerson, finalAmountPerPerson)
  }
}

const disableResetButton = () => {
  resetBtn.disabled = true
  resetBtn.classList.remove('enable')
  resetBtn.classList.add('disable')
}

const enableResetButton = () => {
  resetBtn.disabled = false
  resetBtn.classList.remove('disable')
  resetBtn.classList.add('enable')
}

const setValues = (tip, bill) => {
  tipPerPerson.textContent = tip.toFixed(2)
  totalPerPerson.textContent = bill.toFixed(2)
}

const resetValues = () => {
  tip = 0
  people = 0
  bill = 0
  setValues(0, 0)
  billAmount.value = ''
  numOfPeople.value = ''
  resetCustomTip()
  resetTipsOptions()
  tipsOptions.forEach((tipsOption) => {
    tipsOption.classList.remove('selected')
    tipsOption.classList.add('unselected')
  })
  disableResetButton()
}

resetBtn.addEventListener('click', resetValues)
