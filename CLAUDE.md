# Своим ходом — AI Travel Planner

## Проект
Лендинг сервиса персональных AI-путешествий. Пользователь заполняет форму → GPT-4o генерирует план → Resend отправляет на email.

## Стек
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** — анимации hero
- **OpenAI GPT-4o** — генерация плана
- **Resend** — отправка email
- **Vercel** — деплой (не сделан)

## Запуск локально
```
npm run dev → http://localhost:3000
```

## Дизайн-система

### Цвета
| Роль | HEX |
|---|---|
| Фон hero / footer | `#0F0A07` |
| Фон основной | `#F5F0EB` |
| Фон about | `#E8E0D6` |
| Текст основной | `#2C1F14` |
| Текст вторичный | `#6B5B4E` |
| Акцент (терракот) | `#C4714A` |
| Разделители | `#D6CCB8` |

### Типографика (строго 4 размера)
- `text-7xl` — Hero заголовок
- `text-4xl` — Заголовки секций
- `text-xl` — Подзаголовки, карточки
- `text-sm` — Весь остальной текст

### Шрифты
- **Cormorant Garamond** (`font-heading`) — заголовки, всегда `font-light`
- **Inter** (`font-sans`) — тело, нормальный вес

### Правила стиля
- Никаких курсивов, жирных, medium — только `font-light` для heading, normal для body
- Максимум 4 размера шрифта на весь сайт
- Акцент `#C4714A` — не более 10% площади страницы
- Uppercase + letter-spacing для лейблов и кнопок

## Структура файлов
```
app/
  page.tsx                    сборка секций
  layout.tsx                  шрифты, метаданные
  globals.css                 CSS переменные, цвета
  api/generate-plan/
    route.ts                  GPT-4o + Resend логика
components/
  Navbar.tsx
  Hero.tsx
  HowItWorks.tsx
  Destinations.tsx
  About.tsx
  TravelForm.tsx              3-шаговая форма
  Footer.tsx
```

## API ключи (добавить в .env.local)
```
OPENAI_API_KEY=...
RESEND_API_KEY=...
ADMIN_EMAIL=...
```

## Форма — 3 шага
1. Имя, email, страна
2. Направление, даты, длительность, бюджет, количество человек
3. Стиль путешествия (теги), интересы, особые пожелания

## Статус
- [x] Лендинг полностью готов локально
- [x] API route написан (GPT + Resend)
- [ ] API ключи не добавлены — форма не работает
- [ ] Деплой на Vercel не сделан
- [ ] Домен не выбран

## Следующие шаги
1. Добавить OPENAI_API_KEY и RESEND_API_KEY в .env.local
2. Проверить полный flow локально
3. Зарегистрироваться на vercel.com (через GitHub)
4. Задеплоить: npx vercel --prod
