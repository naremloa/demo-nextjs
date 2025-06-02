'use client'

import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormFieldWrapper, FormWrapper } from '@/components/form/form-wrapper-v2'
import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string(),
})

/**
 * Renders a login form with username and password fields, using react-hook-form and Zod schema validation.
 *
 * The form validates input according to the defined schema and logs submitted data to the console.
 */
export function LoginFormWrapper() {
  const resolver = zodResolver(formSchema)
  const form = useForm({
    resolver,
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('submit', data)
  }

  return (
    <FormWrapper
      {...form}
      className="space-y-8"
      onSubmit={onSubmit}
    >
      {control => (
        <>
          <FormFieldWrapper
            control={control}
            name="username"
            label="Username"
            controlRender={({ field }) => (
              <Input placeholder="input your name" {...field} />
            )}
          >
          </FormFieldWrapper>
          <FormFieldWrapper
            control={control}
            name="password"
            label="Password"
            controlRender={({ field }) => (
              <Input {...field} />
            )}
          >
          </FormFieldWrapper>
          <Button type="submit">Submit</Button>
        </>
      )}
    </FormWrapper>
  )
}
