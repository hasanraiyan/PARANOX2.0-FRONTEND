import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Navigation() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              React Router App
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button
                variant={isActive('/') ? "default" : "ghost"}
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant={isActive('/about') ? "default" : "ghost"}
                size="sm"
              >
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant={isActive('/contact') ? "default" : "ghost"}
                size="sm"
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation