import { Space, Spin } from 'antd'
import React from 'react'

export default function Spinner() {
  return (
    <Space    style={{display:"flex ", justifyContent:"center",  justifyItems:"center"}} size="middle"> 
    <Spin size="large" />
  </Space>
  )
}
