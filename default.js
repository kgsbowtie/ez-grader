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
    // console.log(grade)
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
    let { total, pointsOff } = getValuesAsDOM()
    let finalGradeDOM = document.getElementById("final-grade")
    let fractionGradeDOM = document.getElementById("fraction-grade")
    let rawGradeDOM = document.getElementById("raw-grade")
    finalGradeDOM.classList.remove("excellent","very-good")
    let { excellent, veryGood } = getExcellentThresholdAsValues();
    if (total.value === "" || pointsOff.value === "") {
      finalGradeDOM.innerText = `––%`
      fractionGradeDOM.innerText = `- / -`
      rawGradeDOM.innerText = `--.-----%`
      return
    }


    let raw = rawGrade()
    let fraction = fractionGrade()
    let final = finalGrade()
    
    
    finalGradeDOM.innerText = `${finalGrade()}%`

    fractionGradeDOM.innerText = fraction
    rawGradeDOM.innerText = `${raw.toFixed(5)}%`

    
    if (final >= excellent) {
      finalGradeDOM.classList.add("excellent")
    }
    else if (final >= veryGood) {
      finalGradeDOM.classList.add("very-good")
    }
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

  function getExcellentThresholdAsValues() {
    let excellentTextbox = document.getElementById("excellent")
    let veryGoodTextbox = document.getElementById("very-good")

    return {
      excellent: excellentTextbox.value,
      veryGood: veryGoodTextbox.value
    }
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

    // Sets event listener for other textboxes
    let excellentTextbox = document.getElementById("excellent")
    let veryGoodTextbox = document.getElementById("very-good")
    excellentTextbox.addEventListener('blur',displayOutput,false)
    excellentTextbox.addEventListener('focus',function(event) {
        this.select()
      },false)
    veryGoodTextbox.addEventListener('blur',displayOutput,false)
    veryGoodTextbox.addEventListener('focus',function(event) {
        this.select()
      },false)
    // Add class for color thresholds
    
  })(getValuesAsDOM())
  displayOutput();
  // function addInputEventListeners
  // document.addEventListener('keyup', (event) => { 
  //   let assignment = getValuesAsDOM()
  //   let { total: { value: totalValue }, pointsOff: { value: pointsOffValue } } = assignment
  //   console.log(total)
  // }, false)