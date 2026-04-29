import React from 'react'
import '../styles/Button.css'

/**
 * Modern Dark Button Component
 * 
 * Variants: 'primary', 'accent', 'subtle', 'danger', 'success'
 * Sizes: 'sm', 'md', 'lg'
 * 
 * @example
 * <Button variant="accent">Click Me</Button>
 * <Button variant="danger" size="sm">Delete</Button>
 * <Button disabled>Disabled</Button>
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const variantClass = `button-dark-${variant}`
  const sizeClass = size !== 'md' ? `button-dark-${size}` : ''
  const classes = `button-dark ${variantClass} ${sizeClass} ${className}`.trim()

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="button-spinner" />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="button-icon">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="button-icon">{icon}</span>
      )}
    </button>
  )
}

export default Button
