# 🌍 Travel Advisor Web

Frontend web application cho hệ thống quản lý Admin và Local Service Provider của Travel Advisor.

## 🛠️ Công nghệ

- **React** 19.x - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** (sẽ cài sau) - Routing
- **TailwindCSS / MUI** (sẽ cài sau) - UI Framework

## 📦 Cài đặt

```bash
# Clone repository
git clone <repo-url>
cd travel-advisor-web

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

App sẽ chạy tại: **http://localhost:3000**

## 📁 Cấu trúc thư mục

```
src/
├── assets/          # Images, fonts, static files
├── components/      # Shared UI components
├── hooks/           # Custom React hooks
├── layouts/         # Layout components (AdminLayout, ProviderLayout)
├── pages/
│   ├── admin/      # Admin module pages
│   ├── provider/   # Provider module pages
│   └── auth/       # Authentication pages (login, register)
├── services/        # API calls & external services
└── utils/           # Helper functions & utilities
```

## 🎯 Modules

### Admin Module
- Quản lý users
- Quản lý destinations  
- Quản lý bookings
- System analytics
- Settings

### Provider Module
- Quản lý dịch vụ local
- Quản lý bookings từ khách hàng
- Revenue tracking
- Profile management

### Auth Module
- Login
- Register
- Forgot password
- Profile settings

## 🚀 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

## 🔗 Git Remote

Để push code lên GitHub:

```bash
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

---

**Built with ❤️ using React + TypeScript + Vite**
