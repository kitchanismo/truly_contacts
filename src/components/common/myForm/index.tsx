import React, { useState } from 'react'
import Joi from 'joi'
import globalStyles from 'styles.module.css'
import { Button, Form } from 'semantic-ui-react'

export interface MyFormProps<T> {
  state: [data: T, setData: React.Dispatch<React.SetStateAction<T>>]
  schema: Object
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<any>
  children?: (props: RenderProps) => JSX.Element
}

export interface InputProps {
  value?: string
  name: string
  placeholder?: string
  type?: string
  label: string
}

export interface RenderProps {
  myInput?: (input: InputProps) => JSX.Element
  myButton?: () => JSX.Element
}

function MyForm<T>(props: MyFormProps<T>) {
  const [data, setData] = props.state

  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const [errors, setErrors] = React.useState<any>()

  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setData({
      ...data,
      [name]: value,
    })
  }

  const validate = () => {
    const _schema = Joi.object(props.schema).options({ abortEarly: false })
    const { error } = _schema.validate(data)

    console.log(error)

    if (!error) return null

    const _errors: any = {}

    error.details.forEach((item) => (_errors[item.path[0]] = item.message))

    return _errors
  }

  const doSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const hasError = validate()

    setIsDisable(true)

    if (hasError) {
      setErrors(hasError)
      setIsDisable(false)
      return
    }

    props.onSubmit
      ?.call(null, e)
      .then(() => {
        setErrors({})
        setData({} as T)
        setIsDisable(false)
      })
      .catch(() => setIsDisable(true))
  }

  const myInput = (input: InputProps) => {
    return (
      <Form.Field>
        <Form.Input
          type={input.type || 'text'}
          value={input.value || ''}
          onChange={doChange}
          name={input.name}
          placeholder={input.placeholder}
          label={input.label}
          error={
            errors &&
            errors[input.name] && {
              content: errors[input.name],
              pointing: 'above',
            }
          }
        />
      </Form.Field>
    )
  }

  const myButton = () => {
    return (
      <Button disabled={isDisable} color='black' type='submit'>
        {isDisable ? 'Submiting...' : 'Submit'}
      </Button>
    )
  }

  return (
    <Form onSubmit={doSubmit} className={globalStyles.formContainer}>
      {props.children?.call(null, { myInput, myButton } as RenderProps)}
    </Form>
  )
}

export default MyForm