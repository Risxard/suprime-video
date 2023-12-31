import React from "react";
import { User, KeyRound, Mail, UserCheck, ArrowLeftCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./style.css";



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


const SettingsSection = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });



  return (
    <form onSubmit={()=> console.log('Pressed!')} className="settings-content">
      <h2>Settings</h2>
      <span className="formater">
        <label htmlFor="language">Language</label>

        <select name="Language" id="language">
          <option value="volvo">Portuguese ( Brazil )</option>
          <option value="saab">English ( UNITED STATES)</option>
        </select>
      </span>

      <div className="reg-btns-container">
        <button
          className="reg-btn"
          type="submit"
        >
          <p>Apply</p>
        </button>
      </div>
    </form>
  );
};

export default SettingsSection;