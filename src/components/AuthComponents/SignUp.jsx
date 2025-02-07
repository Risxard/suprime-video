import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router-dom";
import { KeyRound, Mail, User } from "lucide-react";
import createNewAccount from "../../services/firebase/registerAccount";

const createUserFormSchema = z
  .object({
    name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres"),
    email: z
      .string()
      .email("Formato de e-mail inválido")
      .min(6, "O e-mail precisa ter no mínimo 6 caracteres"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "As senhas precisam ser iguais!",
    path: ["confirmPassword"],
  });


  
function SignUp() {
  const [loading, setLoading] = useState(false);
  const {

    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });


  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await createNewAccount(data);
      setLoading(false); 

      window.location.href = "/preview/suprime-video/home";
    } catch (error) {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Register-Container">
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
          id="signUpBtn"
          type="submit"
          style={{ backgroundColor: loading ? "#ccc" : "#1884F7" }}
          disabled={loading}
        >
          <p>{loading ? "Cadastrando..." : "Cadastrar"}</p>
        </button>
      </div>

      <span className="newTo">
        <p>Já tem uma conta?</p>
        <Link to={"/"}>
          <strong>Entrar agora</strong>
        </Link>
      </span>
    </form>
  );
}

export default SignUp;
