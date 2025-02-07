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

  
const SecuritySection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  return (
    <form onSubmit={() => console.log("Pressed!")} className="settings-content">
      <h2>Settings</h2>

      <div className="reg-box">
        <label htmlFor="old-password">
          <KeyRound className="inputIcons" />
        </label>
        <input
          name="old-password"
          id="old-password"
          className="name-input"
          type="password"
          {...register("oldPassword")}
          placeholder="Old password"
        />
      </div>

      <div className="reg-box">
        <label htmlFor="new-password">
          <KeyRound className="inputIcons" />
        </label>
        <input
          name="new-password"
          id="new-password"
          className="name-input"
          type="password"
          {...register("newPassword")}
          placeholder="New password"
        />
      </div>

      {errors.confirmPassword && (
        <p className="error-message">{errors.confirmPassword.message}</p>
      )}
      <div className="reg-box">
        <label htmlFor="new-password-confirm">
          <KeyRound className="inputIcons" />
        </label>
        <input
          name="new-password-confirm"
          id="new-password-confirm"
          className="name-input"
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm new password"
        />
      </div>

      <div className="reg-btns-container">
        <button className="reg-btn" type="submit">
          <p>Apply</p>
        </button>
      </div>
    </form>
  );
};

export default SecuritySection;
