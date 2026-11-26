AJ ULTRA — Razorpay integration package

IMPORTANT: Have the adult/legal owner of the merchant account configure and approve the payment setup. Test in Razorpay Test Mode before any live transactions.

1. Replace the website root index.html with this package's index.html.
2. Copy the included supabase folder to the same repository root.
3. Deploy from the project root:
   supabase functions deploy create-razorpay-order
   supabase functions deploy verify-razorpay-payment
4. Supabase Dashboard → Edge Functions → Secrets: add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.
   Never place the Key Secret or Supabase secret/service-role key in HTML or GitHub.
5. Ensure each paid preset has its correct whole-rupee integer price in presets.price and a Drive share URL in preset_files.drive_url.
6. Test successful, failed, dismissed, and delayed payments in Razorpay Test Mode. Only the verified captured payment and paid order return the Drive link.

This code expects prices like 49 to mean ₹49. Free presets are not automatically delivered. The Drive link itself must be shared appropriately and may be forwarded by anyone who gets it. The integration is code only; it is not deployed or activated yet.
