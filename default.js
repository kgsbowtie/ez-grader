function getValuesAsDOM() {
    let assignmentTotal = document.getElementById("total")
    let pointsOff = document.getElementById("points")
    
    return {
      total: assignmentTotal,
      pointsOff: pointsOff
    }
  }
  function getValues() {
    let assignment = getValuesAsDOM()
    let { total, pointsOff } = assignment
    let totalValue = total.value
    let pointsOffValue = pointsOff.value
    //console.log(totalValue)
    return {
      total: totalValue,
      pointsOff: pointsOffValue
    }
  }
  function defaults({total,pointsOff}) {
    total = typeof total === 'number' ? 1 : total
    pointsOff = typeof pointsOff === 'number' ? 0 : pointsOff
    return {
      total: total,
      pointsOff: pointsOff
    }
  }
  function rawGrade() {
    let assignment = getValues();
    assignment = defaults(assignment)
    let {total, pointsOff} = assignment
    
    let grade = (total - pointsOff) / total
    grade = grade * 100 // convert % to 100 point score
    console.log(grade)
    return grade
  }
  function fractionGrade() {
    let assignment = getValues();
    assignment = defaults(assignment)
    let {total, pointsOff} = assignment
    let points = total - pointsOff
    return `${points} / ${total}`
  }
  function finalGrade() {
    // let assignment = {
    //   total: total,
    //   pointsOff: pointsOff
    // }
    let raw = rawGrade()
    return Math.round(raw)
  }
  
  function onInput(event) {
    displayOutput()
  }
  function displayOutput() {
    let raw = `${rawGrade().toFixed(5)}%`
    let fraction = fractionGrade()
    let final = `${finalGrade()}%`
    
    document.getElementById("final-grade").innerText = final
    document.getElementById("fraction-grade").innerText = fraction
    document.getElementById("raw-grade").innerText = raw
  }
  function lockTotalBox(event) {
    let checkboxChecked = this.checked
    let totalBox = document.getElementById("total")
    if (checkboxChecked) {
      totalBox.disabled = true
    }
    else {
      totalBox.disabled = false
    }
  }
  function selectText(event) {
    const input = document.getElementById('points');
    input.focus();
    input.select();
  }
  
  (function setInputEventListeners(assignment) {
    // Sets event listeners for textboxes (`inputs`)
    let { total, pointsOff } = assignment
    total.addEventListener('input', onInput, false)
    points.addEventListener('input', onInput, false)
    
    // Sets event listener for checkbox
    let lock = document.getElementById("lock")
    lock.addEventListener('change', lockTotalBox, false)
    
    // Sets event listener for button
    let button = document.getElementById("new-grade-btn")
    button.addEventListener('click', selectText, false)
    
  })(getValuesAsDOM())
  
  
  // function addInputEventListeners
  // document.addEventListener('keyup', (event) => { 
  //   let assignment = getValuesAsDOM()
  //   let { total: { value: totalValue }, pointsOff: { value: pointsOffValue } } = assignment
  //   console.log(total)
  // }, false)