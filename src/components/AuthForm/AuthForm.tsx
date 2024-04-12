import { useState } from "react"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

import GoogleIcon from "../../assets/Google.svg?react"
import api from "../../api"
import { API_HOST, GOOGLE_AUTH_ROUTE } from "../../constants"
import { useAppContext } from "../../hooks"

import s from "./AuthForm.module.css"

interface FormData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().min(3).max(32).required("Password is a required"),
})

type formActionType = "sign in" | "sign up" | null

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const [actionType, setActionType] = useState<formActionType>(null)

  const navigate = useNavigate()
  const { logIn } = useAppContext()

  const onSubmit = async (data: FormData) => {
    if (actionType === "sign in") {
      try {
        await logIn(data)
        navigate("/", { replace: true })
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message)
        }
      }
    } else if (actionType === "sign up") {
      try {
        await api.auth.register(data)
        toast.success("User registered successfully! Now you can login")
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message)
        }
      }
    }
  }

  const googleAuth = () => {
    const url = `${API_HOST}${GOOGLE_AUTH_ROUTE}`

    // const width = 1000
    // const height = 600

    // const left = (window.innerWidth - width) / 2
    // const top = (window.innerHeight - height) / 2

    // window.open(
    //   url,
    //   "_blank",
    //   `width=${width}, height=${height}, left=${left}, top=${top}`,
    // )

    window.open(url, "_self")
  }

  return (
    <div className={s.container}>
      <p className={s.textGoogle}>
        You can use you Google Account to authorize:
      </p>
      <button
        className={s.googleAuthButton}
        id='googleAuthButton'
        type='button'
        onClick={() => {
          document.getElementById("googleAuthButton")?.blur()
          googleAuth()
        }}
      >
        <GoogleIcon width={18} height={18} />
        Google
      </button>
      <p className={s.text}>Or login to our app using e-mail and password:</p>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={clsx(s.textInput, { [s.error]: errors.email })}
          type='email'
          placeholder='E-mail'
          {...register("email")}
        />
        <input
          className={clsx(s.textInput, { [s.error]: errors.password })}
          type='password'
          placeholder='Password'
          {...register("password")}
        />
        <div className={s.signButtonsContainer}>
          <button
            className={clsx(s.signButton, s.signInButton)}
            type='submit'
            onClick={() => setActionType("sign in")}
          >
            Sign in
          </button>
          <button
            className={clsx(s.signButton, s.signUpButton)}
            type='submit'
            onClick={() => setActionType("sign up")}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
