'use client'

import type { FormHTMLAttributes, ReactNode } from 'react'
import type { Control, ControllerProps, FieldPath, FieldValues, FormProviderProps, UseFormProps as HookUseFormProps, Resolver, UseFormReturn, UseFormStateReturn } from 'react-hook-form'
import type { Simplify } from 'type-fest'
import type { TypeOf, ZodSchema } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shadcn/components/ui/form'
import { useFormContext } from 'react-hook-form'

type FormWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = Simplify<
  Omit<
    FormProviderProps<TFieldValues, TContext, TTransformedValues>
    & FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'children' | 'form'
  >
  & {
    onSubmit?: (data: TypeOf<ZodSchema<TTransformedValues, any, TFieldValues>>) => unknown
    children: (control: Control<TFieldValues, TContext, TTransformedValues>) => ReactNode
  }
>

export function FormWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  children,
  onSubmit,
  ...formProps
}: FormWrapperProps<TFieldValues, TContext, TTransformedValues>) {
  return (
    <Form {...formProps}>
      <form {...formProps} onSubmit={onSubmit && formProps.handleSubmit(onSubmit)}>
        {children && children(formProps.control)}
      </form>
    </Form>
  )
}

export function FormFieldWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: {
  control: Control<TFieldValues, any, TTransformedValues>
  label?: string
  name: TName
  controlRender: ControllerProps<TFieldValues, TName, TTransformedValues>['render']
}) {
  const form = useFormContext<TFieldValues, any, TFieldValues>()
  return (
    <FormField<TFieldValues, TName>
      control={form.control}
      name={props.name}
      render={renderProps => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            {props.controlRender(renderProps)}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
