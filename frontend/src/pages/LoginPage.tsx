import { AuthLayout } from "@/components/layout/AuthLayout"
import { LoginForm } from "@/components/auth/LoginForm"
import { TextLink } from "@/components/ui/text-link"

function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to Fold"
      subtitle="Pick up your project hubs, briefs, and team pages."
      footer={
        <>
          New here?{" "}
          <TextLink to="/signup" className="text-sm">
            Create an account
          </TextLink>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}

export { LoginPage }
