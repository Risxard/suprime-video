import React from "react";
import { User, KeyRound, Mail, UserCheck, ArrowLeftCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./style.css";

const createUserFormSchema = z
  .object({
    name: z.string().min(3, "O nome precisa de no mínimo 3 caracteres"),
    email: z
      .string()
      .email("Formato de e-mail inválido")
      .min(6, "O email precisa de no mínimo 6 caracteres"),
    userId: z
      .string()
      .min(6, "O usuário precisa de ter no mínimo 6 caracteres"),
    password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

const DeleteAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  return (
    <form onSubmit={() => console.log("Pressed!")} className="settings-content">
      <h2>Delete my account</h2>

      <div className="reg-box">
        <label htmlFor="password">
          <KeyRound className="inputIcons" />
        </label>
        <input
          name="password"
          id="password"
          className="name-input"
          type="password"
          {...register("password")}
          placeholder="Your password"
          required
        />
      </div>
      {errors.password && (
        <p className="error-message">{errors.password.message}</p>
      )}

      <div className="reg-box">
        <label htmlFor="userName">
          <User className="inputIcons" />
        </label>
        <input
          name="userName"
          id="userName"
          className="name-input"
          type="userName"
          {...register("userId")}
          placeholder="Your username"
          required
        />
      </div>
      <span className="accept">
        <input type="checkbox" name="Accept" required/>
        <label htmlFor="Accept">Eu aceito os termos.</label>
      </span>

      <div className="reg-btns-container">
        <button
          className="reg-btn"
          type="submit"
          style={{ backgroundColor: "red" }}
        >
          <p>Delete my account</p>
        </button>
      </div>
    </form>
  );
};

export default DeleteAccount;
