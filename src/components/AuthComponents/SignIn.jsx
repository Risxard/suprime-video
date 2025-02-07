import React, { useState } from "react";
import { User, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import "./styles.css";
import useLogin from "../../hooks/Auth/useLogin";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, loading, error } = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(25, "Password cannot exceed 25 characters")
      .nonempty("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSubmitting) return
    setIsSubmitting(true);

    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors?.[0],
        password: formattedErrors.password?._errors?.[0],
      });
    } else {
      setErrors({});
      await login(email, password);
    }

    setIsSubmitting(false);
  };


  return (
    <form className="Register-Container" onSubmit={handleSubmit}>
      <div className="reg-box">
        <User className="inputIcons" />
        <input
          className="name-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="reg-box">
        <KeyRound className="inputIcons" />
        <input
          className="name-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="reg-btns-container">
        <button type="submit" className="reg-btn">
          <p>{loading ? "Entrando..." : "Entrar"}</p>
        </button>
      </div>

      <span className="newTo">
        <p>Novo no vídeo Suprime?</p>
        <Link to="/register">
          <strong>Cadastre-se agora</strong>
        </Link>
      </span>
    </form>
  );
}

export default SignIn;
