import React from 'react'
import Joi from 'joi'
import globalStyles from 'styles.module.css'
import { Button, Form } from 'semantic-ui-react'

export interface MyFormProps<T> {
  state: [T, React.Dispatch<React.SetStateAction<T>>]
  onSubmit: () => Promise<any>
  validator?: {}
  children?: (props: RenderProps) => JSX.Element
  clearOnSubmit?: boolean
}

export interface InputProps {
  value?: string | Joi.StringSchema
  name: string
  placeholder?: string
  type?: string
  label: string
}

export interface RenderProps {
  myInput: (input: InputProps) => JSX.Element
  myButton: () => JSX.Element
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

  const onValidate = () => {
    const schema = Joi.object(props.validator).options({ abortEarly: false })

    const { error } = schema.validate(data)

    if (!error) return null

    const _errors: any = {}

    error.details.forEach((item) => (_errors[item.path[0]] = item.message))

    return _errors
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const hasErrors = onValidate()

    setIsDisable(true)

    if (hasErrors) {
      setErrors(hasErrors)
      setIsDisable(false)
      return
    }

    props
      .onSubmit()
      .then(() => {
        setErrors({})
        if (props.clearOnSubmit) setData({} as T)
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
      <Button fluid disabled={isDisable} color='black' type='submit'>
        {isDisable ? 'Submiting...' : 'Submit'}
      </Button>
    )
  }

  return (
    <Form onSubmit={onSubmit} className={globalStyles.formContainer}>
      {props.children?.call(null, { myInput, myButton } as RenderProps)}
    </Form>
  )
}

export default MyForm
