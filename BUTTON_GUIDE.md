# Modern Dark Button System Guide

A modern, accessible button system with multiple variants, sizes, and states for your TaskFlow dashboard.

## 🎨 Variants

### Primary
Standard dark charcoal button with subtle depth.
```jsx
<Button variant="primary">Primary Button</Button>
```

### Accent
Eye-catching purple gradient button for important actions.
```jsx
<Button variant="accent">Accent Button</Button>
```

### Subtle
Frosted glass effect button with low contrast.
```jsx
<Button variant="subtle">Subtle Button</Button>
```

### Danger
Red gradient button for destructive actions like delete.
```jsx
<Button variant="danger">Delete</Button>
```

### Success
Green gradient button for positive confirmations.
```jsx
<Button variant="success">Confirm</Button>
```

## 📏 Sizes

### Small (sm)
Perfect for compact spaces and secondary actions.
```jsx
<Button variant="primary" size="sm">Small</Button>
```

### Medium (md) - Default
Standard button size for most use cases.
```jsx
<Button variant="primary">Medium</Button>
```

### Large (lg)
Prominent buttons for primary CTAs.
```jsx
<Button variant="accent" size="lg">Large Action</Button>
```

## ✨ Features

### Icons
Add icons before or after text.
```jsx
<Button variant="accent" icon="➕">
  Add Task
</Button>

<Button variant="danger" icon="🗑️" iconPosition="right">
  Delete
</Button>
```

### Loading State
Display loading indicator while processing.
```jsx
<Button variant="accent" loading>
  Saving...
</Button>
```

### Disabled State
Disable buttons for inactive states.
```jsx
<Button variant="primary" disabled>
  Disabled
</Button>
```

## 🎯 Usage Examples

### In Dashboard
```jsx
import Button from './components/Button'

function Dashboard() {
  return (
    <div>
      <Button variant="accent" onClick={createTask}>
        ➕ Add Task
      </Button>
      
      <Button variant="subtle" onClick={toggleTheme}>
        🌙 Dark Mode
      </Button>
      
      <Button variant="danger" size="sm" onClick={deleteTask}>
        Delete
      </Button>
    </div>
  )
}
```

### Direct CSS Classes
For inline HTML elements, use CSS classes directly:
```html
<!-- Primary Button -->
<button class="button-dark button-dark-primary">
  Click Me
</button>

<!-- Accent with Icon -->
<button class="button-dark button-dark-accent">
  ➕ Add Task
</button>

<!-- Small Danger Button -->
<button class="button-dark button-dark-danger button-dark-sm">
  Delete
</button>

<!-- Large Success Button -->
<button class="button-dark button-dark-success button-dark-lg">
  Confirm Changes
</button>
```

## 🎨 CSS Class Reference

### Variants
- `.button-dark-primary` - Dark charcoal
- `.button-dark-accent` - Purple gradient
- `.button-dark-subtle` - Frosted glass
- `.button-dark-danger` - Red gradient
- `.button-dark-success` - Green gradient

### Sizes
- `.button-dark-sm` - Small
- `.button-dark-lg` - Large
- (Default/medium is just `.button-dark`)

### Special
- `.button-dark-icon` - Icon-only button
- `.loading` - Loading state
- `:disabled` - Disabled state

## 🌈 Color Palette

| Variant | Primary | Secondary | Shadow |
|---------|---------|-----------|--------|
| Primary | #1f2937 | #111827 | rgba(0,0,0,0.32) |
| Accent | #7c3aed | #6d28d9 | rgba(124,58,237,0.3) |
| Danger | #dc2626 | #b91c1c | rgba(220,38,38,0.28) |
| Success | #059669 | #047857 | rgba(5,150,105,0.28) |
| Subtle | rgba(255,255,255,0.08) | - | rgba(0,0,0,0.2) |

## ✅ Best Practices

1. **Use semantic variants**: danger for destructive, success for confirmations
2. **Keep text concise**: 1-3 words for better UI
3. **Provide visual feedback**: Use loading state for async operations
4. **Accessibility**: Always include text labels or aria-labels
5. **Spacing**: Use gap between icon and text (already built-in)

## 🔄 Transitions & Animations

- **Hover**: Lift effect (-3px) with enhanced shadow
- **Active**: Slight press effect (-1px)
- **Loading**: Spinning indicator animation
- **Duration**: 0.3s with cubic-bezier easing

## 📱 Responsive Behavior

Buttons automatically adjust on mobile:
- Padding reduces from 14px→12px
- Font-size reduces slightly
- Border-radius adjusts proportionally

## 🚀 Future Enhancements

- [ ] Add outline variants
- [ ] Add button groups
- [ ] Add split button/dropdown
- [ ] Add tooltip support
- [ ] Add animation presets

## 📝 Notes

- All buttons use `-webkit-` prefixes for cross-browser support
- Supports keyboard navigation and focus states
- Built with accessibility in mind (WCAG 2.1 compliant)
- Works in light and dark modes seamlessly
