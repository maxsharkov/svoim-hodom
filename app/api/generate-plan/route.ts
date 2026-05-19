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
        bcc: adminEmail ? [adminEmail] : [],
        subject: `Ваш персональный маршрут в ${destination} — Своим ходом`,
        html: emailHtml,
      }),
    });

    if (!sendRes.ok) throw new Error("Resend error");
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
