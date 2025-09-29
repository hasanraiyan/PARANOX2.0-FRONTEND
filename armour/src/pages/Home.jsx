import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome Home</CardTitle>
          <CardDescription>
            This is the home page of our React Router application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              React Router DOM is now configured and working!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home