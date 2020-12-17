import React from 'react'
import axios from 'axios'
import { Button, Form, FormLabel, FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    nome: yup.string().required(),
    curso: yup.string().required(),
    senha: yup.string().required(),
})

const initialValues = {
    nome: '',
    senha: '',
    curso: '',
}

const CadastroAluno = () => {

    const handleSubmit = (data) => {
        console.log(data)
        alert(`Usuário cadastrado:
            Nome: ${data.nome}
            Senha: ${data.senha}
            Curso: ${data.curso}
        `)
    }

    return (
        <div className="aluno-form formulario-cadastro">
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
            >{
                    ({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                        setFieldValue
                    }) => (
                        <Form noValidate onSubmit={handleSubmit} className="formulario">
                            <FormGroup className="dadosAluno group">
                                <Form.Group as={Col} md="6" controlId="inputNome">
                                    <Form.Label>Nome Completo *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o nome completo"
                                        name="nome"
                                        value={values.nome}
                                        isInvalid={!!errors.nome}
                                        isValid={!!values.nome && !errors.nome}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Nome é obrigatório
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" controlId="inputSenha">
                                    <Form.Label>Senha *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a Senha"
                                        name="senha"
                                        value={values.senha}
                                        onChange={handleChange}
                                        isInvalid={!!errors.senha}
                                        isValid={!!values.senha && !errors.senha}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Senha é obrigatória
                                            </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" controlId="inputCurso">
                                    <Form.Label>Curso *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o Curso"
                                        name="curso"
                                        value={values.curso}
                                        onChange={handleChange}
                                        isInvalid={!!errors.curso}
                                        isValid={!!values.curso && !errors.curso}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Curso é obrigatório
                                            </Form.Control.Feedback>
                                </Form.Group>
                            </FormGroup>
                            <Button type="submit">Salvar</Button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default CadastroAluno