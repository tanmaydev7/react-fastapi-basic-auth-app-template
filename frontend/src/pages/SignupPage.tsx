import { AuthLayout } from "@/components/layout/AuthLayout"
import { SignupForm } from "@/components/auth/SignupForm"
import { TextLink } from "@/components/ui/text-link"

function SignupPage() {
  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your Fold"
      subtitle="Free to start. Invite your team when the first page is ready."
      footer={
        <>
          Already have an account?{" "}
          <TextLink to="/login" className="text-sm">
            Log in
          </TextLink>
        </>
      }
    >
      <SignupForm />
    </AuthLayout>
  )
}

export { SignupPage }
