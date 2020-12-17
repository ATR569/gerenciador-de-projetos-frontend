import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik';
import * as yup from 'yup';
import { URI } from '../../config/config'

const schema = yup.object({
    nome: yup.string().required(),
    senha: yup.string().required(),
    confirmacaoSenha: yup.string().required().oneOf([yup.ref('senha'), null], 'Confirmação de senha inválida'),    
    areaAtuacao: yup.string().required(),
    formacao: yup.string().required(),
})

const initialValues = {
    nome: '',
    senha: '',
    confirmacaoSenha: '',
    areaAtuacao: '',
    formacao: '',
}

const baseUrl = 'api/professores'

const CadastroForm = () => {

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
            alert(`O professor(a) ${data.nome} de matricula ${resp.data.matricula} foi cadastrado(a) com sucesso`)
        }).catch(err => {
            const erro = err.response.data
            alert(`ERRO ${erro.status}: ${erro.descricao}`)
        })
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

                                <Form.Group as={Col} md="12" controlId="inputAreaAtuacao">
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

                                <Form.Group as={Col} md="12" controlId="inputFormacao">
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

                                <Form.Group as={Col} md="3">
                                    <Button className="" type="submit">Salvar</Button>
                                </Form.Group>

                            </FormGroup>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default CadastroForm