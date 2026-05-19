import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { name, email, country, destination, dates, duration, budget, travelers, travelStyle, interests, wishes } = data;

  if (!name || !email || !destination) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // --- OpenAI ---
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "";

  if (!openaiApiKey || !resendApiKey) {
    return NextResponse.json({ error: "API keys not configured" }, { status: 500 });
  }

  const prompt = `Ты — эксперт по осознанным путешествиям. Создай детальный персональный план путешествия.

Путешественник: ${name} из ${country}
Направление: ${destination}
Даты: ${dates || "гибко"}
Длительность: ${duration || "не указана"}
Бюджет на человека: ${budget}
Количество путешественников: ${travelers}
Стиль путешествия: ${travelStyle || "не указан"}
Интересы: ${interests || "не указаны"}
Особые пожелания: ${wishes || "нет"}

Создай подробный план путешествия в формате HTML для email. Включи:
1. Вступление и философию маршрута (2-3 предложения, почему этот маршрут подходит именно этому человеку)
2. Маршрут по дням (если длительность указана) или по ключевым локациям
3. Рекомендации по жилью (тип, районы, атмосфера — без конкретных названий)
4. Гастрономические рекомендации
5. Практические советы (транспорт, время года, что взять)
6. Секретные места и нестандартные активности
7. Бюджетное распределение

Стиль: тёплый, интеллигентный, вдохновляющий. Не туристический буклет, а совет близкого друга.
Формат: чистый HTML без <html><head><body> тегов. Используй заголовки h2/h3, параграфы p, списки ul/li.`;

  let planHtml = "";

  try {
    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 3000,
        temperature: 0.8,
      }),
    });

    if (!aiRes.ok) {
      const errBody = await aiRes.text();
      console.error("OpenAI error:", aiRes.status, errBody);
      throw new Error(`OpenAI error ${aiRes.status}: ${errBody}`);
    }
    const aiData = await aiRes.json();
    planHtml = aiData.choices[0].message.content;
  } catch (err) {
    console.error("Generate plan error:", err);
    return NextResponse.json({ error: "Failed to generate plan", detail: String(err) }, { status: 500 });
  }

  // --- Resend ---
  const emailHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Georgia, serif; color: #2C1F14; background: #F5F0EB; margin: 0; padding: 0; }
  .container { max-width: 640px; margin: 0 auto; background: #FFFFFF; }
  .header { background: #0F0A07; padding: 48px 40px; text-align: center; }
  .header h1 { color: white; font-size: 28px; font-weight: 300; margin: 0; letter-spacing: 4px; text-transform: uppercase; }
  .header p { color: rgba(255,255,255,0.5); font-size: 13px; margin: 8px 0 0; letter-spacing: 2px; }
  .accent { width: 40px; height: 1px; background: #C4714A; margin: 20px auto; }
  .content { padding: 48px 40px; }
  .greeting { font-size: 18px; color: #6B5B4E; margin-bottom: 32px; }
  .content h2 { font-size: 22px; font-weight: 400; color: #2C1F14; margin-top: 32px; border-left: 2px solid #C4714A; padding-left: 12px; }
  .content h3 { font-size: 16px; font-weight: 300; color: #2C1F14; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px; }
  .content p { font-size: 15px; line-height: 1.8; color: #4A3828; }
  .content ul { padding-left: 20px; }
  .content li { font-size: 15px; line-height: 1.8; color: #4A3828; margin-bottom: 4px; }
  .footer { background: #0F0A07; padding: 32px 40px; text-align: center; }
  .footer p { color: rgba(255,255,255,0.3); font-size: 12px; margin: 0; letter-spacing: 1px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Своим ходом</h1>
      <div class="accent"></div>
      <p>Ваш персональный маршрут</p>
    </div>
    <div class="content">
      <p class="greeting">Дорогой ${name},</p>
      <p>Мы создали маршрут специально для вас — с учётом ваших пожеланий, ритма и того, что важно для вашей души.</p>
      ${planHtml}
    </div>
    <div class="footer">
      <p>© Своим ходом AI Travel · Осознанные путешествия</p>
    </div>
  </div>
</body>
</html>`;

  // Email пользователю с планом
  try {
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Своим ходом Travel <onboarding@resend.dev>",
        to: [email],
        subject: `Ваш персональный маршрут в ${destination} — Своим ходом`,
        html: emailHtml,
      }),
    });

    if (!sendRes.ok) throw new Error("Resend error");
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // Уведомление админу с контактами лида
  if (adminEmail) {
    const adminHtml = `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; color: #2C1F14; background: #f9f9f9; margin: 0; padding: 20px; }
  .card { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 32px; border: 1px solid #e0d8cc; }
  h2 { font-size: 18px; margin: 0 0 24px; color: #0F0A07; font-weight: 400; border-bottom: 1px solid #e0d8cc; padding-bottom: 12px; }
  .row { display: flex; margin-bottom: 12px; font-size: 14px; }
  .label { width: 160px; flex-shrink: 0; color: #8B7355; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; padding-top: 2px; }
  .value { color: #2C1F14; }
  .highlight { background: #F5F0EB; border-left: 3px solid #C4714A; padding: 12px 16px; margin-top: 20px; border-radius: 0 4px 4px 0; font-size: 14px; }
</style>
</head>
<body>
<div class="card">
  <h2>Новая заявка — Своим ходом</h2>
  <div class="row"><div class="label">Имя</div><div class="value">${name}</div></div>
  <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
  <div class="row"><div class="label">Страна</div><div class="value">${country}</div></div>
  <div class="row"><div class="label">Направление</div><div class="value">${destination}</div></div>
  <div class="row"><div class="label">Даты</div><div class="value">${dates || "не указано"}</div></div>
  <div class="row"><div class="label">Длительность</div><div class="value">${duration || "не указано"}</div></div>
  <div class="row"><div class="label">Бюджет</div><div class="value">${budget}</div></div>
  <div class="row"><div class="label">Путешественники</div><div class="value">${travelers}</div></div>
  <div class="row"><div class="label">Стиль</div><div class="value">${travelStyle || "не указан"}</div></div>
  <div class="row"><div class="label">Интересы</div><div class="value">${interests || "не указаны"}</div></div>
  ${wishes ? `<div class="highlight"><strong>Пожелания:</strong> ${wishes}</div>` : ""}
</div>
</body>
</html>`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Своим ходом Travel <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `Новая заявка: ${name} → ${destination}`,
        html: adminHtml,
      }),
    });
  }

  return NextResponse.json({ success: true });
}
