import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; 

export async function GET() {
  try {
    const result = await client.fetch(`*[_type == "homepage"][0]`);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Chyba při připojení k Sanity:", error);

    // Přetypování chyby na typ Error
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: "Neznámá chyba" }, { status: 500 });
    }
  }
}