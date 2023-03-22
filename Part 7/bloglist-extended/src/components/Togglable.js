import React, { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

// Bootstrap components
import Button from "react-bootstrap/Button"

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const hideWhenVisible = { display: isVisible ? "none" : "" }
  const showWhenVisible = { display: isVisible ? "" : "none" }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className="mt-1" variant="danger" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = "Togglable"

export default Togglable
