import { Modal, Input, Form, Select, InputNumber } from 'antd'

export const NewUserModal = ({title, open, onCancel, client, cargoControl, onOk }) => {
    return(
        <Modal title={title} open={open} onCancel={onCancel} onOk={onOk} destroyOnClose>
                <Form>
                    <Form.Item name="userId">
                        <Input placeholder="Cedula"></Input>
                    </Form.Item>
                    <Form.Item name="userName">
                        <Input placeholder="Nombre"></Input>
                    </Form.Item>
                    <Form.Item name="userAddress">
                        <Input placeholder="Direccion"></Input>
                    </Form.Item>
                    <Form.Item name="userPhone">
                        <Input placeholder="Telefono"></Input>
                    </Form.Item>
                    { !client && 
                    <>
                        <Form.Item name="userEmail" rules={[{type: "email", message: 'Por favor ingrese un correo valido'}]}>
                            <Input placeholder="Correo electronico"></Input>
                        </Form.Item>
                        <Form.Item name="userPassword">
                            <Input.Password placeholder="Contraseña" disabled={client}></Input.Password>
                        </Form.Item>
                        <Form.Item label='Cargo'>
                            <Select
                            disabled={client}
                            defaultValue={'Empleado'}
                            onChange={(e) => cargoControl(e)}
                            options={[
                                {value: 0, label: 'Empleado'},
                                {value: 1, label: 'Gerente'}
                            ]}
                            />
                        </Form.Item>
                    </>
                    }
                </Form>
            </Modal>
    )
}

export const EditUserModal = ({title, open, onCancel, cargoControlEdited, onOk, info, client }) => {
    return(
        <Modal title={title} open={open} onCancel={onCancel} onOk={onOk} destroyOnClose>
                <Form>
                    <Form.Item name="editId">
                        <Input placeholder="Cedula" defaultValue={info.id} disabled={true}></Input>
                    </Form.Item>
                    <Form.Item name="editName">
                        <Input placeholder="Nombre" defaultValue={info.name} disabled={true}></Input>
                    </Form.Item>
                    <Form.Item name="editEmail" rules={[{type: "email", message: 'Por favor ingrese un correo valido'}]}>
                        <Input placeholder="Correo electronico" defaultValue={info.email}></Input>
                    </Form.Item>
                    <Form.Item name="editAddress">
                        <Input placeholder="Direccion" defaultValue={info.address}></Input>
                    </Form.Item>
                    <Form.Item name="editPhone">
                        <Input placeholder="Telefono" defaultValue={info.phone}></Input>
                    </Form.Item>
                    { !client && 
                        <Form.Item label='Cargo'>
                        <Select
                        disabled={client}
                        defaultValue={info.type}
                        onChange={(e) => cargoControlEdited(e)}
                        options={[
                            {value: 0, label: 'Empleado'},
                            {value: 1, label: 'Gerente'}
                        ]}
                        />
                    </Form.Item>
                    }
                </Form>
            </Modal>
    )
}

export const DeleteModal = ({onOk, onCancel, open}) => {
    return(
        <Modal title='Seguro de que desea eliminar este elemento?' onOk={onOk} onCancel={onCancel} open={open} destroyOnClose>

        </Modal>
    )
}

export const NewAdminModal = ({onOk, onCancel, open}) => {
    return(
        <Modal title='Registrar un nuevo administrador' onCancel={onCancel} open={open} onOk={onOk} destroyOnClose>
            <Form >
                <Form.Item name='adminId' required={true}>
                    <InputNumber placeholder='Cedula' style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item name='adminName' required={true}>
                    <Input placeholder='Nombre'/>
                </Form.Item>
                <Form.Item name='adminAddress' required={true}>
                    <Input placeholder='Direccion'/>
                </Form.Item>
                <Form.Item name='adminPhone' required={true}>
                    <InputNumber placeholder='Telefono' style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item name='adminEmail' required={true}>
                    <Input placeholder='Correo'/>
                </Form.Item>
                <Form.Item name='adminPassword' required={true}>
                    <Input.Password placeholder='Contraseña'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}