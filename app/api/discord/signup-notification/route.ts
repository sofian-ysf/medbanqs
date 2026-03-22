import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, signupMethod } = await request.json();

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    const timestamp = new Date().toISOString();

    const embed = {
      title: '🎉 New User Signup!',
      color: 0x22c55e, // Green color
      fields: [
        {
          name: '📧 Email',
          value: email || 'Not provided',
          inline: true,
        },
        {
          name: '🔐 Method',
          value: signupMethod || 'Email/Password',
          inline: true,
        },
        {
          name: '🕐 Time',
          value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
          inline: true,
        },
      ],
      footer: {
        text: 'MedBanqs Signup Notification',
      },
      timestamp,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord webhook failed:', errorText);
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending Discord notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
