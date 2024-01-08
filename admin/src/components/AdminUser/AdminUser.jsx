import React, { useEffect, useState } from 'react'
import { Table, Button, } from 'antd'
import axios from 'axios';

const renderColumns = (handleChangeActive) => [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tên Người Dùng',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Trạng Thái',
        dataIndex: "active",
        key: 'active',
        render: (active) => (<><span>{active ? "Active" : "Ban"}</span></>)
    },
    {
        title: 'Tính năng',
        key: 'role',
        render: (_, user) => (<>
            <Button onClick={() => handleChangeActive(user)}>
                {user.active ? "Ban" : "Active"}
            </Button>
        </>)

    }
];
export default function AdminUser() {
    const [listUser, setListUser] = useState([])

    const getUser = async () => {
        const response = await axios.get("http://localhost:7500/users")
        setListUser(response.data)
    }

    const handleChangeActive = async (user) => {
        await axios.patch(`http://localhost:7500/users/${user.id}`, {active: !user.active})
        getUser()
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div>
            <div className="col-12">
                <div className="page-title-box">
                    <h4 className="page-title" style={{ fontSize: 50 }}>Quản lý người dùng</h4>
                </div>

            </div>
            <Table dataSource={listUser} columns={renderColumns(handleChangeActive)} />
        </div>
    )
}
