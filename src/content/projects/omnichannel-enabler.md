---
title: "Omnichannel Enabler Platform"
description: "Nền tảng hợp nhất đơn hàng đa kênh bán lẻ, xây dựng từ con số 0 với kiến trúc micro-service, giảm 60–70% thời gian triển khai cho khách hàng mới."
pubDate: 2023-04-01
updatedDate: 2023-12-01
tech: ["Golang", "Gin", "PostgreSQL", "Redis", "Elasticsearch", "Redis Stream", "Vue.js", "Tailwind CSS"]
featured: true
categories: ["Ecommerce", "Infrastructure"]
tags: ["omnichannel", "self-service", "database-design", "backend"]
status: published
liveUrl: ""
repoUrl: ""
image: "/project-placeholder-1.jpg"
---

## Tình huống (Situation)

Doanh nghiệp cần một nền tảng duy nhất để hợp nhất đơn hàng từ đa kênh bán lẻ (online, offline, marketplace), thay vì vận hành rời rạc trên nhiều hệ thống khác nhau gây thất thoát đơn hàng và trùng lặp dữ liệu.

## Nhiệm vụ (Task)

Xây dựng từ con số 0 nền tảng self-service cho phép khách hàng tự triển khai chiến lược bán hàng đa kênh, bao gồm: OAuth2/SSO, điều phối đơn hàng đa kênh (O3), CRM, IMS (hoàn tất đơn & quản lý kho vận).

## Hành động (Action)

- Thiết kế database từ đầu phục vụ đa module, tối ưu cho tự động hóa và self-service.
- Tiếp cận, phân tích cơ sở dữ liệu legacy của khách hàng, thực hiện đồng bộ và tập trung dữ liệu bằng Redis Stream, Golang, Redis, Elasticsearch, PostgreSQL.
- Đảm bảo hiệu suất và độ ổn định cao cho hệ thống xử lý luồng đơn hàng đa kênh thời gian thực.

## Kết quả (Result)

- Tập trung hóa toàn bộ luồng đơn hàng đa kênh, loại bỏ thất thoát do hệ thống rời rạc.
- Nền tảng self-service giảm **60–70% thời gian triển khai** cho khách hàng mới.
- Hệ thống đạt hiệu suất cao, phản hồi nhanh, ổn định trong peak season.
