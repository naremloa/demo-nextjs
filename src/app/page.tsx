import { Card, CardContent } from '@/shadcn/components/ui/card'
import { LoginForm } from './login-form'
// import { LoginFormWrapper } from './login-form-wrapper-v1'
import { LoginFormWrapper } from './login-form-wrapper-v2'

export default function Home() {
  return (
    <div className="flex min-h-[100vh] flex-col justify-center">
      <Card className="max-w-[840px] min-w-[600px] mx-auto">
        <CardContent>
          <LoginFormWrapper />
        </CardContent>
      </Card>
    </div>
  )
}
