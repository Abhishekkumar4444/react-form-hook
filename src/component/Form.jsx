import React, { useRef } from "react"
import "./form.css"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const Form = () => {
  const schema = yup
    .object()
    .shape({
      fullName: yup.string().required("fullname is required"),
      email: yup.string().email().required(),
      age: yup.number().positive().integer().min(18).required(),
      password: yup.string().min(4).max(20).required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null, "password dont match"])
        .required(),
    })
    .required()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="fullName"
          placeholder="fullName"
          {...register("fullName")}
          autoComplete="true"
        />
        <span> {errors.fullName?.message}</span>

        <input
          type="email"
          name="email"
          placeholder="email"
          {...register("email")}
          autoComplete="true"
        />
        <span> {errors.email?.message}</span>
        <input
          type="number"
          name="age"
          placeholder="Age"
          {...register("age")}
          autoComplete="true"
        />
        <span> {errors.age?.message}</span>
        <input
          type="password"
          name="password"
          placeholder="password"
          {...register("password")}
          autoComplete="true"
        />
        <span> {errors.password?.message}</span>
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          {...register("confirmPassword")}
          autoComplete="true"
        />
        <span> {errors.confirmPassword?.message}</span>
        <input type="submit" name="submit" id="submit" />
      </form>
    </div>
  )
}

export default Form
