import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd'

const renderColumns = (handleOkeDelete, handleClickEdit) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Loại Sản Phẩm',
    dataIndex: 'category_name',
    key: 'category_name',
  },

  {
    title: 'Chức nămg',
    key: 'role',
    render: (_, category) => (<>
      <Button onClick={() => handleClickEdit(category)}>Edit</Button>
      <Popconfirm
        title="Delete category"
        description="Are you sure to delete this task?"
        onConfirm={() => handleOkeDelete(category.id)}
        onCancel={() => { }}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ marginLeft: 10 }} danger>Delete</Button>
      </Popconfirm>
    </>)
  },
];
export default function AdminCategory() {
  const [category, setCategory] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState()
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
    setCategoryUpdate()
  };

  const onFinish = async (values) => {
    const check = category.find(item => item.category_name === values.category_name)
    if (check) {
      message.error('Tên sản phẩm đã tồn tại')
    } else {
      if (categoryUpdate) {
        await axios.patch(`http://localhost:7500/category/${categoryUpdate.id}`, values)
      } else {
        await axios.post("http://localhost:7500/category", values)
      }
      form.resetFields()
      await getCategories()
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getCategories = async () => {
    let res = await axios.get("http://localhost:7500/category")
    setCategory(res.data)
  }
  useEffect(() => {
    getCategories();
  }, [])

  const handleOkeDelete = async (id) => {
    const result = await axios.delete(`http://localhost:7500/category/${id}`)
    if (result.status == 200) {
      message.success("Xoá thành công")
      getCategories()
    } else {
      message.error("Xoá thất bại")
    }
  }
  const handleClickEdit = (category) => {
    console.log(category);
    form.setFieldsValue({
      ...category
    })
    setCategoryUpdate(category)
    setIsModalOpen(true)
  }


  return (
    <div>
      {
        isModalOpen &&
        <Modal
          maskClosable={false}
          width={800}
          title="Info Product"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={<></>}
        >
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 21,
            }}
            style={{
              maxWidth: 800,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Thêm Loại Sản Phẩm"
              name="category_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your category!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 12,
              }}
            >
              <Button type="primary" htmlType="onclick">
                {categoryUpdate ? "Edit" : "Add"}
              </Button>

            </Form.Item>
          </Form>
        </Modal>
      }
      <div className="col-12">
        <div className="page-title-box">
          <h4 className="page-title" style={{ fontSize: 50 }}>Phân Loại Sản Phẩm</h4>
        </div>

        <div>

          <Button style={{ minWidth: 100 }} onClick={showModal} >Add</Button>
        </div>
      </div>

      <Table dataSource={category} columns={renderColumns(handleOkeDelete, handleClickEdit)} />
    </div>
  )
}
