import * as Yup from "yup";
import getValidationErrors from "./getErrors";


export async function validLogin(email: string, password: string) {
    const schema = Yup.object().shape({
        email: Yup.string().email("Digite um E-mail válido").required('Email é obrigatório'),
        password: Yup.string().required("Senha é obrigatória"),
    });

    try {
        const data = { email, password };
        await schema.validate(data, {
            abortEarly: false,
        });

        return true
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return getValidationErrors(error);
      }
        return false
    }
}

export async function addUserAndEdit(name: string, last_name: string, avatar: string) {
    const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        last_name: Yup.string().required('Sobrenome é obrigatório'),
        avatar: Yup.string().required("Avatar é obrigatório")
    });

    try {
        const data = { name, last_name, avatar };
        await schema.validate(data, {
            abortEarly: false,
        });

        return true
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return getValidationErrors(error);
      }
        return false
    }
}