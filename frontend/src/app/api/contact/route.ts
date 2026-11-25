import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: "Por favor completa todos los campos obligatorios." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    // Quitamos espacios por si la contraseña de aplicación de Google se pegó con espacios ("abcd efgh ijkl mnop")
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || smtpUser || "agenciadeviajes@trazamapas.com.mx";

    if (!smtpUser || !smtpPass || smtpPass === "PEGA_AQUI_TU_CONTRASENA_DE_16_LETRAS") {
      console.error("Faltan las credenciales SMTP (SMTP_USER / SMTP_PASS) en las variables de entorno.");
      return NextResponse.json(
        { error: "El servicio de correo aún no tiene configuradas las credenciales SMTP en el servidor." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true para 465 (SSL), false para 587 (STARTTLS)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Adjunto embebido (CID) del logo en PNG para máxima compatibilidad en clientes de correo
    const pngLogoPath = path.join(process.cwd(), "public", "images", "trazamapas-logo.png");
    const webpLogoPath = path.join(process.cwd(), "public", "images", "trazamapas logo.webp");
    const logoPath = fs.existsSync(pngLogoPath) ? pngLogoPath : webpLogoPath;
    const logoAttachments = fs.existsSync(logoPath)
      ? [
          {
            filename: path.basename(logoPath),
            path: logoPath,
            cid: "trazamapas-logo",
          },
        ]
      : [];

    const logoHeaderHtml = logoAttachments.length
      ? `
          <div style="background-color: #ffffff; padding: 24px 24px 18px; text-align: center;">
            <img src="cid:trazamapas-logo" alt="TrazaMapas Agencia de Viajes" style="max-width: 220px; height: auto; display: inline-block;" />
          </div>
        `
      : "";

    // 1. Correo de notificación para el equipo de TrazaMapas
    await transporter.sendMail({
      from: `"Sitio Web TrazaMapas" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `Nueva solicitud de cotización: ${service} - ${name}`,
      attachments: logoAttachments,
      text: `
Nueva solicitud de cotización desde el sitio web de TrazaMapas:

Nombre: ${name}
Correo electrónico: ${email}
Teléfono / WhatsApp: ${phone}
Viaje o Destino de interés: ${service}

Mensaje / Detalles:
${message || "Sin detalles adicionales."}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
          ${logoHeaderHtml}
          <div style="background-color: #2C0054; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; color: #F4B92A;">Nueva Solicitud de Cotización</h2>
            <p style="margin: 6px 0 0; font-size: 14px; color: #e9d5ff;">Recibida desde el formulario web de TrazaMapas</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #1f2937;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; width: 180px; color: #2C0054;">Nombre completo:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #2C0054;">Correo electrónico:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${email}" style="color: #2C0054;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #2C0054;">Teléfono / WhatsApp:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <a href="tel:${phone}" style="color: #2C0054; text-decoration: none;">${phone}</a>
                  &nbsp;•&nbsp;
                  <a href="https://wa.me/52${phone.replace(/\D/g, "")}" style="color: #16a34a; font-weight: bold; text-decoration: none;">Abrir WhatsApp</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #2C0054;">Viaje / Destino:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">${service}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="font-weight: bold; color: #2C0054; margin-bottom: 8px;">Mensaje / Detalles del viaje:</p>
              <div style="background-color: #f7f5f8; padding: 16px; border-radius: 12px; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message || "Sin detalles adicionales."}</div>
            </div>
          </div>
          <div style="background-color: #f7f5f8; padding: 14px 24px; font-size: 12px; color: #6b7280; text-align: center;">
            Puedes responder directamente a este correo para escribirle a <strong>${name}</strong> (${email}).
          </div>
        </div>
      `,
    });

    // 2. Correo de confirmación automática para el cliente
    await transporter.sendMail({
      from: `"TrazaMapas Agencia de Viajes" <${smtpUser}>`,
      to: email,
      replyTo: receiverEmail,
      subject: `Recibimos tu solicitud de cotización (${service}) - TrazaMapas`,
      attachments: logoAttachments,
      text: `
¡Hola ${name}!

Gracias por comunicarte con TrazaMapas. Hemos recibido tu solicitud de cotización para "${service}" y uno de nuestros asesores certificados se pondrá en contacto contigo a la brevedad.

Resumen de tu solicitud:
- Destino / Viaje: ${service}
- Teléfono de contacto: ${phone}
- Comentarios: ${message || "Sin comentarios adicionales"}

Si deseas atención inmediata también puedes escribirnos por WhatsApp al 844-340-9914.

Atentamente,
Equipo TrazaMapas
Av. La Salle #437, La Salle, Saltillo, Coah.
https://trazamapas.com.mx
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
          ${logoHeaderHtml}
          <div style="background-color: #2C0054; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; color: #F4B92A;">¡Hola ${name}!</h2>
            <p style="margin: 6px 0 0; font-size: 14px; color: #e9d5ff;">Hemos recibido tu solicitud en TrazaMapas</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #1f2937; font-size: 14px; line-height: 1.6;">
            <p>Gracias por comunicarte con <strong>TrazaMapas</strong>. Uno de nuestros asesores de viaje certificados revisará los detalles de tu solicitud para <strong>${service}</strong> y te contactará a la brevedad.</p>
            <div style="background-color: #f7f5f8; padding: 16px; border-radius: 12px; margin: 20px 0;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #2C0054;">Resumen de tu solicitud:</p>
              <p style="margin: 4px 0;"><strong>Destino / Servicio:</strong> ${service}</p>
              <p style="margin: 4px 0;"><strong>Teléfono / WhatsApp:</strong> ${phone}</p>
              ${message ? `<p style="margin: 4px 0;"><strong>Detalles:</strong> ${message}</p>` : ""}
            </div>
            <p>Si deseas atención inmediata, puedes escribirnos directamente por WhatsApp al <a href="https://wa.me/528443409914" style="color: #2C0054; font-weight: bold;">844-340-9914</a>.</p>
          </div>
          <div style="background-color: #f7f5f8; padding: 14px 24px; font-size: 12px; color: #6b7280; text-align: center;">
            TrazaMapas Agencia de Viajes • Av. La Salle #437, La Salle, 25240 Saltillo, Coah.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Error al enviar correo de cotización:", error);
    return NextResponse.json(
      {
        error:
          "No pudimos enviar tu solicitud en este momento. Por favor intenta de nuevo o contáctanos por WhatsApp al 844-340-9914.",
      },
      { status: 500 }
    );
  }
}
