# 🎯 Modern Dark Button - Quick Reference

## Cheat Sheet

### Basic Usage
```jsx
import Button from './components/Button'

// Simple button
<Button>Click Me</Button>

// With variant
<Button variant="accent">Add Task</Button>

// With size
<Button variant="danger" size="sm">Delete</Button>

// With icon
<Button variant="success" icon="✓">Confirm</Button>

// Loading state
<Button loading>Saving...</Button>

// Disabled
<Button disabled>Unavailable</Button>
```

## Variants at a Glance

| Variant | Best For | Example |
|---------|----------|---------|
| `primary` | General buttons | Save, Continue |
| `accent` | Main CTA | Add, Create, Submit |
| `subtle` | Secondary action | Cancel, Theme toggle |
| `danger` | Delete/destructive | Delete, Remove, Clear |
| `success` | Confirmation | Confirm, Approve, OK |

## Sizes

```
sm  → Compact (8px 12px)
md  → Standard (14px 20px) - DEFAULT
lg  → Prominent (16px 28px)
```

## Icons & Positioning

```jsx
// Icon on left (default)
<Button icon="➕">Add Task</Button>

// Icon on right
<Button icon="→" iconPosition="right">Next</Button>

// Emoji icons work great
🚪 🗑️ ✓ ✕ ➕ → ⚙️ 🌙 ☀️ 🔔 🔒
```

## Common Patterns

### Form Submission
```jsx
<Button variant="accent" size="lg">
  Submit Form
</Button>
```

### Cancel Button
```jsx
<Button variant="subtle">
  Cancel
</Button>
```

### Delete Confirmation
```jsx
<Button variant="danger" size="sm" icon="🗑️">
  Delete
</Button>
```

### Loading Action
```jsx
<Button 
  variant="accent" 
  loading={isLoading}
  disabled={isLoading}
>
  {isLoading ? 'Saving' : 'Save'}
</Button>
```

### Floating Button
```jsx
<Button 
  variant="accent" 
  className="button-dark-icon"
  title="Add new"
>
  ➕
</Button>
```

## CSS Classes (Direct Use)

```html
<!-- Variant -->
.button-dark-primary
.button-dark-accent
.button-dark-subtle
.button-dark-danger
.button-dark-success

<!-- Size -->
.button-dark-sm
.button-dark-lg

<!-- States -->
:disabled
.loading

<!-- Special -->
.button-dark-icon
```

## Styling Customization

### Change button width
```jsx
<Button style={{ width: '100%' }}>
  Full Width
</Button>
```

### Custom className
```jsx
<Button className="my-custom-class">
  Custom
</Button>
```

### As link
```jsx
<Button as="a" href="/dashboard">
  Go to Dashboard
</Button>
```

## Colors

```
Primary:   #1f2937 (Dark)
Accent:    #7c3aed (Purple)
Danger:    #dc2626 (Red)
Success:   #059669 (Green)
Subtle:    rgba(255,255,255,0.08)
```

## Events

```jsx
<Button
  onClick={handleClick}
  onHover={handleHover}
  onFocus={handleFocus}
  onBlur={handleBlur}
>
  Interactive
</Button>
```

## Accessibility

```jsx
// Always provide meaningful text
<Button>✓ Good</Button>      ✅

// Or use aria-label
<Button aria-label="Confirm">✓</Button>  ✅

// Avoid
<Button>...</Button>  ❌
```

## Performance Tips

✅ Use `Button` component for consistency  
✅ Memoize buttons if they have expensive handlers  
✅ Use `disabled` instead of hiding  
✅ Batch state updates with handlers  
✅ Avoid inline onClick functions  

## Mobile Best Practices

- Minimum 44px tap target (auto in Button component)
- Use `sm` size for dense layouts
- Test on actual devices
- Ensure sufficient spacing between buttons

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Button text too short | Increase padding with size prop |
| Icon not showing | Use emoji or import icon library |
| Loading spinner doesn't spin | Check animation in Button.css |
| Hover effect not working | Ensure CSS is imported |
| Button too wide on mobile | Use `width: 100%` with caution |

## Browser Support

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile browsers  

## File Imports

```jsx
// Component
import Button from './components/Button'

// CSS (if needed)
import './styles/Button.css'

// Showcase
import ButtonShowcase from './components/ButtonShowcase'
```

## Related Files

- Full docs: `BUTTON_GUIDE.md`
- Implementation: `BUTTON_IMPLEMENTATION.md`
- Live demo: `/buttons` route
- Component: `client/src/components/Button.js`
- Styles: `client/src/styles/Button.css`

---

**Quick Links:**
- 📖 [Full Documentation](BUTTON_GUIDE.md)
- 📋 [Implementation Guide](BUTTON_IMPLEMENTATION.md)
- 🎨 [Live Showcase](http://localhost:3000/buttons)
- 💻 [Button Component](client/src/components/Button.js)
