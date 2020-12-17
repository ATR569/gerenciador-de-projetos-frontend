import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik';
import * as yup from 'yup';
import { URI } from '../../config/config'

const schema = yup.object({
    nome: yup.string().required(),
    curso: yup.string().required(),
    senha: yup.string().required(),
    confirmacaoSenha: yup.string().required().oneOf([yup.ref('senha'), null], 'Confirmação de senha inválida'),
})

const initialValues = {
    nome: '',
    senha: '',
    confirmacaoSenha: '',
    curso: '',
}

const baseUrl = 'api/alunos'

const CadastroAluno = () => {

    const handleSubmit = (data) => {
        axios({
            method: 'POST',
            url: `${URI}/${baseUrl}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }).then(resp => {
            console.log("RESP: ", resp);
            alert(`O Aluno(a) ${data.nome} de matricula ${resp.data.matricula} foi cadastrado(a) com sucesso`)
            window.location.reload()
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
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
                        <Form noValidate onSubmit={handleSubmit} className="form-cadastro" autoComplete="off">
                            <FormGroup className="dadosAluno group">
                                <Form.Group as={Col} md="12" controlId="inputNome">
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

                                <Form.Group as={Col} md="12" controlId="inputCurso">
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

                                <Form.Row as={Col} md="12">
                                    <Form.Group as={Col} md="6" controlId="inputSenha">
                                        <Form.Label>Senha *</Form.Label>
                                        <Form.Control
                                            type="password"
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

                                    <Form.Group as={Col} md="6" controlId="inputConfirmacao">
                                        <Form.Label>Confirmação de Senha *</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Informe a Confirmação"
                                            name="confirmacaoSenha"
                                            value={values.confirmacaoSenha}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmacaoSenha}
                                            isValid={!!values.confirmacaoSenha && !errors.confirmacaoSenha}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Confirmação de Senha é inválida
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <hr />

                                <div>
                                    <button className="btn btn-primary" type="submit">Salvar</button>
                                    <button className="btn btn-secondary ml-2" onClick={e => window.location.reload()}>Cancelar</button>
                                </div>

                            </FormGroup>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default CadastroAluno