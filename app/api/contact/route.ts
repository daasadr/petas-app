import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { email, message } = await request.json()

  // Konfigurace transportéru pro nodemailer
  let transporter = nodemailer.createTransport({
    host: "smtp.seznam.cz",
    port: 465,
    secure: true,
    auth: {
      user: 'daasa.d@seznam.cz', // váš e-mail
      pass: 'BeParadise5' // heslo k vašemu e-mailu
    },
  });

  try {
    // Odeslání e-mailu
    await transporter.sendMail({
      from: '"Kontaktní formulář" <daasa.d@seznam.cz>',
      to: "daasa.d@seznam.cz", // kam se mají zprávy posílat
      subject: "Nová zpráva z kontaktního formuláře",
      text: `E-mail: ${email}\n\nZpráva: ${message}`,
      html: `<p><strong>E-mail:</strong> ${email}</p><p><strong>Zpráva:</strong> ${message}</p>`,
    });

    return NextResponse.json({ message: 'E-mail byl úspěšně odeslán' })
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error)
    return NextResponse.json({ message: 'Chyba při odesílání e-mailu' }, { status: 500 })
  }
}