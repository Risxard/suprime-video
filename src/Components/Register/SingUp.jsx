import React, { useState } from "react";
import "./SingIn.css";

import { User, KeyRound, Mail, UserCheck, ArrowLeftCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z.string().min(3, "O nome precisa de no mínimo 3 caracteres"),
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .min(6, "O email precisa de no mínimo 6 caracteres"),
  userId: z.string().min(6, "O usuário precisa de ter no mínimo 6 caracteres"),
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
)


function SingUp({ isSingUp }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  const handleSingUp = () => {
    isSingUp(false);
  };

  function createUser(data) {
    const newUser = {
      name: data.name,
      id: data.userId,
      email: data.email,
      password: data.password,
      userToken: generateUserToken(),
      lang: 'en-US',
    };

    function generateUserToken() {
      return Math.random().toString(36).substr(2, 10);
    }

    function saveUserToDB(user) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }

    saveUserToDB(newUser);
    handleSingUp();
  }

  return (
    <form onSubmit={handleSubmit(createUser)} className="Register-Container">
      <ArrowLeftCircle onClick={handleSingUp} className="returnBtn" />

      <div className="reg-box">
        <User className="inputIcons" />
        <input
          id="user-name"
          className="name-input"
          type="text"
          placeholder="Your name"
          {...register("name")}
        />
      </div>
      {errors.name && <p className="error-message">{errors.name.message}</p>}
      <div className="reg-box">
        <UserCheck className="inputIcons" />
        <input
          id="user-id"
          className="name-input"
          type="text"
          placeholder="User login"
          {...register("userId")}
        />
      </div>
      {errors.userId && (
        <p className="error-message">{errors.userId.message}</p>
      )}
      <div className="reg-box">
        <label htmlFor="">
          <Mail className="inputIcons" />
        </label>
        <input
          id="user-email"
          className="name-input"
          placeholder="Your email"
          {...register("email")}
        />
      </div>
      {errors.email && <p className="error-message">{errors.email.message}</p>}
      <div className="reg-box">
        <label htmlFor="">
          <KeyRound className="inputIcons" />
        </label>
        <input
          id="user-password"
          className="name-input"
          type="password"
          {...register("password")}
          placeholder="Password"
        />
      </div>
      {errors.password && (
        <p className="error-message">{errors.password.message}</p>
      )}

      <div className="reg-box">
        <label htmlFor="">
          <KeyRound className="inputIcons" />
        </label>
        <input
          id="user-password-confirm"
          className="name-input"
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm your Password"
        />
      </div>
      {errors.confirmPassword && (
        <p className="error-message">{errors.confirmPassword.message}</p>
      )}

      <div className="reg-btns-container">
        <button
          className="reg-btn"
          id="singUpBtn"
          type="submit"
          style={{ backgroundColor: "#1884F7" }}
        >
          <p>Sing up</p>
        </button>
      </div>
    </form>
  );
}

export default SingUp;
