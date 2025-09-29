import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">About Us</CardTitle>
          <CardDescription className="text-left space-y-4">
            <p>
              This application demonstrates React Router DOM v7 integration with a modern React setup.
            </p>
            <div>
              <p className="mb-3">Key features implemented:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">BrowserRouter configuration</Badge>
                <Badge variant="secondary">Multiple page routing</Badge>
                <Badge variant="secondary">Navigation with active link highlighting</Badge>
                <Badge variant="secondary">Responsive design with Tailwind CSS</Badge>
                <Badge variant="secondary">Modern React 19 with Vite build tool</Badge>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Built with React Router DOM v7.9.3 for optimal performance and developer experience.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

export default About