import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/db";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { connectedWallet, abstractWallet, signature } = body;

    // Validate required fields
    if (!connectedWallet || !abstractWallet || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('WalletLink')
      .insert([
        { 
          eth_wallet: connectedWallet,
          abs_wallet: abstractWallet,
          created_at: new Date().toISOString()
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 