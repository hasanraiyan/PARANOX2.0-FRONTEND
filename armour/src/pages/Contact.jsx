import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
          <CardDescription>
            <Alert className="mb-4">
              <AlertDescription>
                Get in touch with us for any questions or support.
              </AlertDescription>
            </Alert>
            <div className="text-left space-y-3">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                  <span className="text-xs">📧</span>
                </Badge>
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                  <span className="text-xs">📱</span>
                </Badge>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                  <span className="text-xs">📍</span>
                </Badge>
                <span>123 Main St, City, State 12345</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default Contact