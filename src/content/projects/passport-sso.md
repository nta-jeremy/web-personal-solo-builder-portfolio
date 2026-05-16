---
title: "Passport (Hệ thống đăng nhập tập trung – SSO)"
description: "SSO từ đầu cho toàn bộ hệ thống nội bộ, giảm 80% ticket reset password, đăng nhập từ ~2 phút xuống < 10 giây."
pubDate: 2022-05-01
updatedDate: 2022-06-01
tech: ["Node.js", "React.js", "Amazon Cognito", "OAuth2", "JWT", "Redis", "PostgreSQL"]
featured: false
categories: ["Infrastructure", "Authentication"]
tags: ["sso", "rbac", "cognito", "security"]
status: published
liveUrl: ""
repoUrl: ""
image: "/project-placeholder-3.jpg"
---

## Tình huống (Situation)

Công ty vận hành nhiều hệ thống nội bộ riêng lẻ, mỗi hệ thống một tài khoản đăng nhập. Nhân viên phải nhớ nhiều password, IT mất thời gian reset password liên tục, bảo mật kém.

## Nhiệm vụ (Task)

Xây dựng hệ thống SSO từ đầu để quản lý đăng nhập một lần (single sign-on) cho toàn bộ hệ thống nội bộ, tích hợp login xã hội và quản lý người dùng tập trung.

## Hành động (Action)

- Xây dựng hệ thống SSO và quản lý phiên làm việc từ đầu.
- Tích hợp Amazon Cognito qua Google, Apple, Facebook để đăng nhập dễ dàng.
- Tích hợp Base.vn để đồng bộ người dùng từ Base sang Passport.
- Xây dựng hệ thống phân quyền RBAC, thêm/xóa/sửa và tìm kiếm người dùng.

## Kết quả (Result)

- Giảm **80% ticket yêu cầu reset password** cho IT.
- Thời gian đăng nhập vào hệ thống nội bộ giảm từ **~2 phút** xuống **< 10 giây**.
- Một tài khoản truy cập toàn bộ hệ thống, tăng bảo mật và trải nghiệm nhân viên.
