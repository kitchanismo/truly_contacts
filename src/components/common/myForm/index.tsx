import React, { useState } from 'react'
import Joi from 'joi'
import globalStyles from 'styles.module.css'
import { Button, Form, FormProps } from 'semantic-ui-react'

export interface MyFormProps<T> {
  state: {
    data: T
    setData: React.Dispatch<React.SetStateAction<T>>
  }
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<any>
  children?: (props: RenderProps) => JSX.Element
}

export interface InputProps {
  value: string
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
  const { data, setData } = props.state
  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setData({
      ...data,
      [name]: value,
    })
  }

  const doSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDisable(true)
    props.onSubmit
      ?.call(null, e)
      .then(() => setIsDisable(false))
      .catch(() => setIsDisable(true))
  }

  const myInput = (input: InputProps) => {
    return (
      <Form.Field>
        <Form.Input
          type={input.type || 'text'}
          value={input.value}
          onChange={doChange}
          name={input.name}
          placeholder={input.placeholder}
          label={input.label}
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
