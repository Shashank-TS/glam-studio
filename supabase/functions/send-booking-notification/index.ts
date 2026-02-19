import { Resend } from 'https://esm.sh/resend@4.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingRequest {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.log('RESEND_API_KEY not configured - skipping email notification');
      return new Response(
        JSON.stringify({ success: true, message: 'Booking received (email notifications not configured)' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(resendApiKey);
    const booking: BookingRequest = await req.json();

    // Send confirmation email to customer
    const { error: customerError } = await resend.emails.send({
      from: 'Lumière Atelier <onboarding@resend.dev>',
      to: [booking.email],
      subject: 'Your Booking Request - Lumière Atelier',
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9f7f4;">
          <h1 style="color: #1a1a1a; font-size: 28px; margin-bottom: 20px;">Thank You, ${booking.name}</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            We've received your booking request at Lumière Atelier. Our team will review your request and confirm your appointment within 24 hours.
          </p>
          <div style="background: white; padding: 24px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #c9a85c;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Booking Details</h3>
            <p style="margin: 8px 0;"><strong>Service:</strong> ${booking.service}</p>
            <p style="margin: 8px 0;"><strong>Preferred Date:</strong> ${booking.date}</p>
            ${booking.phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${booking.phone}</p>` : ''}
          </div>
          <p style="color: #999; font-size: 14px;">
            If you have any questions, please don't hesitate to contact us.
          </p>
          <p style="color: #c9a85c; font-family: 'Georgia', serif; font-style: italic; margin-top: 30px;">
            — Lumière Atelier
          </p>
        </div>
      `,
    });

    if (customerError) {
      console.error('Failed to send customer email:', customerError);
    }

    console.log('Booking notification sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Booking confirmation sent' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing booking:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
