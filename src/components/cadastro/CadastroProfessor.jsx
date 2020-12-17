import React from 'react'
import axios from 'axios'
import { Button, Form, FormLabel, FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik';
import * as yup from 'yup';

import CadastroAluno from './CadastroAluno'

const schema = yup.object({
    nome: yup.string().required(),
    senha: yup.string().required(),
    areaAtuacao: yup.string().required(),
    formacao: yup.string().required(),
})

const initialValues = {
    nome: '',
    senha: '',
    areaAtuacao: '',
    formacao: '',
}

const CadastroForm = () => {

    const handleSubmit = (data) => {
        console.log(data)
        alert(`Usuário cadastrado:
            Nome: ${data.nome}
            Senha: ${data.senha}
            Area: ${data.areaAtuacao}
            Formação: ${data.formacao}
        `)
    }

    return (
        <div className="professor-form formulario-cadastro">
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

                                <Form.Group as={Col} md="3" controlId="inputAreaAtuacao">
                                    <Form.Label>Área de Atuação *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a área de atuação"
                                        name="areaAtuacao"
                                        value={values.areaAtuacao}
                                        onChange={handleChange}
                                        isInvalid={!!errors.areaAtuacao}
                                        isValid={!!values.areaAtuacao && !errors.areaAtuacao}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Área de atuação é obrigatória
                                            </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="3" controlId="inputFormacao">
                                    <Form.Label>Formação *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a formação"
                                        name="formacao"
                                        value={values.formacao}
                                        onChange={handleChange}
                                        isInvalid={!!errors.formacao}
                                        isValid={!!values.formacao && !errors.formacao}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Formação é obrigatória
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

export default CadastroForm