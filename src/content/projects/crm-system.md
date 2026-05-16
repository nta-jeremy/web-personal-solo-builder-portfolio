---
title: "Hệ thống quản lý quan hệ khách hàng (CRM)"
description: "CRM từ con số 0 với kiến trúc micro-service + hexagonal, tăng 5x tốc độ triển khai khuyến mãi, loại bỏ silo dữ liệu."
pubDate: 2022-09-01
updatedDate: 2022-12-01
tech: ["Vue.js", "Golang", "PostgreSQL", "Apache Kafka", "Redis", "Elasticsearch"]
featured: true
categories: ["CRM", "Web App"]
tags: ["microservice", "hexagonal", "elasticsearch", "backend"]
status: published
liveUrl: ""
repoUrl: ""
image: "/project-placeholder-1.jpg"
---

## Tình huống (Situation)

Công ty cần hệ thống CRM tập trung để quản lý thông tin khách hàng, khai báo coupon/khuyến mãi/voucher, và tạo báo cáo đa phòng ban — thay thế quy trình giấy tờ và Excel rời rạc.

## Nhiệm vụ (Task)

Xây dựng CRM từ con số 0 với kiến trúc micro-service, hexagonal, self-service; cho phép người dùng tự khai báo linh hoạt các điều kiện khuyến mãi mà không cần can thiệp từ dev.

## Hành động (Action)

- Thiết kế database và kiến trúc hệ thống theo mô hình micro-service + hexagonal.
- Đồng bộ sản phẩm từ các hệ thống khác bằng Apache Kafka, Golang, Redis, PostgreSQL.
- Thiết kế hệ thống điều kiện khuyến mãi dựa trên Elasticsearch query, cho phép người dùng tự khai báo linh hoạt theo tiêu chí: khách hàng thân thiết, chương trình khuyến mãi, thông tin khách hàng mong muốn.

## Kết quả (Result)

- Tập trung hóa dữ liệu khách hàng, loại bỏ silo dữ liệu giữa các phòng ban.
- Người dùng tự khai báo khuyến mãi trong **< 5 phút**, thay vì ticket chờ dev 2–3 ngày.
- Tăng tốc độ triển khai chương trình khuyến mãi lên **5x**.
