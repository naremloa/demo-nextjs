'use client'

import type { FormHTMLAttributes, PropsWithChildren } from 'react'
import type { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues, UseFormProps as HookUseFormProps, Resolver, UseFormReturn, UseFormStateReturn } from 'react-hook-form'
import type { Simplify } from 'type-fest'
import type { TypeOf, ZodSchema } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shadcn/components/ui/form'
import { useForm, useFormContext } from 'react-hook-form'

type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = Simplify<
  Pick<HookUseFormProps<TFieldValues, TContext, TTransformedValues>, 'defaultValues'>
  & { resolver: Resolver<TFieldValues, TContext, TTransformedValues> }
>

type FormWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> = Simplify<PropsWithChildren<
  UseFormProps<TFieldValues, TContext, TTransformedValues>
  & Omit<FormHTMLAttributes<HTMLFormElement>, keyof UseFormReturn | 'onSubmit'>
  & { onSubmit?: (data: TypeOf<ZodSchema<TTransformedValues, any, TFieldValues>>) => unknown }
>>

type ExtractFieldValuesFromResolver<TResolver extends Resolver> = TResolver extends Resolver<infer Input> ? Input : never
/**
 * Provides a strongly typed form context and renders a form using `react-hook-form` with schema validation and UI integration.
 *
 * Wraps children with a form context provider and a native HTML form element, handling form state and validation via the supplied resolver. Optionally invokes a typed `onSubmit` callback with validated form data.
 *
 * @param children - React nodes to render inside the form.
 * @param resolver - Validation resolver, typically from Zod or Yup.
 * @param defaultValues - Initial values for the form fields.
 * @param onSubmit - Optional callback invoked with validated form data on successful submission.
 */

export function FormWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  children,
  resolver,
  defaultValues,
  onSubmit,
  ...formProps
}: FormWrapperProps<TFieldValues, TContext, TTransformedValues>) {
  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    resolver,
    defaultValues,
  })
  return (
    <Form {...form}>
      <form {...formProps} onSubmit={onSubmit && form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </Form>
  )
}

/**
 * Renders a controlled form field within a form context, including label, input control, and validation message.
 *
 * @param label - Optional label to display above the form field.
 * @param name - The field name or path within the form values.
 * @param controlRender - A render function that receives field props, field state, and form state, and returns the input element.
 */
export function FormFieldWrapper<
  TResolver extends Resolver<any>,
  TFieldValues extends FieldValues = ExtractFieldValuesFromResolver<TResolver>,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: {
  label?: string
  name: TName
  controlRender: ({ field, fieldState, formState }: {
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => React.ReactElement
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
