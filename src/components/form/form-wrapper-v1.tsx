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
// type ExtractTransformedValuesFromResolver<TResolver extends Resolver> = TResolver extends Resolver<any, any, infer Output> ? Output : never

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
