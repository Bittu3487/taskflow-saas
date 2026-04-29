import React from 'react'
import Button from './Button'
import '../styles/ButtonShowcase.css'

/**
 * Button Showcase Component
 * Displays all available button variants, sizes, and states
 */
function ButtonShowcase() {
  return (
    <div className="button-showcase">
      <div className="showcase-container">
        <h1>Modern Dark Button System</h1>
        <p className="subtitle">
          A comprehensive collection of button variants for all your UI needs
        </p>

        {/* Variants Section */}
        <section className="showcase-section">
          <h2>Button Variants</h2>
          <div className="showcase-grid">
            <div className="showcase-item">
              <Button variant="primary">Primary</Button>
              <code>.button-dark-primary</code>
            </div>
            <div className="showcase-item">
              <Button variant="accent">Accent</Button>
              <code>.button-dark-accent</code>
            </div>
            <div className="showcase-item">
              <Button variant="subtle">Subtle</Button>
              <code>.button-dark-subtle</code>
            </div>
            <div className="showcase-item">
              <Button variant="danger">Danger</Button>
              <code>.button-dark-danger</code>
            </div>
            <div className="showcase-item">
              <Button variant="success">Success</Button>
              <code>.button-dark-success</code>
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="showcase-section">
          <h2>Button Sizes</h2>
          <div className="showcase-grid">
            <div className="showcase-item">
              <Button variant="accent" size="sm">Small</Button>
              <code>size="sm"</code>
            </div>
            <div className="showcase-item">
              <Button variant="accent" size="md">Medium</Button>
              <code>size="md" (default)</code>
            </div>
            <div className="showcase-item">
              <Button variant="accent" size="lg">Large</Button>
              <code>size="lg"</code>
            </div>
          </div>
        </section>

        {/* With Icons Section */}
        <section className="showcase-section">
          <h2>With Icons</h2>
          <div className="showcase-grid">
            <div className="showcase-item">
              <Button variant="accent" icon="➕">
                Add Item
              </Button>
              <code>icon="➕"</code>
            </div>
            <div className="showcase-item">
              <Button variant="success" icon="✓">
                Confirm
              </Button>
              <code>icon="✓"</code>
            </div>
            <div className="showcase-item">
              <Button variant="danger" icon="🗑️" iconPosition="right">
                Delete
              </Button>
              <code>iconPosition="right"</code>
            </div>
            <div className="showcase-item">
              <Button variant="subtle" icon="🌙">
                Theme Toggle
              </Button>
              <code>icon="🌙"</code>
            </div>
          </div>
        </section>

        {/* States Section */}
        <section className="showcase-section">
          <h2>Button States</h2>
          <div className="showcase-grid">
            <div className="showcase-item">
              <Button variant="accent">Normal</Button>
              <code>Normal State</code>
            </div>
            <div className="showcase-item">
              <Button variant="accent" loading>
                Saving
              </Button>
              <code>loading={'{true}'}</code>
            </div>
            <div className="showcase-item">
              <Button variant="accent" disabled>
                Disabled
              </Button>
              <code>disabled={'{true}'}</code>
            </div>
            <div className="showcase-item">
              <Button variant="accent" size="sm" icon="⚙️">
                Options
              </Button>
              <code>With Icon</code>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="showcase-section">
          <h2>Common Use Cases</h2>
          <div className="showcase-grid">
            <div className="showcase-item showcase-use-case">
              <div className="use-case-demo">
                <Button variant="accent" size="lg">
                  ➕ Create Task
                </Button>
              </div>
              <code>Create/Add Action</code>
            </div>
            <div className="showcase-item showcase-use-case">
              <div className="use-case-demo">
                <Button variant="success">
                  ✓ Confirm
                </Button>
                <Button variant="subtle" size="sm">
                  Cancel
                </Button>
              </div>
              <code>Confirm Dialog</code>
            </div>
            <div className="showcase-item showcase-use-case">
              <div className="use-case-demo">
                <Button variant="subtle" icon="🌙">
                  Dark
                </Button>
                <Button variant="danger" size="sm" icon="🚪">
                  Logout
                </Button>
              </div>
              <code>Header Actions</code>
            </div>
            <div className="showcase-item showcase-use-case">
              <div className="use-case-demo">
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </div>
              <code>Destructive Action</code>
            </div>
          </div>
        </section>

        {/* Full Width Section */}
        <section className="showcase-section">
          <h2>Full Width Button</h2>
          <Button variant="accent" style={{ width: '100%' }}>
            Submit Form
          </Button>
        </section>

        {/* Code Example Section */}
        <section className="showcase-section">
          <h2>Usage Example</h2>
          <div className="code-block">
            <pre>{`import Button from './components/Button'

function MyComponent() {
  return (
    <div>
      {/* Primary action */}
      <Button variant="accent" onClick={handleSubmit}>
        ➕ Add Task
      </Button>

      {/* Danger action */}
      <Button variant="danger" size="sm" onClick={handleDelete}>
        🗑️ Delete
      </Button>

      {/* With loading state */}
      <Button 
        variant="accent" 
        loading={isLoading}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  )
}`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ButtonShowcase
