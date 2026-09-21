import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  locale?: string;
  company?: string;
};

function validate(payload: ContactPayload) {
  const name = payload.name?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const message = payload.message?.trim() ?? '';

  if (name.length < 2 || name.length > 100) return 'name';
  if (!EMAIL_REGEX.test(email)) return 'email';
  if (message.length < 10 || message.length > 2000) return 'message';

  return null;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  if (payload.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const invalidField = validate(payload);
  if (invalidField) {
    return NextResponse.json({ ok: false, error: invalidField }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from('contact_messages').insert({
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    message: payload.message!.trim(),
    locale: payload.locale ?? null,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
