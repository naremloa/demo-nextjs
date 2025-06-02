'use client'

import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormFieldWrapper, FormWrapper } from '@/components/form/form-wrapper-v1'
import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string(),
})

/**
 * Renders a login form with username and password fields, using Zod schema validation and react-hook-form integration.
 *
 * The form enforces a minimum length for the username and requires both fields. On submission, the entered data is logged to the console.
 */
export function LoginFormWrapper() {
  const resolver = zodResolver(formSchema)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('submit', data)
  }

  return (
    <FormWrapper
      className="space-y-8"
      resolver={resolver}
      defaultValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      <FormFieldWrapper<typeof resolver>
        name="username"
        label="Username"
        controlRender={({ field }) => (
          <Input placeholder="input your name" {...field} />
        )}
      >
      </FormFieldWrapper>
      <FormFieldWrapper<typeof resolver>
        name="password"
        label="Password"
        controlRender={({ field }) => (
          <Input {...field} />
        )}
      >
      </FormFieldWrapper>
      <Button type="submit">Submit</Button>
    </FormWrapper>
  )
}
